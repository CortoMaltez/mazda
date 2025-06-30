import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { 
  getCompetitiveAnalysis, 
  getPricingOpportunities, 
  getAdOptimizations,
  getMarketOpportunities,
  getCompetitiveThreats 
} from "@/lib/mivion";

// GET - Rapport complet d'analyse concurrentielle
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !["ADMIN", "CONSULTANT"].includes(session.user.role)) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    switch (type) {
      case 'full-report':
        const fullReport = await getCompetitiveAnalysis();
        return NextResponse.json(fullReport);
      
      case 'pricing':
        const pricingOpps = await getPricingOpportunities();
        return NextResponse.json(pricingOpps);
      
      case 'ads':
        const budget = parseFloat(searchParams.get('budget') || '500');
        const adOpts = await getAdOptimizations(budget);
        return NextResponse.json(adOpts);
      
      case 'opportunities':
        const opportunities = await getMarketOpportunities();
        return NextResponse.json(opportunities);
      
      case 'threats':
        const threats = await getCompetitiveThreats();
        return NextResponse.json(threats);
      
      default:
        // Rapport complet par défaut
        const report = await getCompetitiveAnalysis();
        return NextResponse.json(report);
    }
  } catch (error) {
    console.error("Erreur analyse concurrentielle:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'analyse concurrentielle" },
      { status: 500 }
    );
  }
}

// POST - Appliquer une recommandation IA
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    const { action, data } = await request.json();

    switch (action) {
      case 'apply-pricing':
        // Appliquer un ajustement de prix
        return NextResponse.json({ 
          message: "Ajustement de prix appliqué",
          data 
        });
      
      case 'optimize-ads':
        // Optimiser le budget publicitaire
        return NextResponse.json({ 
          message: "Budget publicitaire optimisé",
          data 
        });
      
      case 'add-service':
        // Ajouter un nouveau service
        return NextResponse.json({ 
          message: "Nouveau service ajouté",
          data 
        });
      
      default:
        return NextResponse.json(
          { error: "Action non reconnue" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Erreur application recommandation:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'application de la recommandation" },
      { status: 500 }
    );
  }
} 