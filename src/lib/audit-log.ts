import { prisma } from './prisma';

export interface AuditLogEntry {
  id: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'error' | 'critical';
  category: 'security' | 'business' | 'system' | 'compliance';
}

export interface AuditLogFilter {
  userId?: string;
  action?: string;
  resource?: string;
  severity?: AuditLogEntry['severity'];
  category?: AuditLogEntry['category'];
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export class AuditLogService {
  /**
   * Créer une entrée d'audit
   */
  static async log(
    action: string,
    resource: string,
    details: Record<string, any>,
    options?: {
      userId?: string;
      resourceId?: string;
      ipAddress?: string;
      userAgent?: string;
      severity?: AuditLogEntry['severity'];
      category?: AuditLogEntry['category'];
    }
  ): Promise<AuditLogEntry> {
    const entry = await prisma.auditLog.create({
      data: {
        userId: options?.userId,
        action,
        resource,
        resourceId: options?.resourceId,
        details,
        ipAddress: options?.ipAddress,
        userAgent: options?.userAgent,
        severity: options?.severity || 'info',
        category: options?.category || 'business'
      }
    });

    // Alerte pour les événements critiques
    if (entry.severity === 'critical') {
      await this.handleCriticalEvent(entry);
    }

    return entry;
  }

  /**
   * Rechercher dans les logs d'audit
   */
  static async search(filter: AuditLogFilter): Promise<{
    entries: AuditLogEntry[];
    total: number;
  }> {
    const where: any = {};

    if (filter.userId) where.userId = filter.userId;
    if (filter.action) where.action = filter.action;
    if (filter.resource) where.resource = filter.resource;
    if (filter.severity) where.severity = filter.severity;
    if (filter.category) where.category = filter.category;

    if (filter.startDate || filter.endDate) {
      where.timestamp = {};
      if (filter.startDate) where.timestamp.gte = filter.startDate;
      if (filter.endDate) where.timestamp.lte = filter.endDate;
    }

    const [entries, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        take: filter.limit || 100,
        skip: filter.offset || 0
      }),
      prisma.auditLog.count({ where })
    ]);

    return { entries, total };
  }

  /**
   * Obtenir les statistiques d'audit
   */
  static async getStats(options?: {
    startDate?: Date;
    endDate?: Date;
    userId?: string;
  }): Promise<{
    totalEntries: number;
    bySeverity: Record<string, number>;
    byCategory: Record<string, number>;
    byAction: Record<string, number>;
    topUsers: Array<{ userId: string; count: number }>;
  }> {
    const where: any = {};
    if (options?.startDate) where.timestamp = { gte: options.startDate };
    if (options?.endDate) where.timestamp = { ...where.timestamp, lte: options.endDate };
    if (options?.userId) where.userId = options.userId;

    const entries = await prisma.auditLog.findMany({
      where,
      select: {
        severity: true,
        category: true,
        action: true,
        userId: true
      }
    });

    const stats = {
      totalEntries: entries.length,
      bySeverity: {} as Record<string, number>,
      byCategory: {} as Record<string, number>,
      byAction: {} as Record<string, number>,
      topUsers: [] as Array<{ userId: string; count: number }>
    };

    // Compter par sévérité et catégorie
    entries.forEach(entry => {
      stats.bySeverity[entry.severity] = (stats.bySeverity[entry.severity] || 0) + 1;
      stats.byCategory[entry.category] = (stats.byCategory[entry.category] || 0) + 1;
      stats.byAction[entry.action] = (stats.byAction[entry.action] || 0) + 1;
    });

    // Top utilisateurs
    const userCounts: Record<string, number> = {};
    entries.forEach(entry => {
      if (entry.userId) {
        userCounts[entry.userId] = (userCounts[entry.userId] || 0) + 1;
      }
    });

    stats.topUsers = Object.entries(userCounts)
      .map(([userId, count]) => ({ userId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return stats;
  }

  /**
   * Gérer les événements critiques
   */
  private static async handleCriticalEvent(entry: AuditLogEntry): Promise<void> {
    // Envoyer une alerte aux administrateurs
    console.log('ÉVÉNEMENT CRITIQUE:', entry);

    // TODO: Implémenter l'envoi d'alertes
    // - Email aux admins
    // - Notification Slack/Discord
    // - SMS pour les événements très critiques
  }

  /**
   * Exporter les logs d'audit
   */
  static async exportLogs(filter: AuditLogFilter, format: 'json' | 'csv'): Promise<string> {
    const { entries } = await this.search(filter);

    if (format === 'json') {
      return JSON.stringify(entries, null, 2);
    }

    // Format CSV
    const headers = ['Timestamp', 'User ID', 'Action', 'Resource', 'Severity', 'Category', 'Details'];
    const csvRows = [headers.join(',')];

    entries.forEach(entry => {
      const row = [
        entry.timestamp.toISOString(),
        entry.userId || '',
        entry.action,
        entry.resource,
        entry.severity,
        entry.category,
        JSON.stringify(entry.details)
      ];
      csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
  }
}

// Actions d'audit prédéfinies
export const AuditActions = {
  // Authentification
  LOGIN: 'user.login',
  LOGOUT: 'user.logout',
  LOGIN_FAILED: 'user.login_failed',
  PASSWORD_CHANGE: 'user.password_change',
  PASSWORD_RESET: 'user.password_reset',

  // Gestion des entreprises
  COMPANY_CREATE: 'company.create',
  COMPANY_UPDATE: 'company.update',
  COMPANY_DELETE: 'company.delete',
  COMPANY_STATUS_CHANGE: 'company.status_change',

  // Documents
  DOCUMENT_GENERATE: 'document.generate',
  DOCUMENT_DOWNLOAD: 'document.download',
  DOCUMENT_DELETE: 'document.delete',

  // Paiements
  PAYMENT_CREATE: 'payment.create',
  PAYMENT_SUCCESS: 'payment.success',
  PAYMENT_FAILED: 'payment.failed',
  PAYMENT_REFUND: 'payment.refund',

  // Conformité
  COMPLIANCE_CHECK: 'compliance.check',
  COMPLIANCE_UPDATE: 'compliance.update',
  COMPLIANCE_DEADLINE: 'compliance.deadline',

  // Administration
  ADMIN_USER_UPDATE: 'admin.user_update',
  ADMIN_SYSTEM_CONFIG: 'admin.system_config',
  ADMIN_DATA_EXPORT: 'admin.data_export',

  // Sécurité
  SECURITY_ALERT: 'security.alert',
  SECURITY_BREACH: 'security.breach',
  SECURITY_LOGIN_ATTEMPT: 'security.login_attempt'
} as const;

// Fonctions utilitaires pour l'audit
export const AuditUtils = {
  /**
   * Logger une connexion utilisateur
   */
  async logUserLogin(userId: string, ipAddress: string, userAgent: string): Promise<void> {
    await AuditLogService.log(
      AuditActions.LOGIN,
      'user',
      { ipAddress, userAgent },
      {
        userId,
        ipAddress,
        userAgent,
        severity: 'info',
        category: 'security'
      }
    );
  },

  /**
   * Logger une tentative de connexion échouée
   */
  async logLoginFailed(email: string, ipAddress: string, userAgent: string, reason: string): Promise<void> {
    await AuditLogService.log(
      AuditActions.LOGIN_FAILED,
      'user',
      { email, ipAddress, userAgent, reason },
      {
        ipAddress,
        userAgent,
        severity: 'warning',
        category: 'security'
      }
    );
  },

  /**
   * Logger la création d'une entreprise
   */
  async logCompanyCreation(userId: string, companyId: string, companyName: string): Promise<void> {
    await AuditLogService.log(
      AuditActions.COMPANY_CREATE,
      'company',
      { companyName },
      {
        userId,
        resourceId: companyId,
        severity: 'info',
        category: 'business'
      }
    );
  },

  /**
   * Logger un paiement
   */
  async logPayment(userId: string, paymentId: string, amount: number, status: string): Promise<void> {
    await AuditLogService.log(
      AuditActions.PAYMENT_CREATE,
      'payment',
      { amount, status },
      {
        userId,
        resourceId: paymentId,
        severity: 'info',
        category: 'business'
      }
    );
  },

  /**
   * Logger une action administrative
   */
  async logAdminAction(adminUserId: string, action: string, targetUserId: string, details: Record<string, any>): Promise<void> {
    await AuditLogService.log(
      action,
      'admin',
      { targetUserId, ...details },
      {
        userId: adminUserId,
        severity: 'warning',
        category: 'system'
      }
    );
  }
}; 