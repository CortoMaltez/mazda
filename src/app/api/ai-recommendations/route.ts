import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { mivion } from "@/lib/mivion";

// GET - Récupérer les recommandations IA
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !["ADMIN", "CONSULTANT"].includes(session.user.role)) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status'); // 'pending', 'approved', 'implemented'

    const where: any = {};
    if (type) where.type = type;
    if (status) {
      if (status === 'pending') where.approved = false;
      else if (status === 'approved') where.approved = true;
      else if (status === 'implemented') where.implemented = true;
    }

    const recommendations = await prisma.aIRecommendation.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Erreur récupération recommandations:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle recommandation IA
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const { 
      type, 
      title, 
      description, 
      impact, 
      recommendation, 
      estimatedValue 
    } = await request.json();

    const aiRecommendation = await prisma.aIRecommendation.create({
      data: {
        type,
        title,
        description,
        impact,
        recommendation,
        estimatedValue
      }
    });

    return NextResponse.json({
      message: "Recommandation IA créée",
      recommendation: aiRecommendation
    });
  } catch (error) {
    console.error("Erreur création recommandation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création" },
      { status: 500 }
    );
  }
}

// PATCH - Approuver/Implémenter une recommandation
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const { id, action } = await request.json();

    const recommendation = await prisma.aIRecommendation.findUnique({
      where: { id }
    });

    if (!recommendation) {
      return NextResponse.json(
        { error: "Recommandation non trouvée" },
        { status: 404 }
      );
    }

    let updatedRecommendation;

    switch (action) {
      case 'approve':
        updatedRecommendation = await prisma.aIRecommendation.update({
          where: { id },
          data: {
            approved: true,
            approvedBy: session.user.id,
            approvedAt: new Date()
          }
        });
        break;

      case 'implement':
        if (!recommendation.approved) {
          return NextResponse.json(
            { error: "La recommandation doit être approuvée avant d'être implémentée" },
            { status: 400 }
          );
        }

        updatedRecommendation = await prisma.aIRecommendation.update({
          where: { id },
          data: {
            implemented: true,
            implementedAt: new Date()
          }
        });

        // Appliquer automatiquement la recommandation selon son type
        await applyRecommendation(recommendation);
        break;

      default:
        return NextResponse.json(
          { error: "Action non reconnue" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      message: `Recommandation ${action === 'approve' ? 'approuvée' : 'implémentée'}`,
      recommendation: updatedRecommendation
    });
  } catch (error) {
    console.error("Erreur mise à jour recommandation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}

// Fonction pour appliquer automatiquement les recommandations
async function applyRecommendation(recommendation: any) {
  switch (recommendation.type) {
    case 'pricing':
      // Appliquer l'ajustement de prix
      console.log(`Application ajustement prix: ${recommendation.recommendation}`);
      break;

    case 'marketing':
      // Optimiser les campagnes publicitaires
      console.log(`Optimisation marketing: ${recommendation.recommendation}`);
      break;

    case 'service':
      // Ajouter un nouveau service
      console.log(`Ajout service: ${recommendation.recommendation}`);
      break;

    case 'budget':
      // Ajuster le budget
      console.log(`Ajustement budget: ${recommendation.recommendation}`);
      break;

    default:
      console.log(`Recommandation de type ${recommendation.type} implémentée`);
  }
} 