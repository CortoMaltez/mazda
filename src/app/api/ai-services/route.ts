import { NextRequest, NextResponse } from 'next/server';
import { executeAIService, getUserAnalyses, getAIStats, AI_PREMIUM_SERVICES, recommendServices } from '@/lib/ai-premium-services';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET - Récupérer les services disponibles et les analyses de l'utilisateur
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'services':
        // Récupérer tous les services disponibles
        return NextResponse.json({
          services: AI_PREMIUM_SERVICES
        });

      case 'analyses':
        // Récupérer les analyses de l'utilisateur
        const analyses = await getUserAnalyses(session.user.id);
        return NextResponse.json({ analyses });

      case 'stats':
        // Récupérer les statistiques IA de l'utilisateur
        const stats = await getAIStats(session.user.id);
        return NextResponse.json({ stats });

      case 'recommendations':
        // Récupérer les recommandations personnalisées
        const businessData = searchParams.get('businessData');
        if (businessData) {
          const parsedData = JSON.parse(businessData);
          const recommendations = recommendServices(parsedData);
          return NextResponse.json({ recommendations });
        }
        return NextResponse.json({ recommendations: [] });

      default:
        return NextResponse.json(
          { error: 'Action non reconnue' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Erreur récupération services IA:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des services IA' },
      { status: 500 }
    );
  }
}

// POST - Exécuter un service IA
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { serviceId, inputData } = body;

    if (!serviceId || !inputData) {
      return NextResponse.json(
        { error: 'Service ID et données d\'entrée requis' },
        { status: 400 }
      );
    }

    // Valider que le service existe
    const service = AI_PREMIUM_SERVICES.find(s => s.id === serviceId);
    if (!service) {
      return NextResponse.json(
        { error: 'Service IA non trouvé' },
        { status: 404 }
      );
    }

    // Exécuter le service IA
    const analysis = await executeAIService(serviceId, session.user.id, inputData);

    return NextResponse.json({
      success: true,
      analysis,
      message: 'Analyse IA démarrée avec succès'
    });

  } catch (error) {
    console.error('Erreur exécution service IA:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'exécution du service IA' },
      { status: 500 }
    );
  }
} 