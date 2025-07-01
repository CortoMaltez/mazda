import { prisma } from '@/lib/prisma';
import { geminiModel } from '@/services/gemini';

export interface UserContext {
  userId: string;
  currentPage: string;
  userProfile: {
    name: string;
    email: string;
    role: string;
    language: string;
    companies: Array<{
      id: string;
      name: string;
      state: string;
      status: string;
      formationDate?: Date;
    }>;
  };
  recentActivity: Array<{
    type: string;
    description: string;
    timestamp: Date;
  }>;
  pendingTasks: Array<{
    id: string;
    title: string;
    dueDate?: Date;
    priority: string;
  }>;
  complianceHealth: {
    score: number;
    issues: string[];
    nextDeadlines: Array<{
      title: string;
      dueDate: Date;
      type: string;
      company: string;
    }>;
  };
}

export interface PersonalizedMessage {
  type: 'greeting' | 'suggestion' | 'alert' | 'insight';
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
  priority: 'low' | 'medium' | 'high';
  icon?: string;
}

export interface SuggestedAction {
  id: string;
  title: string;
  description: string;
  actionUrl: string;
  priority: 'low' | 'medium' | 'high';
  category: 'compliance' | 'business' | 'support' | 'optimization';
  estimatedTime: string;
}

export class ContextualAI {
  /**
   * Analyse le contexte complet de l'utilisateur
   */
  async analyzeUserContext(userId: string, currentPage: string): Promise<UserContext> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        companies: {
          select: {
            id: true,
            name: true,
            state: true,
            status: true,
            formationDate: true,
            annualReportDueDate: true,
            boiReportDueDate: true,
            form5472DueDate: true,
            form1120DueDate: true,
          }
        },
        complianceTasks: {
          where: { status: 'PENDING' },
          orderBy: { dueDate: 'asc' },
          take: 5
        },
        auditLogs: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Analyser la santé de la conformité
    const complianceHealth = this.analyzeComplianceHealth(user.companies);
    
    // Récupérer l'activité récente
    const recentActivity = user.auditLogs.map((log: any) => ({
      type: log.action,
      description: log.details ? JSON.stringify(log.details) : 'Action effectuée',
      timestamp: log.createdAt
    }));

    // Identifier les tâches en attente
    const pendingTasks = user.complianceTasks.map((task: any) => ({
      id: task.id,
      title: task.name,
      dueDate: task.dueDate,
      priority: task.priority
    }));

