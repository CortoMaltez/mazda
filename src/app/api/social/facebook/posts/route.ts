import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { metaAPI } from '@/lib/meta-api';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { pageId, message, link, scheduledTime } = await request.json();

    if (!pageId || !message) {
      return NextResponse.json({ error: 'Page ID et message requis' }, { status: 400 });
    }

    // Récupérer le token d'accès de la page depuis la base de données
    // (Vous devrez stocker les tokens des pages lors de la connexion)
    const pageAccessToken = 'PAGE_ACCESS_TOKEN'; // À récupérer depuis la DB

    let result;
    if (scheduledTime) {
      result = await metaAPI.schedulePost(
        pageId,
        pageAccessToken,
        message,
        new Date(scheduledTime),
        link
      );
    } else {
      result = await metaAPI.publishToPage(pageId, pageAccessToken, message, link);
    }

    return NextResponse.json({ success: true, post: result });
  } catch (error) {
    console.error('Erreur lors de la publication Facebook:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la publication' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!pageId) {
      return NextResponse.json({ error: 'Page ID requis' }, { status: 400 });
    }

    // Récupérer le token d'accès de la page
    const pageAccessToken = 'PAGE_ACCESS_TOKEN'; // À récupérer depuis la DB

    const posts = await metaAPI.getPagePosts(pageId, pageAccessToken, limit);

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Erreur lors de la récupération des posts Facebook:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des posts' },
      { status: 500 }
    );
  }
} 