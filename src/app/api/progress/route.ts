import { NextRequest, NextResponse } from 'next/server';
import { checkProgress } from '../../../../scripts/check-progress';

export async function GET(request: NextRequest) {
  try {
    // Vérifier si l'utilisateur a les permissions d'admin
    // Note: Cette vérification devrait être implémentée selon votre système d'auth
    
    const progressData = checkProgress();
    
    return NextResponse.json(progressData);
  } catch (error) {
    console.error('Erreur lors de la vérification du progrès:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la vérification du progrès',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
} 