    return {
      userId,
      currentPage,
      userProfile: {
        name: user.name,
        email: user.email,
        role: user.role,
        language: user.language,
        companies: user.companies.map((company: any) => ({
          id: company.id,
          name: company.name,
          state: company.state,
          status: company.status,
          formationDate: company.formationDate
        }))
      },
      recentActivity,
      pendingTasks,
      complianceHealth
    };
  }

  /**
   * Génère des messages personnalisés basés sur le contexte
   */
  async generatePersonalizedMessage(context: UserContext): Promise<PersonalizedMessage[]> {
    const messages: PersonalizedMessage[] = [];

    // Message de bienvenue personnalisé
    const greetingMessage = await this.generateGreetingMessage(context);
    if (greetingMessage) {
      messages.push(greetingMessage);
    }

    // Alertes de conformité urgentes
    const complianceAlerts = await this.generateComplianceAlerts(context);
    messages.push(...complianceAlerts);

    // Suggestions d'optimisation
    const optimizationSuggestions = await this.generateOptimizationSuggestions(context);
    messages.push(...optimizationSuggestions);

    // Insights business
    const businessInsights = await this.generateBusinessInsights(context);
    messages.push(...businessInsights);

    return messages.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  /**
   * Génère des actions suggérées basées sur le contexte
   */
  async generateSuggestedActions(context: UserContext): Promise<SuggestedAction[]> {
    const actions: SuggestedAction[] = [];

    // Actions de conformité
    if (context.complianceHealth.score < 80) {
      actions.push({
        id: 'compliance-review',
        title: 'Révision de conformité',
        description: 'Votre score de conformité nécessite une attention immédiate',
        actionUrl: '/dashboard/compliance',
        priority: 'high',
        category: 'compliance',
        estimatedTime: '15 min'
      });
    }

    // Actions pour nouvelles entreprises
    const newCompanies = context.userProfile.companies.filter(c => 
      c.status === 'PENDING' || 
      (c.formationDate && new Date(c.formationDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    );

    if (newCompanies.length > 0) {
      actions.push({
        id: 'new-company-setup',
        title: 'Configuration post-formation',
        description: 'Finalisez la configuration de votre nouvelle entreprise',
        actionUrl: '/dashboard/setup',
        priority: 'medium',
        category: 'business',
        estimatedTime: '30 min'
      });
    }

    // Actions d'optimisation
    if (context.userProfile.companies.length > 1) {
      actions.push({
        id: 'multi-company-optimization',
        title: 'Optimisation multi-entreprises',
        description: 'Optimisez la gestion de vos multiples entreprises',
        actionUrl: '/dashboard/optimization',
        priority: 'low',
        category: 'optimization',
        estimatedTime: '45 min'
      });
    }

    return actions;
  }

  /**
   * Génère un score de santé de conformité
   */
  private analyzeComplianceHealth(companies: any[]): { score: number; issues: string[]; nextDeadlines: any[] } {
    let totalScore = 100;
    const issues: string[] = [];
    const nextDeadlines: any[] = [];

    companies.forEach(company => {
      let companyScore = 100;

      // Vérifier les échéances
      const deadlines = [
        { field: 'annualReportDueDate', title: 'Rapport annuel', type: 'annual' },
        { field: 'boiReportDueDate', title: 'Rapport BOI', type: 'boi' },
        { field: 'form5472DueDate', title: 'Formulaire 5472', type: 'tax' },
        { field: 'form1120DueDate', title: 'Formulaire 1120', type: 'tax' }
      ];

      deadlines.forEach(({ field, title, type }) => {
        const dueDate = company[field];
        if (dueDate) {
          const daysUntilDue = Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          
          if (daysUntilDue < 0) {
            companyScore -= 25;
            issues.push(`${title} en retard pour ${company.name}`);
          } else if (daysUntilDue <= 30) {
            companyScore -= 10;
            nextDeadlines.push({
              title,
              dueDate: new Date(dueDate),
              type,
              company: company.name
            });
          }
        }
      });

      totalScore = Math.min(totalScore, companyScore);
    });

    return {
      score: Math.max(0, totalScore),
      issues,
      nextDeadlines: nextDeadlines.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    };
  }

  /**
   * Génère un message de bienvenue personnalisé
   */
  private async generateGreetingMessage(context: UserContext): Promise<PersonalizedMessage | null> {
    const timeOfDay = new Date().getHours();
    let greeting = '';
    
    if (timeOfDay < 12) greeting = 'Bonjour';
    else if (timeOfDay < 18) greeting = 'Bon après-midi';
    else greeting = 'Bonsoir';

    const companyCount = context.userProfile.companies.length;
    const pendingTasks = context.pendingTasks.length;

    let message = `${greeting} ${context.userProfile.name.split(' ')[0]} ! `;
    
    if (companyCount === 0) {
      message += "Bienvenue sur ProsperaLink ! Prêt à créer votre première entreprise aux USA ?";
    } else if (companyCount === 1) {
      message += `Votre entreprise ${context.userProfile.companies[0].name} est en pleine forme.`;
    } else {
      message += `Vous gérez ${companyCount} entreprises avec succès.`;
    }

    if (pendingTasks > 0) {
      message += ` Vous avez ${pendingTasks} tâche${pendingTasks > 1 ? 's' : ''} en attente.`;
    }

    return {
      type: 'greeting',
      title: 'Bienvenue',
      message,
      priority: 'low',
      icon: '👋'
    };
  }

  /**
   * Génère des alertes de conformité
   */
  private async generateComplianceAlerts(context: UserContext): Promise<PersonalizedMessage[]> {
    const alerts: PersonalizedMessage[] = [];

    if (context.complianceHealth.score < 60) {
      alerts.push({
        type: 'alert',
        title: 'Attention Conformité',
        message: `Votre score de conformité est de ${context.complianceHealth.score}%. ${context.complianceHealth.issues.length} problème${context.complianceHealth.issues.length > 1 ? 's' : ''} à résoudre.`,
        actionUrl: '/dashboard/compliance',
        actionText: 'Voir les détails',
        priority: 'high',
        icon: '⚠️'
      });
    }

    context.complianceHealth.nextDeadlines.forEach(deadline => {
      const daysUntilDue = Math.ceil((deadline.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilDue <= 7) {
        alerts.push({
          type: 'alert',
          title: 'Échéance Approche',
          message: `${deadline.title} pour ${deadline.company} - Échéance dans ${daysUntilDue} jour${daysUntilDue > 1 ? 's' : ''}`,
          actionUrl: '/dashboard/compliance',
          actionText: 'Gérer',
          priority: 'high',
          icon: '📅'
        });
      }
    });

    return alerts;
  }

  /**
   * Génère des suggestions d'optimisation
   */
  private async generateOptimizationSuggestions(context: UserContext): Promise<PersonalizedMessage[]> {
    const suggestions: PersonalizedMessage[] = [];

    // Suggestion pour les nouvelles entreprises
    const newCompanies = context.userProfile.companies.filter(c => 
      c.status === 'PENDING' || 
      (c.formationDate && new Date(c.formationDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
    );

    if (newCompanies.length > 0) {
      suggestions.push({
        type: 'suggestion',
        title: 'Configuration Recommandée',
        message: 'Configurez votre compte bancaire et vos services post-formation pour optimiser votre entreprise.',
        actionUrl: '/dashboard/setup',
        actionText: 'Configurer',
        priority: 'medium',
        icon: '⚙️'
      });
    }

    // Suggestion pour l'optimisation fiscale
    if (context.userProfile.companies.length > 1) {
      suggestions.push({
        type: 'suggestion',
        title: 'Optimisation Fiscale',
        message: 'Découvrez comment optimiser la structure fiscale de vos multiples entreprises.',
        actionUrl: '/dashboard/optimization',
        actionText: 'Explorer',
        priority: 'low',
        icon: '📊'
      });
    }

    return suggestions;
  }

  /**
   * Génère des insights business
   */
  private async generateBusinessInsights(context: UserContext): Promise<PersonalizedMessage[]> {
    const insights: PersonalizedMessage[] = [];

    // Insight sur la croissance
    if (context.userProfile.companies.length > 1) {
      insights.push({
        type: 'insight',
        title: 'Croissance Détectée',
        message: `Vous gérez ${context.userProfile.companies.length} entreprises. Considérez nos services d'optimisation pour maximiser votre efficacité.`,
        actionUrl: '/services',
        actionText: 'Découvrir',
        priority: 'low',
        icon: '📈'
      });
    }

    // Insight sur la conformité
    if (context.complianceHealth.score > 90) {
      insights.push({
        type: 'insight',
        title: 'Excellente Conformité',
        message: `Félicitations ! Votre score de conformité de ${context.complianceHealth.score}% est excellent. Continuez ainsi !`,
        priority: 'low',
        icon: '🎉'
      });
    }

    return insights;
  }
} 