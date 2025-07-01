import { prisma } from './prisma'

export interface Company {
  id: string
  name: string
  state: string
  ein: string
  formationDate: Date
  status: 'active' | 'pending' | 'suspended' | 'dissolved'
  members: CompanyMember[]
  documents: Document[]
  compliance: ComplianceRecord[]
  financials: FinancialRecord[]
  createdAt: Date
  updatedAt: Date
}

export interface CompanyMember {
  id: string
  companyId: string
  name: string
  role: 'owner' | 'manager' | 'member'
  ownershipPercentage: number
  email: string
  phone?: string
  address: string
  ssn?: string
  createdAt: Date
}

export interface Document {
  id: string
  companyId: string
  name: string
  type: 'formation' | 'compliance' | 'financial' | 'legal' | 'other'
  status: 'pending' | 'approved' | 'rejected' | 'expired'
  fileUrl: string
  uploadedBy: string
  uploadedAt: Date
  expiresAt?: Date
  metadata?: any
}

export interface ComplianceRecord {
  id: string
  companyId: string
  type: 'annual_report' | 'tax_filing' | 'form_5472' | 'other'
  status: 'pending' | 'filed' | 'overdue' | 'completed'
  dueDate: Date
  filedDate?: Date
  amount?: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface FinancialRecord {
  id: string
  companyId: string
  type: 'income' | 'expense' | 'tax' | 'fee'
  amount: number
  description: string
  date: Date
  category: string
  status: 'pending' | 'processed' | 'reconciled'
  metadata?: any
  createdAt: Date
}

export interface Workflow {
  id: string
  companyId: string
  type: 'formation' | 'compliance' | 'document' | 'custom'
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  steps: WorkflowStep[]
  currentStep: number
  startedAt: Date
  completedAt?: Date
  metadata?: any
}

export interface WorkflowStep {
  id: string
  workflowId: string
  name: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  order: number
  assignedTo?: string
  startedAt?: Date
  completedAt?: Date
  notes?: string
}

export class ERPService {
  // Company Management
  async createCompany(data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company> {
    return await prisma.company.create({
      data: {
        ...data,
        members: {
          create: data.members
        },
        documents: {
          create: data.documents
        },
        compliance: {
          create: data.compliance
        },
        financials: {
          create: data.financials
        }
      },
      include: {
        members: true,
        documents: true,
        compliance: true,
        financials: true
      }
    })
  }

  async updateCompany(id: string, data: Partial<Company>): Promise<Company> {
    return await prisma.company.update({
      where: { id },
      data,
      include: {
        members: true,
        documents: true,
        compliance: true,
        financials: true
      }
    })
  }

  async getCompany(id: string): Promise<Company | null> {
    return await prisma.company.findUnique({
      where: { id },
      include: {
        members: true,
        documents: true,
        compliance: true,
        financials: true
      }
    })
  }

  async getCompanies(filters?: {
    status?: string
    state?: string
    formationDate?: { start: Date; end: Date }
  }): Promise<Company[]> {
    const where: any = {}
    
    if (filters?.status) where.status = filters.status
    if (filters?.state) where.state = filters.state
    if (filters?.formationDate) {
      where.formationDate = {
        gte: filters.formationDate.start,
        lte: filters.formationDate.end
      }
    }

    return await prisma.company.findMany({
      where,
      include: {
        members: true,
        documents: true,
        compliance: true,
        financials: true
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  // Document Management
  async uploadDocument(data: Omit<Document, 'id' | 'uploadedAt'>): Promise<Document> {
    return await prisma.document.create({
      data: {
        ...data,
        uploadedAt: new Date()
      }
    })
  }

  async updateDocument(id: string, data: Partial<Document>): Promise<Document> {
    return await prisma.document.update({
      where: { id },
      data
    })
  }

  async getDocuments(companyId: string, type?: string): Promise<Document[]> {
    const where: any = { companyId }
    if (type) where.type = type

    return await prisma.document.findMany({
      where,
      orderBy: { uploadedAt: 'desc' }
    })
  }

  // Compliance Management
  async createComplianceRecord(data: Omit<ComplianceRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<ComplianceRecord> {
    return await prisma.complianceRecord.create({
      data
    })
  }

  async updateComplianceRecord(id: string, data: Partial<ComplianceRecord>): Promise<ComplianceRecord> {
    return await prisma.complianceRecord.update({
      where: { id },
      data
    })
  }

  async getComplianceRecords(companyId: string, status?: string): Promise<ComplianceRecord[]> {
    const where: any = { companyId }
    if (status) where.status = status

    return await prisma.complianceRecord.findMany({
      where,
      orderBy: { dueDate: 'asc' }
    })
  }

  async getOverdueCompliance(): Promise<ComplianceRecord[]> {
    return await prisma.complianceRecord.findMany({
      where: {
        status: 'pending',
        dueDate: {
          lt: new Date()
        }
      },
      include: {
        company: true
      },
      orderBy: { dueDate: 'asc' }
    })
  }

  // Financial Management
  async createFinancialRecord(data: Omit<FinancialRecord, 'id' | 'createdAt'>): Promise<FinancialRecord> {
    return await prisma.financialRecord.create({
      data
    })
  }

  async getFinancialRecords(companyId: string, filters?: {
    type?: string
    category?: string
    dateRange?: { start: Date; end: Date }
  }): Promise<FinancialRecord[]> {
    const where: any = { companyId }
    
    if (filters?.type) where.type = filters.type
    if (filters?.category) where.category = filters.category
    if (filters?.dateRange) {
      where.date = {
        gte: filters.dateRange.start,
        lte: filters.dateRange.end
      }
    }

    return await prisma.financialRecord.findMany({
      where,
      orderBy: { date: 'desc' }
    })
  }

  async getFinancialSummary(companyId: string, period: { start: Date; end: Date }) {
    const records = await this.getFinancialRecords(companyId, { dateRange: period })
    
    const summary = {
      totalIncome: 0,
      totalExpenses: 0,
      totalTaxes: 0,
      totalFees: 0,
      netIncome: 0,
      byCategory: {} as Record<string, number>
    }

    records.forEach(record => {
      switch (record.type) {
        case 'income':
          summary.totalIncome += record.amount
          break
        case 'expense':
          summary.totalExpenses += record.amount
          break
        case 'tax':
          summary.totalTaxes += record.amount
          break
        case 'fee':
          summary.totalFees += record.amount
          break
      }

      summary.byCategory[record.category] = (summary.byCategory[record.category] || 0) + record.amount
    })

    summary.netIncome = summary.totalIncome - summary.totalExpenses - summary.totalTaxes - summary.totalFees

    return summary
  }

  // Workflow Management
  async createWorkflow(data: Omit<Workflow, 'id' | 'startedAt'>): Promise<Workflow> {
    return await prisma.workflow.create({
      data: {
        ...data,
        startedAt: new Date(),
        steps: {
          create: data.steps
        }
      },
      include: {
        steps: true
      }
    })
  }

  async updateWorkflow(id: string, data: Partial<Workflow>): Promise<Workflow> {
    return await prisma.workflow.update({
      where: { id },
      data,
      include: {
        steps: true
      }
    })
  }

  async getWorkflows(companyId: string, status?: string): Promise<Workflow[]> {
    const where: any = { companyId }
    if (status) where.status = status

    return await prisma.workflow.findMany({
      where,
      include: {
        steps: true
      },
      orderBy: { startedAt: 'desc' }
    })
  }

  async advanceWorkflow(workflowId: string): Promise<Workflow> {
    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId },
      include: { steps: true }
    })

    if (!workflow) throw new Error('Workflow not found')

    const currentStep = workflow.steps.find(step => step.order === workflow.currentStep)
    if (currentStep) {
      await prisma.workflowStep.update({
        where: { id: currentStep.id },
        data: { 
          status: 'completed',
          completedAt: new Date()
        }
      })
    }

    const nextStep = workflow.steps.find(step => step.order === workflow.currentStep + 1)
    if (nextStep) {
      await prisma.workflowStep.update({
        where: { id: nextStep.id },
        data: { 
          status: 'in_progress',
          startedAt: new Date()
        }
      })

      return await this.updateWorkflow(workflowId, { currentStep: workflow.currentStep + 1 })
    } else {
      return await this.updateWorkflow(workflowId, { 
        status: 'completed',
        completedAt: new Date()
      })
    }
  }

  // Analytics
  async getCompanyAnalytics() {
    const total = await prisma.company.count()
    const byStatus = await prisma.company.groupBy({
      by: ['status'],
      _count: { status: true }
    })
    const byState = await prisma.company.groupBy({
      by: ['state'],
      _count: { state: true }
    })
    const active = await prisma.company.count({ where: { status: 'active' } })

    return {
      total,
      active,
      byStatus,
      byState,
      activeRate: total > 0 ? (active / total) * 100 : 0
    }
  }

  async getComplianceAnalytics() {
    const total = await prisma.complianceRecord.count()
    const overdue = await prisma.complianceRecord.count({
      where: {
        status: 'pending',
        dueDate: { lt: new Date() }
      }
    })
    const dueThisMonth = await prisma.complianceRecord.count({
      where: {
        status: 'pending',
        dueDate: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        }
      }
    })

    return {
      total,
      overdue,
      dueThisMonth,
      complianceRate: total > 0 ? ((total - overdue) / total) * 100 : 0
    }
  }
}

export const erpService = new ERPService() 