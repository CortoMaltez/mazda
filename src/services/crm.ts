import { prisma } from '@/lib/prisma'

export interface Prospect {
  id: string
  email: string
  name: string
  phone?: string
  company?: string
  country: string
  source: 'chatbot' | 'website' | 'referral' | 'social'
  status: 'new' | 'qualified' | 'contacted' | 'converted' | 'lost'
  score: number
  interests: string[]
  budget?: number
  timeline?: string
  notes: string
  chatHistory: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

export interface ChatMessage {
  id: string
  prospectId: string
  message: string
  isFromUser: boolean
  timestamp: Date
  metadata?: any
}

export interface Lead {
  id: string
  prospectId: string
  status: 'pending' | 'qualified' | 'converted' | 'lost'
  assignedTo?: string
  priority: 'low' | 'medium' | 'high'
  estimatedValue: number
  conversionProbability: number
  nextAction?: string
  nextActionDate?: Date
  createdAt: Date
  updatedAt: Date
}

export class CRMService {
  // Prospect Management
  async createProspect(data: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>): Promise<Prospect> {
    return await prisma.prospect.create({
      data: {
        ...data,
        chatHistory: {
          create: data.chatHistory
        }
      },
      include: {
        chatHistory: true
      }
    })
  }

  async updateProspect(id: string, data: Partial<Prospect>): Promise<Prospect> {
    return await prisma.prospect.update({
      where: { id },
      data,
      include: {
        chatHistory: true
      }
    })
  }

  async getProspect(id: string): Promise<Prospect | null> {
    return await prisma.prospect.findUnique({
      where: { id },
      include: {
        chatHistory: true
      }
    })
  }

  async getProspects(filters?: {
    status?: string
    source?: string
    country?: string
    score?: { min: number; max: number }
  }): Promise<Prospect[]> {
    const where: any = {}
    
    if (filters?.status) where.status = filters.status
    if (filters?.source) where.source = filters.source
    if (filters?.country) where.country = filters.country
    if (filters?.score) {
      where.score = {
        gte: filters.score.min,
        lte: filters.score.max
      }
    }

    return await prisma.prospect.findMany({
      where,
      include: {
        chatHistory: true
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  // Lead Management
  async createLead(data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> {
    return await prisma.lead.create({
      data
    })
  }

  async updateLead(id: string, data: Partial<Lead>): Promise<Lead> {
    return await prisma.lead.update({
      where: { id },
      data
    })
  }

  async getLeads(filters?: {
    status?: string
    assignedTo?: string
    priority?: string
  }): Promise<Lead[]> {
    const where: any = {}
    
    if (filters?.status) where.status = filters.status
    if (filters?.assignedTo) where.assignedTo = filters.assignedTo
    if (filters?.priority) where.priority = filters.priority

    return await prisma.lead.findMany({
      where,
      include: {
        prospect: true
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  // Chat Management
  async addChatMessage(prospectId: string, message: Omit<ChatMessage, 'id' | 'prospectId'>): Promise<ChatMessage> {
    return await prisma.chatMessage.create({
      data: {
        ...message,
        prospectId
      }
    })
  }

  async getChatHistory(prospectId: string): Promise<ChatMessage[]> {
    return await prisma.chatMessage.findMany({
      where: { prospectId },
      orderBy: { timestamp: 'asc' }
    })
  }

  // Analytics
  async getProspectAnalytics() {
    const total = await prisma.prospect.count()
    const byStatus = await prisma.prospect.groupBy({
      by: ['status'],
      _count: { status: true }
    })
    const bySource = await prisma.prospect.groupBy({
      by: ['source'],
      _count: { source: true }
    })
    const conversionRate = await this.calculateConversionRate()

    return {
      total,
      byStatus,
      bySource,
      conversionRate
    }
  }

  async calculateConversionRate(): Promise<number> {
    const total = await prisma.prospect.count()
    const converted = await prisma.prospect.count({
      where: { status: 'converted' }
    })
    
    return total > 0 ? (converted / total) * 100 : 0
  }

  // Lead Scoring
  async updateLeadScore(prospectId: string): Promise<number> {
    const prospect = await this.getProspect(prospectId)
    if (!prospect) return 0

    let score = 0
    
    // Base score from engagement
    score += prospect.chatHistory.length * 5
    
    // Score from interests
    score += prospect.interests.length * 10
    
    // Score from budget
    if (prospect.budget && prospect.budget > 1000) {
      score += 20
    }
    
    // Score from timeline
    if (prospect.timeline === 'immediate') {
      score += 15
    } else if (prospect.timeline === 'within_30_days') {
      score += 10
    }
    
    // Score from source
    if (prospect.source === 'chatbot') {
      score += 5
    }

    // Update prospect with new score
    await this.updateProspect(prospectId, { score })
    
    return score
  }

  // AI Integration
  async qualifyProspectWithAI(prospectId: string): Promise<{
    qualified: boolean
    confidence: number
    reasoning: string
    nextActions: string[]
  }> {
    const prospect = await this.getProspect(prospectId)
    if (!prospect) {
      throw new Error('Prospect not found')
    }

    // Simple AI logic - in production, this would use Gemini API
    const chatEngagement = prospect.chatHistory.length
    const hasBudget = prospect.budget && prospect.budget > 500
    const hasTimeline = prospect.timeline && prospect.timeline !== 'no_timeline'
    const hasInterests = prospect.interests.length > 0

    let score = 0
    let reasoning = []

    if (chatEngagement >= 3) {
      score += 30
      reasoning.push('High chat engagement')
    }
    if (hasBudget) {
      score += 25
      reasoning.push('Has budget')
    }
    if (hasTimeline) {
      score += 20
      reasoning.push('Has timeline')
    }
    if (hasInterests) {
      score += 15
      reasoning.push('Shows interest')
    }

    const qualified = score >= 60
    const confidence = Math.min(score, 100)

    const nextActions = []
    if (qualified) {
      nextActions.push('Schedule discovery call')
      nextActions.push('Send pricing proposal')
      nextActions.push('Add to nurture sequence')
    } else {
      nextActions.push('Continue nurturing')
      nextActions.push('Send educational content')
      nextActions.push('Re-engage in 7 days')
    }

    return {
      qualified,
      confidence,
      reasoning: reasoning.join(', '),
      nextActions
    }
  }
}

export const crmService = new CRMService() 