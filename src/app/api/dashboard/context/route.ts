import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ContextualAI } from '@/services/ai/ContextualAI';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const contextualAI = new ContextualAI();
    const currentPage = request.nextUrl.searchParams.get('page') || 'dashboard';
    
    // Analyser le contexte utilisateur
    const userContext = await contextualAI.analyzeUserContext(session.user.id, currentPage);
    
    // Générer les messages personnalisés
    const personalizedMessages = await contextualAI.generatePersonalizedMessage(userContext);
    
    // Générer les actions suggérées
    const suggestedActions = await contextualAI.generateSuggestedActions(userContext);

    // Préparer les données pour la timeline
    const timelineItems = [
      // Échéances de conformité
      ...userContext.complianceHealth.nextDeadlines.map(deadline => ({
        id: `deadline-${deadline.title}-${deadline.company}`,
        type: 'deadline' as const,
        title: deadline.title,
        description: `Échéance pour ${deadline.company}`,
        date: deadline.dueDate,
        status: deadline.dueDate < new Date() ? 'overdue' as const : 'upcoming' as const,
        priority: deadline.dueDate < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? 'high' as const : 'medium' as const,
        company: deadline.company,
        category: deadline.type
      })),
      
      // Activité récente
      ...userContext.recentActivity.slice(0, 5).map((activity, index) => ({
        id: `activity-${index}`,
        type: 'activity' as const,
        title: activity.type,
        description: activity.description,
        date: activity.timestamp,
        status: 'completed' as const,
        category: 'activité'
      })),
      
      // Tâches en attente
      ...userContext.pendingTasks.map(task => ({
        id: `task-${task.id}`,
        type: 'milestone' as const,
        title: task.title,
        description: 'Tâche de conformité en attente',
        date: task.dueDate || new Date(),
        status: (task.dueDate && task.dueDate < new Date()) ? 'overdue' as const : 'pending' as const,
        priority: task.priority as 'low' | 'medium' | 'high',
        category: 'conformité'
      }))
    ];

    return NextResponse.json({
      success: true,
      data: {
        userContext,
        personalizedMessages,
        suggestedActions,
        timelineItems,
        complianceHealth: userContext.complianceHealth,
        stats: {
          totalCompanies: userContext.userProfile.companies.length,
          pendingTasks: userContext.pendingTasks.length,
          recentActivities: userContext.recentActivity.length,
          complianceScore: userContext.complianceHealth.score
        }
      }
    });

  } catch (error) {
    console.error('Erreur récupération contexte dashboard:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
} 