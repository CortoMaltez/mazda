import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { metaAPI } from '@/lib/meta-api';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    const period = searchParams.get('period') as 'day' | 'week' | 'month' || 'day';

    if (!pageId) {
      return NextResponse.json({ error: 'Page ID requis' }, { status: 400 });
    }

    // Récupérer le token d'accès de la page
    const pageAccessToken = 'PAGE_ACCESS_TOKEN'; // À récupérer depuis la DB

    const insights = await metaAPI.getPageInsights(pageId, pageAccessToken, period);

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Erreur lors de la récupération des insights Facebook:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des insights' },
      { status: 500 }
    );
  }
} 