import { NextRequest, NextResponse } from 'next/server';
import { createLLCWorkflow, LLCFormationData } from '@/lib/llc-workflow';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
    const { planId, formationData } = body;

    if (!planId || !formationData) {
      return NextResponse.json(
        { error: 'Plan ID et données de formation requis' },
        { status: 400 }
      );
    }

    // Valider les données de formation
    const validationError = validateFormationData(formationData);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    // Créer et démarrer le workflow de formation LLC
    const workflow = await createLLCWorkflow(
      session.user.id,
      planId,
      formationData
    );

    return NextResponse.json({
      success: true,
      workflowId: workflow.id,
      message: 'Formation LLC démarrée avec succès'
    });

  } catch (error) {
    console.error('Erreur démarrage formation LLC:', error);
    return NextResponse.json(
      { error: 'Erreur lors du démarrage de la formation LLC' },
      { status: 500 }
    );
  }
}

// Fonction de validation des données de formation
function validateFormationData(data: LLCFormationData): string | null {
  if (!data.companyName || data.companyName.trim().length < 2) {
    return 'Nom d\'entreprise requis (minimum 2 caractères)';
  }

  if (!data.businessType || data.businessType.trim().length === 0) {
    return 'Type d\'entreprise requis';
  }

  if (!data.state || data.state.trim().length === 0) {
    return 'État requis';
  }

  if (!data.ownerName || data.ownerName.trim().length === 0) {
    return 'Nom du propriétaire requis';
  }

  if (!data.ownerEmail || !data.ownerEmail.includes('@')) {
    return 'Email valide requis';
  }

  if (!data.ownerPhone || data.ownerPhone.trim().length < 10) {
    return 'Numéro de téléphone valide requis';
  }

  if (!data.businessAddress) {
    return 'Adresse d\'entreprise requise';
  }

  if (!data.businessAddress.street || data.businessAddress.street.trim().length === 0) {
    return 'Rue de l\'adresse d\'entreprise requise';
  }

  if (!data.businessAddress.city || data.businessAddress.city.trim().length === 0) {
    return 'Ville de l\'adresse d\'entreprise requise';
  }

  if (!data.businessAddress.state || data.businessAddress.state.trim().length === 0) {
    return 'État de l\'adresse d\'entreprise requis';
  }

  if (!data.businessAddress.zipCode || data.businessAddress.zipCode.trim().length < 5) {
    return 'Code postal valide requis';
  }

  if (!data.businessDescription || data.businessDescription.trim().length < 10) {
    return 'Description de l\'entreprise requise (minimum 10 caractères)';
  }

  if (!data.estimatedRevenue || data.estimatedRevenue <= 0) {
    return 'Revenu estimé valide requis';
  }

  if (!data.employees || data.employees < 0) {
    return 'Nombre d\'employés valide requis';
  }

  return null;
}

// GET - Récupérer les workflows d'un client
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
    const workflowId = searchParams.get('workflowId');

    if (workflowId) {
      // Récupérer un workflow spécifique
      const workflow = await prisma.lLCFormationWorkflow.findFirst({
        where: {
          id: workflowId,
          clientId: session.user.id
        }
      });

      if (!workflow) {
        return NextResponse.json(
          { error: 'Workflow non trouvé' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        ...workflow,
        data: JSON.parse(workflow.data),
        documents: JSON.parse(workflow.documents),
        steps: JSON.parse(workflow.steps)
      });
    } else {
      // Récupérer tous les workflows du client
      const workflows = await prisma.lLCFormationWorkflow.findMany({
        where: {
          clientId: session.user.id
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return NextResponse.json(
        workflows.map((workflow: any) => ({
          ...workflow,
          data: JSON.parse(workflow.data),
          documents: JSON.parse(workflow.documents),
          steps: JSON.parse(workflow.steps)
        }))
      );
    }

  } catch (error) {
    console.error('Erreur récupération workflows:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des workflows' },
      { status: 500 }
    );
  }
} 