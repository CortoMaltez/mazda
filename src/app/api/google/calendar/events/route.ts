import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GoogleWorkspaceService } from '@/services/googleWorkspaceService';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Récupérer les paramètres de date depuis l'URL
    const { searchParams } = new URL(request.url);
    const timeMin = searchParams.get('timeMin');
    const timeMax = searchParams.get('timeMax');

    // Par défaut, récupérer les événements des 30 prochains jours
    const defaultTimeMin = new Date();
    const defaultTimeMax = new Date();
    defaultTimeMax.setDate(defaultTimeMax.getDate() + 30);

    const events = await GoogleWorkspaceService.getCalendarEvents(
      session.user.id,
      timeMin ? new Date(timeMin) : defaultTimeMin,
      timeMax ? new Date(timeMax) : defaultTimeMax
    );

    return NextResponse.json({
      success: true,
      events
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 