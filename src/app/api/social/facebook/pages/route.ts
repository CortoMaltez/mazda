import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { metaAPI } from '@/lib/meta-api';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Récupérer l'utilisateur avec son token Facebook
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user?.facebookAccessToken) {
      return NextResponse.json({ error: 'Compte Facebook non connecté' }, { status: 400 });
    }

    // Obtenir les pages Facebook de l'utilisateur
    const pages = await metaAPI.getUserPages(user.facebookAccessToken);

    return NextResponse.json({ pages });
  } catch (error) {
    console.error('Erreur lors de la récupération des pages Facebook:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des pages' },
      { status: 500 }
    );
  }
} 