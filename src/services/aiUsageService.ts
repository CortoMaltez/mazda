import { prisma } from "@/lib/prisma";

export interface AIUsageResult {
  success: boolean;
  currentUsage: number;
  monthlyBudget: number;
  remainingTokens: number;
  error?: string;
}

export class AIUsageService {
  private static readonly DEFAULT_MONTHLY_BUDGET = 1000000; // 1M tokens par défaut

  /**
   * Vérifie et enregistre l'usage IA d'un utilisateur
   */
  static async checkAndRecordAIUsage(
    userId: string, 
    tokensForThisRequest: number
  ): Promise<AIUsageResult> {
    try {
      // Récupérer l'utilisateur avec son usage actuel
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          aiTokenUsage: true,
          aiMonthlyBudget: true,
          aiLastUsage: true
        }
      });

      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }

      const currentUsage = user.aiTokenUsage || 0;
      const monthlyBudget = user.aiMonthlyBudget || this.DEFAULT_MONTHLY_BUDGET;
      const newTotalUsage = currentUsage + tokensForThisRequest;

      // Vérifier si l'usage dépasse le budget
      if (newTotalUsage > monthlyBudget) {
        return {
          success: false,
          currentUsage,
          monthlyBudget,
          remainingTokens: Math.max(0, monthlyBudget - currentUsage),
          error: `Budget IA dépassé. Usage actuel: ${currentUsage}, Budget: ${monthlyBudget}, Requis: ${tokensForThisRequest}`
        };
      }

      // Mettre à jour l'usage dans la base de données
      await prisma.user.update({
        where: { id: userId },
        data: {
          aiTokenUsage: newTotalUsage,
          aiLastUsage: new Date()
        }
      });

      return {
        success: true,
        currentUsage: newTotalUsage,
        monthlyBudget,
        remainingTokens: monthlyBudget - newTotalUsage
      };
    } catch (error) {
      console.error("Erreur lors de la vérification de l'usage IA:", error);
      throw new Error("Erreur lors de la vérification de l'usage IA");
    }
  }

  /**
   * Récupère l'usage IA actuel d'un utilisateur
   */
  static async getAIUsage(userId: string): Promise<{
    currentUsage: number;
    monthlyBudget: number;
    remainingTokens: number;
    lastUsage: Date | null;
  }> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        aiTokenUsage: true,
        aiMonthlyBudget: true,
        aiLastUsage: true
      }
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    const currentUsage = user.aiTokenUsage || 0;
    const monthlyBudget = user.aiMonthlyBudget || this.DEFAULT_MONTHLY_BUDGET;

    return {
      currentUsage,
      monthlyBudget,
      remainingTokens: Math.max(0, monthlyBudget - currentUsage),
      lastUsage: user.aiLastUsage
    };
  }

  /**
   * Réinitialise l'usage IA mensuel (à appeler au début de chaque mois)
   */
  static async resetMonthlyUsage(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        aiTokenUsage: 0,
        aiLastUsage: new Date()
      }
    });
  }

  /**
   * Met à jour le budget mensuel d'un utilisateur
   */
  static async updateMonthlyBudget(userId: string, newBudget: number): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        aiMonthlyBudget: newBudget
      }
    });
  }

  /**
   * Obtient les statistiques d'usage IA pour tous les utilisateurs (admin seulement)
   */
  static async getAllUsersAIUsage(): Promise<Array<{
    userId: string;
    email: string;
    name: string;
    currentUsage: number;
    monthlyBudget: number;
    usagePercentage: number;
    lastUsage: Date | null;
  }>> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        aiTokenUsage: true,
        aiMonthlyBudget: true,
        aiLastUsage: true
      }
    });

    return users.map(user => {
      const currentUsage = user.aiTokenUsage || 0;
      const monthlyBudget = user.aiMonthlyBudget || this.DEFAULT_MONTHLY_BUDGET;
      const usagePercentage = monthlyBudget > 0 ? (currentUsage / monthlyBudget) * 100 : 0;

      return {
        userId: user.id,
        email: user.email,
        name: user.name,
        currentUsage,
        monthlyBudget,
        usagePercentage: Math.round(usagePercentage * 100) / 100,
        lastUsage: user.aiLastUsage
      };
    });
  }

  /**
   * Obtient les statistiques d'usage IA pour un consultant et ses clients assignés
   */
  static async getConsultantAIUsage(consultantId: string): Promise<{
    consultant: {
      currentUsage: number;
      monthlyBudget: number;
      usagePercentage: number;
    };
    managedUsers: Array<{
      userId: string;
      email: string;
      name: string;
      currentUsage: number;
      monthlyBudget: number;
      usagePercentage: number;
    }>;
  }> {
    // Usage du consultant
    const consultant = await prisma.user.findUnique({
      where: { id: consultantId },
      select: {
        aiTokenUsage: true,
        aiMonthlyBudget: true
      }
    });

    if (!consultant) {
      throw new Error("Consultant non trouvé");
    }

    // Usage des utilisateurs gérés par le consultant
    const managedUsers = await prisma.user.findMany({
      where: {
        companies: {
          some: {
            accountManagerId: consultantId
          }
        }
      },
      select: {
        id: true,
        email: true,
        name: true,
        aiTokenUsage: true,
        aiMonthlyBudget: true
      }
    });

    const consultantUsage = consultant.aiTokenUsage || 0;
    const consultantBudget = consultant.aiMonthlyBudget || this.DEFAULT_MONTHLY_BUDGET;
    const consultantPercentage = consultantBudget > 0 ? (consultantUsage / consultantBudget) * 100 : 0;

    return {
      consultant: {
        currentUsage: consultantUsage,
        monthlyBudget: consultantBudget,
        usagePercentage: Math.round(consultantPercentage * 100) / 100
      },
      managedUsers: managedUsers.map(user => {
        const currentUsage = user.aiTokenUsage || 0;
        const monthlyBudget = user.aiMonthlyBudget || this.DEFAULT_MONTHLY_BUDGET;
        const usagePercentage = monthlyBudget > 0 ? (currentUsage / monthlyBudget) * 100 : 0;

        return {
          userId: user.id,
          email: user.email,
          name: user.name,
          currentUsage,
          monthlyBudget,
          usagePercentage: Math.round(usagePercentage * 100) / 100
        };
      })
    };
  }
} 