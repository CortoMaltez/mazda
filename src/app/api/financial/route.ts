import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Métriques financières et ROI
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !["ADMIN", "CONSULTANT"].includes(session.user.role)) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // jours
    const type = searchParams.get('type') || 'summary';

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    switch (type) {
      case 'summary':
        // Résumé financier
        const [payments, adCampaigns, metrics] = await Promise.all([
          prisma.payment.findMany({
            where: {
              createdAt: { gte: startDate },
              status: 'COMPLETED'
            }
          }),
          prisma.adCampaign.findMany({
            where: {
              createdAt: { gte: startDate }
            }
          }),
          prisma.financialMetric.findMany({
            where: {
              date: { gte: startDate }
            },
            orderBy: { date: 'desc' }
          })
        ]);

        const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
        const totalAdSpend = adCampaigns.reduce((sum, c) => sum + c.spent, 0);
        const totalProfit = totalRevenue - totalAdSpend;
        const roi = totalAdSpend > 0 ? (totalProfit / totalAdSpend) * 100 : 0;

        return NextResponse.json({
          period: `${period} jours`,
          revenue: totalRevenue,
          adSpend: totalAdSpend,
          profit: totalProfit,
          roi: roi,
          conversions: payments.length,
          campaigns: adCampaigns.length,
          metrics: metrics
        });

      case 'campaigns':
        // Performance des campagnes
        const campaigns = await prisma.adCampaign.findMany({
          where: {
            createdAt: { gte: startDate }
          },
          orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(campaigns);

      case 'roi-breakdown':
        // Détail du ROI par plateforme
        const roiBreakdown = await prisma.adCampaign.groupBy({
          by: ['platform'],
          where: {
            createdAt: { gte: startDate }
          },
          _sum: {
            spent: true,
            revenue: true
          },
          _count: {
            conversions: true
          }
        });

        const breakdown = roiBreakdown.map(campaign => ({
          platform: campaign.platform,
          spent: campaign._sum.spent || 0,
          revenue: campaign._sum.revenue || 0,
          conversions: campaign._count.conversions,
          roi: campaign._sum.spent && campaign._sum.spent > 0 
            ? ((campaign._sum.revenue || 0) - campaign._sum.spent) / campaign._sum.spent * 100 
            : 0
        }));

        return NextResponse.json(breakdown);

      default:
        return NextResponse.json(
          { error: "Type de rapport non reconnu" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Erreur récupération métriques financières:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// POST - Enregistrer une nouvelle métrique
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const { 
      revenue, 
      expenses, 
      adSpend, 
      conversions,
      platform 
    } = await request.json();

    // Calculer les métriques
    const profit = revenue - expenses;
    const roi = adSpend > 0 ? (profit / adSpend) * 100 : 0;
    const cac = conversions > 0 ? adSpend / conversions : 0;
    const ltv = conversions > 0 ? revenue / conversions : 0;
    const conversionRate = conversions > 0 ? (conversions / 1000) * 100 : 0; // Estimation 1000 impressions

    // Sauvegarder la métrique
    const metric = await prisma.financialMetric.create({
      data: {
        revenue,
        expenses,
        profit,
        adSpend,
        customerAcquisitionCost: cac,
        lifetimeValue: ltv,
        conversionRate,
        roi
      }
    });

    // Si c'est une campagne spécifique, mettre à jour
    if (platform) {
      await prisma.adCampaign.updateMany({
        where: {
          platform,
          status: 'active'
        },
        data: {
          revenue: { increment: revenue },
          conversions: { increment: conversions },
          roi: roi
        }
      });
    }

    return NextResponse.json({
      message: "Métrique enregistrée avec succès",
      metric
    });
  } catch (error) {
    console.error("Erreur enregistrement métrique:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement" },
      { status: 500 }
    );
  }
} 