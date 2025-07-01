import { prisma } from '@/lib/prisma';
import complianceData from '@/lib/data/state-compliance-requirements.json';

export interface ComplianceRequirement {
  name: string;
  category: string;
  fee: number | string;
  notes?: string;
  dueDate?: string;
  lateFee?: number;
  gracePeriod?: number;
  estimatedFee?: string;
  feeNotes?: string;
}

export interface StateComplianceData {
  state: string;
  stateCode: string;
  stateFilings: ComplianceRequirement[];
  taxRequirements: ComplianceRequirement[];
  potentialOtherRequirements: ComplianceRequirement[];
  totalEstimatedAnnualCost: number;
}

export class ComplianceService {
  /**
   * Génère des tâches de conformité intelligentes pour un utilisateur
   */
  static async generateComplianceTasks(userId: string, companyId?: string) {
    try {
      // Récupérer les informations de l'utilisateur et de sa société
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          companies: true
        }
      });

      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }

      const company = user.companies[0]; // Prendre la première société
      if (!company) {
        throw new Error('Aucune société trouvée pour cet utilisateur');
      }

      // Récupérer les données de conformité pour l'État
      const stateData = complianceData.find(
        (state: StateComplianceData) => state.state === company.state
      );

      if (!stateData) {
        throw new Error(`Données de conformité non disponibles pour l'état ${company.state}`);
      }

      const tasks = [];

      // 1. Générer les tâches avec dates d'échéance précises
      const tasksWithDeadlines = await this.generateTasksWithDeadlines(
        userId,
        companyId || company.id,
        stateData,
        company
      );
      tasks.push(...tasksWithDeadlines);

      // 2. Générer les tâches informatives/à vérifier
      const informationalTasks = await this.generateInformationalTasks(
        userId,
        companyId || company.id,
        stateData,
        company
      );
      tasks.push(...informationalTasks);

      // 3. Générer les tâches basées sur l'industrie (si applicable)
      const industryTasks = await this.generateIndustrySpecificTasks(
        userId,
        companyId || company.id,
        stateData,
        company
      );
      tasks.push(...industryTasks);

      return {
        success: true,
        message: `${tasks.length} tâches de conformité générées`,
        tasks,
        totalEstimatedCost: stateData.totalEstimatedAnnualCost
      };

    } catch (error) {
      console.error('Erreur lors de la génération des tâches de conformité:', error);
      throw error;
    }
  }

  /**
   * Génère les tâches avec des dates d'échéance précises
   */
  private static async generateTasksWithDeadlines(
    userId: string,
    companyId: string,
    stateData: StateComplianceData,
    company: any
  ) {
    const tasks = [];
    const currentYear = new Date().getFullYear();

    // Tâches de rapports d'État
    for (const filing of stateData.stateFilings) {
      const dueDate = this.calculateDueDate(filing.dueDateRule, company.formationDate, currentYear);
      
      const task = await prisma.complianceTask.create({
        data: {
          userId,
          companyId,
          name: filing.name,
          category: filing.category,
          description: filing.description,
          status: 'PENDING',
          priority: this.calculatePriority(dueDate),
          dueDate,
          estimatedFee: typeof filing.fee === 'number' ? filing.fee.toString() : filing.fee,
          feeNotes: `Frais de retard: $${filing.lateFee || 0}`,
          notes: `URL: ${filing.filingUrl}`
        }
      });
      tasks.push(task);
    }

    // Tâches fiscales avec dates d'échéance
    for (const tax of stateData.taxRequirements) {
      if (tax.dueDate && tax.dueDate !== 'N/A') {
        const dueDate = this.calculateTaxDueDate(tax.dueDate, currentYear);
        
        const task = await prisma.complianceTask.create({
          data: {
            userId,
            companyId,
            name: tax.name,
            category: tax.category,
            description: tax.notes,
            status: 'PENDING',
            priority: this.calculatePriority(dueDate),
            dueDate,
            estimatedFee: typeof tax.fee === 'number' ? tax.fee.toString() : tax.fee,
            feeNotes: `Frais de retard: $${tax.lateFee || 0}`
          }
        });
        tasks.push(task);
      }
    }

    return tasks;
  }

  /**
   * Génère les tâches informatives/à vérifier
   */
  private static async generateInformationalTasks(
    userId: string,
    companyId: string,
    stateData: StateComplianceData,
    company: any
  ) {
    const tasks = [];

    for (const requirement of stateData.potentialOtherRequirements) {
      const task = await prisma.complianceTask.create({
        data: {
          userId,
          companyId,
          name: requirement.name,
          category: requirement.category,
          description: requirement.notes,
          status: 'PENDING',
          priority: 'MEDIUM',
          dueDate: null, // Pas de date d'échéance précise
          estimatedFee: requirement.estimatedFee,
          feeNotes: requirement.feeNotes,
          notes: 'Tâche à vérifier selon votre situation spécifique'
        }
      });
      tasks.push(task);
    }

    return tasks;
  }

  /**
   * Génère les tâches spécifiques à l'industrie
   */
  private static async generateIndustrySpecificTasks(
    userId: string,
    companyId: string,
    stateData: StateComplianceData,
    company: any
  ) {
    const tasks = [];

    // Ajouter des tâches basées sur le type d'entreprise
    if (company.businessType) {
      const businessType = company.businessType.toLowerCase();
      
      // Tâches pour les entreprises en ligne
      if (businessType.includes('ecommerce') || businessType.includes('online')) {
        const onlineTask = await prisma.complianceTask.create({
          data: {
            userId,
            companyId,
            name: 'Vérifier les exigences de conformité en ligne',
            category: 'INDUSTRY_SPECIFIC',
            description: 'Vérifier les exigences de protection des données, cookies, et commerce électronique',
            status: 'PENDING',
            priority: 'HIGH',
            dueDate: null,
            estimatedFee: '0-2000',
            feeNotes: 'Coûts variables selon les exigences',
            notes: 'Important pour les entreprises en ligne'
          }
        });
        tasks.push(onlineTask);
      }

      // Tâches pour les entreprises de services
      if (businessType.includes('service') || businessType.includes('consulting')) {
        const serviceTask = await prisma.complianceTask.create({
          data: {
            userId,
            companyId,
            name: 'Vérifier les licences professionnelles',
            category: 'INDUSTRY_SPECIFIC',
            description: 'Vérifier si votre profession nécessite des licences d\'État spécifiques',
            status: 'PENDING',
            priority: 'HIGH',
            dueDate: null,
            estimatedFee: '100-1000',
            feeNotes: 'Varie selon la profession',
            notes: 'Critique pour éviter les sanctions'
          }
        });
        tasks.push(serviceTask);
      }
    }

    return tasks;
  }

  /**
   * Calcule la date d'échéance basée sur les règles
   */
  private static calculateDueDate(dueDateRule: any, formationDate: Date, year: number): Date {
    if (!dueDateRule) return new Date();

    switch (dueDateRule.type) {
      case 'annual_march':
        return new Date(year, 2, dueDateRule.day); // Mars = mois 2 (0-indexed)
      case 'annual_may':
        return new Date(year, 4, dueDateRule.day); // Mai = mois 4
      case 'annual_august':
        return new Date(year, 7, dueDateRule.day); // Août = mois 7
      case 'annual_december':
        return new Date(year, 11, dueDateRule.day); // Décembre = mois 11
      case 'annual_anniversary':
        if (formationDate) {
          const formation = new Date(formationDate);
          return new Date(year, formation.getMonth(), formation.getDate());
        }
        return new Date(year, 11, 31); // Par défaut, fin d'année
      case 'biennial_anniversary':
        if (formationDate) {
          const formation = new Date(formationDate);
          const biennialYear = year + (year % 2 === 0 ? 0 : 1);
          return new Date(biennialYear, formation.getMonth(), formation.getDate());
        }
        return new Date(year + 1, 11, 31);
      default:
        return new Date(year, 11, 31);
    }
  }

  /**
   * Calcule la date d'échéance fiscale
   */
  private static calculateTaxDueDate(dueDate: string, year: number): Date {
    const [month, day] = dueDate.split(' ');
    const monthMap: { [key: string]: number } = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    
    return new Date(year, monthMap[month], parseInt(day));
  }

  /**
   * Calcule la priorité basée sur la proximité de la date d'échéance
   */
  private static calculatePriority(dueDate: Date): string {
    const now = new Date();
    const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilDue < 0) return 'CRITICAL'; // En retard
    if (daysUntilDue <= 30) return 'HIGH';
    if (daysUntilDue <= 90) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * Récupère toutes les tâches de conformité d'un utilisateur
   */
  static async getUserComplianceTasks(userId: string) {
    return await prisma.complianceTask.findMany({
      where: { userId },
      include: {
        company: true
      },
      orderBy: [
        { priority: 'desc' },
        { dueDate: 'asc' }
      ]
    });
  }

  /**
   * Met à jour le statut d'une tâche
   */
  static async updateTaskStatus(taskId: string, status: string, notes?: string) {
    return await prisma.complianceTask.update({
      where: { id: taskId },
      data: {
        status,
        completedAt: status === 'COMPLETED' ? new Date() : null,
        notes: notes || undefined
      }
    });
  }

  /**
   * Calcule le coût total estimé de conformité
   */
  static async calculateTotalComplianceCost(userId: string) {
    const tasks = await this.getUserComplianceTasks(userId);
    let totalCost = 0;

    for (const task of tasks) {
      if (task.estimatedFee) {
        const fee = task.estimatedFee;
        if (typeof fee === 'string' && fee.includes('-')) {
          // Prendre la moyenne si c'est une fourchette
          const [min, max] = fee.split('-').map(f => parseFloat(f.replace(/[^0-9.]/g, '')));
          totalCost += (min + max) / 2;
        } else {
          totalCost += parseFloat(fee.toString()) || 0;
        }
      }
    }

    return totalCost;
  }
} 