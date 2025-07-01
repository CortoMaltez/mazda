import { NextRequest, NextResponse } from 'next/server';
import { metaAPI } from '@/lib/meta-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state') || 'prosperalink_auth';
    
    // Générer l'URL d'autorisation Facebook
    const authUrl = metaAPI.getAuthUrl(state);
    
    // Rediriger vers Facebook pour l'autorisation
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de l\'authentification Facebook:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'initialisation de l\'authentification' },
      { status: 500 }
    );
  }
} 