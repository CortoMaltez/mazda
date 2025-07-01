import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ComplianceService } from '@/services/complianceService';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Vérifier que l'utilisateur est admin ou consultant
    if (session.user.role !== 'ADMIN' && session.user.role !== 'CONSULTANT') {
      return NextResponse.json(
        { error: 'Permissions insuffisantes' },
        { status: 403 }
      );
    }

    const { userId, companyId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'ID utilisateur requis' },
        { status: 400 }
      );
    }

    // Générer les tâches de conformité
    const result = await ComplianceService.generateComplianceTasks(userId, companyId);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Erreur lors de la génération des tâches de conformité:', error);
    
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