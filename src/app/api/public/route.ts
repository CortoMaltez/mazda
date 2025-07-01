import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey || apiKey !== process.env.PUBLIC_API_KEY) {
      return NextResponse.json({ error: 'API key invalide' }, { status: 401 });
    }

    switch (action) {
      case 'company-status':
        const companyId = searchParams.get('companyId');
        if (!companyId) {
          return NextResponse.json({ error: 'companyId requis' }, { status: 400 });
        }

        const company = await prisma.company.findUnique({
          where: { id: companyId },
          select: {
            id: true,
            name: true,
            status: true,
            formationDate: true,
            complianceScore: true
          }
        });

        return NextResponse.json({ success: true, data: company });

      case 'pricing-calculate':
        const services = searchParams.get('services')?.split(',') || [];
        const basePrice = 997;
        const servicePrices: { [key: string]: number } = {
          'compliance': 299,
          'ai-support': 199,
          'tax-optimization': 399
        };

        let totalPrice = basePrice;
        for (const service of services) {
          if (servicePrices[service]) {
            totalPrice += servicePrices[service];
          }
        }

        return NextResponse.json({
          success: true,
          data: { totalPrice, currency: 'USD' }
        });

      default:
        return NextResponse.json({ error: 'Action non reconnue' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    const body = await request.json();

    // Vérification de l'API key
    if (!apiKey || apiKey !== process.env.PUBLIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key invalide' },
        { status: 401 }
      );
    }

    const { action, data } = body;

    switch (action) {
      case 'webhook-register':
        const { url, events } = data;
        
        if (!url || !events) {
          return NextResponse.json(
            { error: 'url et events requis' },
            { status: 400 }
          );
        }

        // Enregistrement du webhook
        const webhook = {
          id: `webhook_${Date.now()}`,
          url,
          events,
          status: 'active',
          createdAt: new Date().toISOString()
        };

        return NextResponse.json({
          success: true,
          data: webhook
        });

      case 'company-create':
        const { name, state, businessType, ownerEmail } = data;

        if (!name || !state || !businessType || !ownerEmail) {
          return NextResponse.json(
            { error: 'Tous les champs sont requis' },
            { status: 400 }
          );
        }

        // Création de l'entreprise
        const newCompany = await prisma.company.create({
          data: {
            name,
            state,
            businessType,
            status: 'forming',
            ownerEmail,
            formationDate: new Date(),
            complianceScore: 0
          }
        });

        return NextResponse.json({
          success: true,
          data: {
            id: newCompany.id,
            name: newCompany.name,
            status: newCompany.status,
            formationDate: newCompany.formationDate
          }
        });

      default:
        return NextResponse.json(
          { error: 'Action non reconnue' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('API publique POST erreur:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 