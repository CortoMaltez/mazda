import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuration du budget IA
export const AI_BUDGET_CONFIG = {
  ANNUAL_BUDGET: 15000, // 15k$ par défaut (milieu de la fourchette 10-20k$)
  MONTHLY_BUDGET: 1250, // 15k$ / 12 mois
  DAILY_BUDGET: 41.67, // 15k$ / 365 jours
  COST_PER_1K_TOKENS: 0.0005, // Coût approximatif par 1k tokens Gemini Pro
  COST_PER_IMAGE: 0.0025, // Coût approximatif par image générée
  COST_PER_VIDEO: 0.05, // Coût approximatif par seconde de vidéo
};

export interface AICostTracker {
  dailyUsage: number;
  monthlyUsage: number;
  annualUsage: number;
  lastReset: Date;
  usageHistory: Array<{
    date: string;
    cost: number;
    tokens: number;
    images: number;
    videos: number;
    service: string;
  }>;
}

class GeminiCostManager {
  private genAI: GoogleGenerativeAI;
  private costTracker: AICostTracker;
  private isBudgetExceeded: boolean = false;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.costTracker = this.loadCostTracker();
    this.checkBudgetLimits();
  }

  private loadCostTracker(): AICostTracker {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gemini-cost-tracker');
      if (saved) {
        const tracker = JSON.parse(saved);
        // Vérifier si on doit réinitialiser les compteurs
        const now = new Date();
        const lastReset = new Date(tracker.lastReset);
        
        if (now.getDate() !== lastReset.getDate()) {
          tracker.dailyUsage = 0;
          tracker.lastReset = now.toISOString();
        }
        
        if (now.getMonth() !== lastReset.getMonth()) {
          tracker.monthlyUsage = 0;
        }
        
        return tracker;
      }
    }
    
    return {
      dailyUsage: 0,
      monthlyUsage: 0,
      annualUsage: 0,
      lastReset: new Date(),
      usageHistory: []
    };
  }

  private saveCostTracker() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini-cost-tracker', JSON.stringify(this.costTracker));
    }
  }

  private checkBudgetLimits() {
    const now = new Date();
    const today = now.toDateString();
    
    // Vérifier le budget quotidien
    if (this.costTracker.dailyUsage >= AI_BUDGET_CONFIG.DAILY_BUDGET) {
      this.isBudgetExceeded = true;
      console.warn('Budget IA quotidien dépassé');
    }
    
    // Vérifier le budget mensuel
    if (this.costTracker.monthlyUsage >= AI_BUDGET_CONFIG.MONTHLY_BUDGET) {
      this.isBudgetExceeded = true;
      console.warn('Budget IA mensuel dépassé');
    }
  }

  private trackUsage(cost: number, tokens: number = 0, images: number = 0, videos: number = 0, service: string = 'gemini') {
    this.costTracker.dailyUsage += cost;
    this.costTracker.monthlyUsage += cost;
    this.costTracker.annualUsage += cost;
    
    this.costTracker.usageHistory.push({
      date: new Date().toISOString(),
      cost,
      tokens,
      images,
      videos,
      service
    });
    
    // Garder seulement les 1000 dernières entrées
    if (this.costTracker.usageHistory.length > 1000) {
      this.costTracker.usageHistory = this.costTracker.usageHistory.slice(-1000);
    }
    
    this.saveCostTracker();
    this.checkBudgetLimits();
  }

  public async generateText(prompt: string, model: 'gemini-pro' | 'gemini-pro-vision' = 'gemini-pro'): Promise<string> {
    if (this.isBudgetExceeded) {
      throw new Error('Budget IA dépassé. Veuillez attendre la réinitialisation ou contacter l\'administrateur.');
    }

    try {
      const genModel = this.genAI.getGenerativeModel({ model });
      const result = await genModel.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Calculer le coût approximatif (basé sur les tokens)
      const estimatedTokens = Math.ceil((prompt.length + text.length) / 4); // Estimation approximative
      const cost = (estimatedTokens / 1000) * AI_BUDGET_CONFIG.COST_PER_1K_TOKENS;
      
      this.trackUsage(cost, estimatedTokens, 0, 0, model);
      
      return text;
    } catch (error) {
      console.error('Erreur lors de la génération de texte:', error);
      throw error;
    }
  }

  public async generateImage(prompt: string): Promise<string> {
    if (this.isBudgetExceeded) {
      throw new Error('Budget IA dépassé. Veuillez attendre la réinitialisation ou contacter l\'administrateur.');
    }

    try {
      // Utiliser Gemini pour générer une image (via l'API appropriée)
      const genModel = this.genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
      
      // Note: La génération d'images via Gemini nécessite une implémentation spécifique
      // Pour l'instant, on simule le coût
      const cost = AI_BUDGET_CONFIG.COST_PER_IMAGE;
      this.trackUsage(cost, 0, 1, 0, 'image-generation');
      
      // Retourner une URL d'image générée (à implémenter)
      return `https://api.example.com/generated-image/${Date.now()}`;
    } catch (error) {
      console.error('Erreur lors de la génération d\'image:', error);
      throw error;
    }
  }

  public async generateVideo(prompt: string, duration: number = 10): Promise<string> {
    if (this.isBudgetExceeded) {
      throw new Error('Budget IA dépassé. Veuillez attendre la réinitialisation ou contacter l\'administrateur.');
    }

    try {
      const cost = duration * AI_BUDGET_CONFIG.COST_PER_VIDEO;
      this.trackUsage(cost, 0, 0, duration, 'video-generation');
      
      // Retourner une URL de vidéo générée (à implémenter)
      return `https://api.example.com/generated-video/${Date.now()}`;
    } catch (error) {
      console.error('Erreur lors de la génération de vidéo:', error);
      throw error;
    }
  }

  public getCostStats() {
    return {
      ...this.costTracker,
      budgetRemaining: {
        daily: Math.max(0, AI_BUDGET_CONFIG.DAILY_BUDGET - this.costTracker.dailyUsage),
        monthly: Math.max(0, AI_BUDGET_CONFIG.MONTHLY_BUDGET - this.costTracker.monthlyUsage),
        annual: Math.max(0, AI_BUDGET_CONFIG.ANNUAL_BUDGET - this.costTracker.annualUsage)
      },
      budgetPercentage: {
        daily: (this.costTracker.dailyUsage / AI_BUDGET_CONFIG.DAILY_BUDGET) * 100,
        monthly: (this.costTracker.monthlyUsage / AI_BUDGET_CONFIG.MONTHLY_BUDGET) * 100,
        annual: (this.costTracker.annualUsage / AI_BUDGET_CONFIG.ANNUAL_BUDGET) * 100
      },
      isBudgetExceeded: this.isBudgetExceeded
    };
  }

  public resetBudget() {
    this.costTracker.dailyUsage = 0;
    this.costTracker.monthlyUsage = 0;
    this.costTracker.annualUsage = 0;
    this.costTracker.lastReset = new Date();
    this.isBudgetExceeded = false;
    this.saveCostTracker();
  }

  public getOptimizedPrompt(prompt: string, maxTokens: number = 1000): string {
    // Optimiser le prompt pour réduire les coûts
    if (prompt.length > maxTokens) {
      return prompt.substring(0, maxTokens) + '...';
    }
    return prompt;
  }
}

// Instance singleton
let costManagerInstance: GeminiCostManager | null = null;

export function getGeminiCostManager(apiKey?: string): GeminiCostManager | null {
  if (!costManagerInstance) {
    if (!apiKey) {
      apiKey = process.env.GEMINI_API_KEY || '';
    }
    if (!apiKey) {
      console.warn('Clé API Gemini non configurée. Les fonctionnalités IA seront désactivées.');
      return null;
    }
    costManagerInstance = new GeminiCostManager(apiKey);
  }
  return costManagerInstance;
}

export function resetGeminiCostManager() {
  costManagerInstance = null;
} 