import { NextRequest, NextResponse } from 'next/server';
import { metaAPI } from '@/lib/meta-api';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Vérifier s'il y a une erreur
    if (error) {
      console.error('Erreur d\'authentification Facebook:', error);
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/signin?error=facebook_auth_failed`
      );
    }

    // Vérifier que le code est présent
    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/signin?error=missing_code`
      );
    }

    // Échanger le code contre un token d'accès
    const tokenData = await metaAPI.exchangeCodeForToken(code);
    
    // Obtenir les informations de l'utilisateur
    const userInfo = await metaAPI.getUserInfo(tokenData.access_token);

    // Obtenir la session actuelle
    const session = await getServerSession(authOptions);

    if (session?.user?.id) {
      // L'utilisateur est connecté, lier le compte Facebook
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          facebookId: userInfo.id,
          facebookAccessToken: tokenData.access_token,
          facebookConnected: true,
          updatedAt: new Date()
        }
      });

      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard?message=facebook_connected`
      );
    } else {
      // L'utilisateur n'est pas connecté, créer un nouveau compte ou connecter un compte existant
      let user = await prisma.user.findFirst({
        where: {
          OR: [
            { facebookId: userInfo.id },
            { email: userInfo.email }
          ]
        }
      });

      if (user) {
        // Mettre à jour le compte existant
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            facebookId: userInfo.id,
            facebookAccessToken: tokenData.access_token,
            facebookConnected: true,
            updatedAt: new Date()
          }
        });
      } else {
        // Créer un nouveau compte
        user = await prisma.user.create({
          data: {
            email: userInfo.email,
            name: userInfo.name,
            facebookId: userInfo.id,
            facebookAccessToken: tokenData.access_token,
            facebookConnected: true,
            role: 'CLIENT',
            password: '', // Pas de mot de passe pour les comptes Facebook
            emailVerified: true
          }
        });
      }

      // Rediriger vers la page de connexion avec un message de succès
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/signin?message=facebook_account_created`
      );
    }
  } catch (error) {
    console.error('Erreur lors du callback Facebook:', error);
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/signin?error=facebook_callback_failed`
    );
  }
} 