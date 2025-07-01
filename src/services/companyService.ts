import { prisma } from "@/lib/prisma";

export interface CompanyData {
  name: string;
  state: string;
  businessType: string;
  formationDate?: Date;
}

export interface CreateCompanyResult {
  message: string;
  company: any;
}

export class CompanyService {
  /**
   * Créer une nouvelle entreprise
   */
  static async createCompany(userId: string, companyData: CompanyData): Promise<CreateCompanyResult> {
    const { name, state, businessType, formationDate } = companyData;

    if (!name || !state || !businessType) {
      throw new Error("Nom, état et type d'entreprise sont requis");
    }

    const company = await prisma.company.create({
      data: {
        name,
        state,
        businessType,
        formationDate: formationDate ? new Date(formationDate) : null,
        userId,
      },
      include: {
        documents: true,
        payments: true,
      }
    });

    return {
      message: "Entreprise créée avec succès",
      company
    };
  }

  /**
   * Récupérer toutes les entreprises d'un utilisateur
   */
  static async getUserCompanies(userId: string) {
    return await prisma.company.findMany({
      where: {
        userId
      },
      include: {
        documents: true,
        payments: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  /**
   * Récupérer une entreprise par ID
   */
  static async getCompanyById(companyId: string, userId: string) {
    return await prisma.company.findFirst({
      where: {
        id: companyId,
        userId
      },
      include: {
        documents: true,
        payments: true,
      }
    });
  }

  /**
   * Mettre à jour une entreprise
   */
  static async updateCompany(companyId: string, userId: string, updateData: Partial<CompanyData>) {
    return await prisma.company.updateMany({
      where: {
        id: companyId,
        userId
      },
      data: updateData
    });
  }

  /**
   * Supprimer une entreprise
   */
  static async deleteCompany(companyId: string, userId: string) {
    return await prisma.company.deleteMany({
      where: {
        id: companyId,
        userId
      }
    });
  }
} 