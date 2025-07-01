import { prisma } from './prisma';

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  category: 'compliance' | 'payment' | 'system' | 'ai' | 'security';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  expiresAt?: Date;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: Notification['type'];
  category: Notification['category'];
  priority: Notification['priority'];
  title: string;
  message: string;
  actionText?: string;
  variables: string[];
}

export class NotificationService {
  private static templates: NotificationTemplate[] = [
    {
      id: 'compliance-deadline',
      name: 'Échéance de conformité',
      type: 'warning',
      category: 'compliance',
      priority: 'high',
      title: 'Échéance de conformité approche',
      message: 'Votre rapport annuel pour {companyName} est dû le {deadline}.',
      actionText: 'Soumettre maintenant',
      variables: ['companyName', 'deadline']
    },
    {
      id: 'payment-success',
      name: 'Paiement réussi',
      type: 'success',
      category: 'payment',
      priority: 'medium',
      title: 'Paiement confirmé',
      message: 'Votre paiement de ${amount} pour {service} a été traité avec succès.',
      actionText: 'Voir les détails',
      variables: ['amount', 'service']
    },
    {
      id: 'ai-insight',
      name: 'Insight IA',
      type: 'info',
      category: 'ai',
      priority: 'low',
      title: 'Nouvel insight disponible',
      message: 'Notre IA a détecté une opportunité d\'optimisation pour {companyName}.',
      actionText: 'Voir l\'insight',
      variables: ['companyName']
    },
    {
      id: 'security-alert',
      name: 'Alerte de sécurité',
      type: 'error',
      category: 'security',
      priority: 'urgent',
      title: 'Activité suspecte détectée',
      message: 'Une connexion inhabituelle a été détectée sur votre compte.',
      actionText: 'Vérifier la sécurité',
      variables: []
    },
    {
      id: 'document-ready',
      name: 'Document prêt',
      type: 'success',
      category: 'compliance',
      priority: 'medium',
      title: 'Document généré',
      message: 'Votre {documentType} pour {companyName} est prêt à télécharger.',
      actionText: 'Télécharger',
      variables: ['documentType', 'companyName']
    }
  ];

  /**
   * Créer une notification
   */
  static async createNotification(
    userId: string,
    templateId: string,
    variables: Record<string, any>,
    options?: {
      actionUrl?: string;
      metadata?: Record<string, any>;
      expiresAt?: Date;
    }
  ): Promise<Notification> {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) {
      throw new Error(`Template de notification non trouvé: ${templateId}`);
    }

