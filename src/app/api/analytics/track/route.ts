import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      event, 
      value, 
      source, 
      campaign, 
      userAgent, 
      ip, 
      referrer,
      sessionId,
      userId 
    } = body;

    // Enregistrer l'événement
    const trackingEvent = await prisma.trackingEvent.create({
      data: {
        event,
        value: value || 0,
        source: source || 'direct',
        campaign: campaign || null,
        userAgent: userAgent || null,
        ip: ip || null,
        referrer: referrer || null,
        sessionId: sessionId || null,
        userId: userId || null,
        timestamp: new Date()
      }
    });

    // Mettre à jour les métriques en temps réel
    await updateRealTimeMetrics(event, value);

    // Si c'est une conversion, déclencher les actions appropriées
    if (event === 'conversion' || event === 'purchase') {
      await handleConversion(trackingEvent);
    }

    return NextResponse.json({ 
      success: true, 
      eventId: trackingEvent.id 
    });

  } catch (error) {
    console.error('Erreur tracking:', error);
    return NextResponse.json({ error: 'Erreur lors du tracking' }, { status: 500 });
  }
}

async function updateRealTimeMetrics(event: string, value: number) {
  try {
    const today = new Date();
    const dateKey = today.toISOString().split('T')[0];

    // Mettre à jour ou créer les métriques du jour
    await prisma.dailyMetrics.upsert({
      where: { date: dateKey },
      update: {
        [event]: { increment: 1 },
        totalValue: { increment: value || 0 },
        lastUpdated: new Date()
      },
      create: {
        date: dateKey,
        [event]: 1,
        totalValue: value || 0,
        lastUpdated: new Date()
      }
    });
  } catch (error) {
    console.error('Erreur mise à jour métriques:', error);
  }
}

async function handleConversion(trackingEvent: any) {
  try {
    // Envoyer les données à Facebook Pixel
    if (process.env.FACEBOOK_PIXEL_ID) {
      await sendToFacebookPixel(trackingEvent);
    }

    // Envoyer les données à Google Analytics
    if (process.env.GOOGLE_ANALYTICS_ID) {
      await sendToGoogleAnalytics(trackingEvent);
    }

    // Mettre à jour les statistiques de conversion
    await prisma.conversionStats.upsert({
      where: { date: new Date().toISOString().split('T')[0] },
      update: {
        conversions: { increment: 1 },
        revenue: { increment: trackingEvent.value || 0 },
        lastConversion: new Date()
      },
      create: {
        date: new Date().toISOString().split('T')[0],
        conversions: 1,
        revenue: trackingEvent.value || 0,
        lastConversion: new Date()
      }
    });

  } catch (error) {
    console.error('Erreur traitement conversion:', error);
  }
}

async function sendToFacebookPixel(trackingEvent: any) {
  try {
    const pixelData = {
      event_name: trackingEvent.event,
      event_time: Math.floor(trackingEvent.timestamp.getTime() / 1000),
      user_data: {
        client_ip_address: trackingEvent.ip,
        client_user_agent: trackingEvent.userAgent
      },
      custom_data: {
        value: trackingEvent.value,
        currency: 'USD',
        content_name: 'ProsperaLink Service',
        content_category: 'Business Services'
      }
    };

    const response = await fetch(`https://graph.facebook.com/v18.0/${process.env.FACEBOOK_PIXEL_ID}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [pixelData],
        access_token: process.env.FACEBOOK_ACCESS_TOKEN
      })
    });

    if (!response.ok) {
      console.error('Erreur Facebook Pixel:', await response.text());
    }
  } catch (error) {
    console.error('Erreur envoi Facebook Pixel:', error);
  }
}

async function sendToGoogleAnalytics(trackingEvent: any) {
  try {
    const gaData = {
      v: '1',
      tid: process.env.GOOGLE_ANALYTICS_ID,
      cid: trackingEvent.sessionId || 'anonymous',
      t: 'event',
      ec: 'ProsperaLink',
      ea: trackingEvent.event,
      ev: trackingEvent.value || 0,
      uip: trackingEvent.ip,
      ua: trackingEvent.userAgent,
      dr: trackingEvent.referrer
    };

    const response = await fetch('https://www.google-analytics.com/collect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(gaData)
    });

    if (!response.ok) {
      console.error('Erreur Google Analytics:', await response.text());
    }
  } catch (error) {
    console.error('Erreur envoi Google Analytics:', error);
  }
}

// API pour récupérer les analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';
    const metric = searchParams.get('metric') || 'all';

    let startDate = new Date();
    switch (period) {
      case '1d':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
    }

    const analytics = await prisma.trackingEvent.groupBy({
      by: ['event'],
      where: {
        timestamp: {
          gte: startDate
        }
      },
      _count: {
        event: true
      },
      _sum: {
        value: true
      }
    });

    const conversionStats = await prisma.conversionStats.findMany({
      where: {
        date: {
          gte: startDate.toISOString().split('T')[0]
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        events: analytics,
        conversions: conversionStats,
        period,
        generatedAt: new Date()
      }
    });

  } catch (error) {
    console.error('Erreur récupération analytics:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération' }, { status: 500 });
  }
} 