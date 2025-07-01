import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ComplianceService } from '@/services/complianceService';
import { prisma } from '@/lib/prisma';

// Récupérer les tâches de conformité
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
    const userId = searchParams.get('userId');

    // Si pas d'userId spécifié, utiliser l'utilisateur connecté
    const targetUserId = userId || session.user.id;

    // Vérifier les permissions
    if (userId && session.user.role !== 'ADMIN' && session.user.role !== 'CONSULTANT') {
      return NextResponse.json(
        { error: 'Permissions insuffisantes' },
        { status: 403 }
      );
    }

    const tasks = await ComplianceService.getUserComplianceTasks(targetUserId);
    const totalCost = await ComplianceService.calculateTotalComplianceCost(targetUserId);

    return NextResponse.json({
      success: true,
      tasks,
      totalEstimatedCost: totalCost
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des tâches de conformité:', error);
    
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

// Mettre à jour le statut d'une tâche
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { taskId, status, notes } = await request.json();

    if (!taskId || !status) {
      return NextResponse.json(
        { error: 'ID de tâche et statut requis' },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur peut modifier cette tâche
    const task = await prisma.complianceTask.findUnique({
      where: { id: taskId },
      include: { user: true }
    });

    if (!task) {
      return NextResponse.json(
        { error: 'Tâche non trouvée' },
        { status: 404 }
      );
    }

    // Seul l'utilisateur propriétaire, un admin ou un consultant peut modifier
    if (task.userId !== session.user.id && 
        session.user.role !== 'ADMIN' && 
        session.user.role !== 'CONSULTANT') {
      return NextResponse.json(
        { error: 'Permissions insuffisantes' },
        { status: 403 }
      );
    }

    const updatedTask = await ComplianceService.updateTaskStatus(taskId, status, notes);

    return NextResponse.json({
      success: true,
      task: updatedTask
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error);
    
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