    // Remplacer les variables dans le titre et le message
    let title = template.title;
    let message = template.message;
    let actionText = template.actionText;

    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{${key}}`, 'g');
      title = title.replace(regex, String(value));
      message = message.replace(regex, String(value));
      if (actionText) {
        actionText = actionText.replace(regex, String(value));
      }
    }

    const notification = await prisma.notification.create({
      data: {
        userId,
        type: template.type,
        category: template.category,
        priority: template.priority,
        title,
        message,
        actionText,
        actionUrl: options?.actionUrl,
        metadata: options?.metadata,
        expiresAt: options?.expiresAt,
        read: false
      }
    });

    // Envoyer la notification en temps réel si possible
    await this.sendRealTimeNotification(notification);

    return notification;
  }

  /**
   * Créer une notification personnalisée
   */
  static async createCustomNotification(
    userId: string,
    notification: Omit<Notification, 'id' | 'userId' | 'read' | 'createdAt'>
  ): Promise<Notification> {
    const result = await prisma.notification.create({
      data: {
        userId,
        type: notification.type,
        category: notification.category,
        priority: notification.priority,
        title: notification.title,
        message: notification.message,
        actionText: notification.actionText,
        actionUrl: notification.actionUrl,
        metadata: notification.metadata,
        expiresAt: notification.expiresAt,
        read: false
      }
    });

    await this.sendRealTimeNotification(result);
    return result;
  }

  /**
   * Récupérer les notifications d'un utilisateur
   */
  static async getUserNotifications(
    userId: string,
    options?: {
      unreadOnly?: boolean;
      category?: Notification['category'];
      limit?: number;
      offset?: number;
    }
  ): Promise<Notification[]> {
    const where: any = { userId };

    if (options?.unreadOnly) {
      where.read = false;
    }

    if (options?.category) {
      where.category = options.category;
    }

    return prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: options?.limit || 50,
      skip: options?.offset || 0
    });
  }

  /**
   * Marquer une notification comme lue
   */
  static async markAsRead(notificationId: string, userId: string): Promise<void> {
    await prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: { read: true }
    });
  }

  /**
   * Marquer toutes les notifications comme lues
   */
  static async markAllAsRead(userId: string, category?: Notification['category']): Promise<void> {
    const where: any = { userId, read: false };
    if (category) {
      where.category = category;
    }

    await prisma.notification.updateMany({
      where,
      data: { read: true }
    });
  }

  /**
   * Supprimer une notification
   */
  static async deleteNotification(notificationId: string, userId: string): Promise<void> {
    await prisma.notification.deleteMany({
      where: { id: notificationId, userId }
    });
  }

  /**
   * Supprimer les notifications expirées
   */
  static async cleanupExpiredNotifications(): Promise<number> {
    const result = await prisma.notification.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    });

    return result.count;
  }

  /**
   * Obtenir les statistiques des notifications
   */
  static async getNotificationStats(userId: string): Promise<{
    total: number;
    unread: number;
    byCategory: Record<string, number>;
    byPriority: Record<string, number>;
  }> {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      select: {
        read: true,
        category: true,
        priority: true
      }
    });

    const stats = {
      total: notifications.length,
      unread: notifications.filter(n => !n.read).length,
      byCategory: {} as Record<string, number>,
      byPriority: {} as Record<string, number>
    };

    // Compter par catégorie
    notifications.forEach(n => {
      stats.byCategory[n.category] = (stats.byCategory[n.category] || 0) + 1;
      stats.byPriority[n.priority] = (stats.byPriority[n.priority] || 0) + 1;
    });

    return stats;
  }

  /**
   * Envoyer une notification en temps réel (WebSocket/Push)
   */
  private static async sendRealTimeNotification(notification: Notification): Promise<void> {
    // Implémentation pour WebSocket ou Push notifications
    // Pour l'instant, on simule l'envoi
    console.log('Envoi notification temps réel:', notification.title);
    
    // TODO: Implémenter l'envoi via WebSocket ou service de push
    // Exemple avec Socket.io ou service de push comme OneSignal
  }

  /**
   * Créer une notification de rappel automatique
   */
  static async createReminderNotification(
    userId: string,
    reminderType: 'compliance' | 'payment' | 'renewal',
    data: Record<string, any>
  ): Promise<Notification> {
    const templates = {
      compliance: 'compliance-deadline',
      payment: 'payment-reminder',
      renewal: 'renewal-reminder'
    };

    return this.createNotification(userId, templates[reminderType], data, {
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
    });
  }

  /**
   * Créer une notification d'insight IA
   */
  static async createAIInsightNotification(
    userId: string,
    insight: {
      type: string;
      companyName: string;
      description: string;
      impact: 'low' | 'medium' | 'high';
    }
  ): Promise<Notification> {
    return this.createCustomNotification(userId, {
      type: 'info',
      category: 'ai',
      priority: insight.impact === 'high' ? 'high' : 'medium',
      title: `Insight IA: ${insight.type}`,
      message: `Pour ${insight.companyName}: ${insight.description}`,
      actionText: 'Voir les détails',
      actionUrl: `/dashboard/ai-insights`,
      metadata: { insight }
    });
  }
}

// Fonctions utilitaires pour les notifications courantes
export const NotificationUtils = {
  /**
   * Notification de bienvenue pour nouveaux utilisateurs
   */
  async sendWelcomeNotification(userId: string, userName: string): Promise<void> {
    await NotificationService.createCustomNotification(userId, {
      type: 'success',
      category: 'system',
      priority: 'medium',
      title: 'Bienvenue sur ProsperaLink !',
      message: `Bonjour ${userName}, nous sommes ravis de vous accompagner dans votre aventure entrepreneuriale.`,
      actionText: 'Commencer',
      actionUrl: '/dashboard'
    });
  },

  /**
   * Notification de formation LLC réussie
   */
  async sendFormationSuccessNotification(userId: string, companyName: string): Promise<void> {
    await NotificationService.createNotification(userId, 'formation-success', {
      companyName
    }, {
      actionUrl: `/dashboard/company/${companyName}`,
      actionText: 'Voir ma LLC'
    });
  },

  /**
   * Notification d'échéance de conformité
   */
  async sendComplianceDeadlineNotification(
    userId: string,
    companyName: string,
    deadline: string,
    documentType: string
  ): Promise<void> {
    await NotificationService.createNotification(userId, 'compliance-deadline', {
      companyName,
      deadline,
      documentType
    }, {
      actionUrl: `/dashboard/compliance`,
      priority: 'high'
    });
  }
}; 