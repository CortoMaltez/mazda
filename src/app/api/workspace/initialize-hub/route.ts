import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GoogleWorkspaceService } from '@/services/googleWorkspaceService';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { companyName } = await request.json();

    if (!companyName) {
      return NextResponse.json({ error: 'Nom de l\'entreprise requis' }, { status: 400 });
    }

    // Vérifier si l'utilisateur a une connexion Google
    const hasGoogleAccess = await GoogleWorkspaceService.checkPermissions(session.user.id);
    
    if (!hasGoogleAccess) {
      return NextResponse.json({ 
        error: 'Connexion Google requise',
        requiresGoogleAuth: true 
      }, { status: 403 });
    }

    // Créer le hub corporate sur Google Drive
    const hubId = await GoogleWorkspaceService.createCorporateHub(session.user.id, companyName);

    // Récupérer ou créer l'entreprise
    let company = await prisma.company.findFirst({
      where: { userId: session.user.id }
    });

    if (!company) {
      company = await prisma.company.create({
        data: {
          name: companyName,
          state: 'NY', // Par défaut, à modifier selon les besoins
          businessType: 'LLC',
          userId: session.user.id,
          googleDriveHubId: hubId
        }
      });
    } else {
      // Mettre à jour l'entreprise existante
      company = await prisma.company.update({
        where: { id: company.id },
        data: { googleDriveHubId: hubId }
      });
    }

    // Créer un log d'audit
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        userEmail: session.user.email || '',
        action: 'GOOGLE_HUB_CREATED',
        details: { message: `Hub Google Drive créé pour l'entreprise: ${companyName}` }
      }
    });

    return NextResponse.json({
      success: true,
      hubId,
      company,
      message: 'Hub corporate créé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de l\'initialisation du hub:', error);
    
    return NextResponse.json({ 
      error: 'Erreur lors de l\'initialisation du hub corporate',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Vérifier le statut de la connexion Google
    const hasGoogleAccess = await GoogleWorkspaceService.checkPermissions(session.user.id);
    
    // Récupérer les informations de l'entreprise
    const company = await prisma.company.findFirst({
      where: { userId: session.user.id }
    });

    return NextResponse.json({
      hasGoogleAccess,
      company,
      hubInitialized: !!company?.googleDriveHubId
    });

  } catch (error) {
    console.error('Erreur lors de la vérification du statut:', error);
    
    return NextResponse.json({ 
      error: 'Erreur lors de la vérification du statut',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 