import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "./prisma";
// Gestionnaire de coûts IA supprimé - remplacé par AIUsageService

// Configuration Mivion
export const MIVION_CONFIG = {
  UPDATE_INTERVAL: 3600000, // 1 heure
  COMPETITOR_SOURCES: [
    'legalzoom.com',
    'incfile.com', 
    'zenbusiness.com',
    'northwestregisteredagent.com',
    'rocketlawyer.com',
    'swyftfilings.com',
    'bizfilings.com',
    'corpnet.com'
  ],
  PRICE_MONITORING_ENABLED: true,
  AD_CAMPAIGN_MONITORING_ENABLED: true,
  SERVICE_COMPARISON_ENABLED: true
};

// Types pour l'analyse concurrentielle
export interface Competitor {
  id: string;
  name: string;
  website: string;
  lastUpdated: Date;
  pricing: CompetitorPricing[];
  services: CompetitorService[];
  ads: CompetitorAd[];
  marketPosition: MarketPosition;
}

export interface CompetitorPricing {
  state: string;
  basePrice: number;
  annualPrice: number;
  additionalFees: number;
  totalCost: number;
  lastUpdated: Date;
}

export interface CompetitorService {
  name: string;
  included: boolean;
  price: number;
  description: string;
}

export interface CompetitorAd {
  platform: 'facebook' | 'google' | 'linkedin';
  message: string;
  targetAudience: string;
  estimatedBudget: number;
  lastSeen: Date;
}

export interface MarketPosition {
  marketShare: number;
  pricePosition: 'premium' | 'mid-market' | 'budget';
  serviceCompleteness: number;
  customerSatisfaction: number;
}

export interface PricingOpportunity {
  state: string;
  competitorPrices: number[];
  ourCurrentPrice: number;
  recommendedPrice: number;
  potentialProfit: number;
  confidence: number;
  reasoning: string;
}

export interface AdOptimization {
  platform: string;
  currentBudget: number;
  recommendedBudget: number;
  targetAudience: string;
  message: string;
  expectedROI: number;
  reasoning: string;
}

export interface CompetitiveInsight {
  type: 'pricing' | 'service' | 'marketing' | 'threat' | 'opportunity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact: string;
  recommendation: string;
  estimatedValue: number;
}

class MivionCompetitiveIntelligence {
  private genAI: GoogleGenerativeAI;
  private costManager: any;
  private competitors: Competitor[] = [];
  private insights: CompetitiveInsight[] = [];
  private initialized: boolean = false;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
    // Gestionnaire de coûts IA supprimé - remplacé par AIUsageService
    // Initialisation différée pour éviter les erreurs de build
    this.initializeCompetitors().catch(console.error);
  }

  private async initializeCompetitors() {
    try {
    // Charger les données concurrentielles depuis la base
      const storedCompetitors = await prisma.competitor.findMany();
      this.competitors = storedCompetitors.map((c: any) => ({
      id: c.id,
      name: c.name,
      website: c.website,
      lastUpdated: c.lastUpdated,
      pricing: JSON.parse(c.pricingData || '[]'),
      services: JSON.parse(c.servicesData || '[]'),
      ads: JSON.parse(c.adsData || '[]'),
      marketPosition: JSON.parse(c.marketPositionData || '{}')
    }));
      this.initialized = true;
    } catch (error) {
      console.error('Erreur initialisation concurrents:', error);
      // Utiliser des données par défaut si la base n'est pas disponible
      this.competitors = [];
      this.initialized = true;
    }
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      await this.initializeCompetitors();
    }
  }

  // Analyse concurrentielle en temps réel
  public async analyzeCompetitiveLandscape(): Promise<CompetitiveInsight[]> {
    try {
      const prompt = `
        Analyse le marché de la formation d'entreprises LLC aux États-Unis.
        
        Concurrents principaux: ${MIVION_CONFIG.COMPETITOR_SOURCES.join(', ')}
        
        Notre position actuelle:
        - Prix moyen: $699-1519 selon l'état
        - Services: Formation LLC, EIN, Operating Agreement, Registered Agent, Annual Reports
        - Budget pub: $500 Meta Ads
        
        Génère des insights stratégiques pour:
        1. Optimiser nos prix vs concurrence
        2. Identifier des services manquants
        3. Maximiser le ROI du budget pub
        4. Détecter des opportunités de marché
        5. Anticiper les menaces concurrentielles
        
        Format de réponse: JSON avec insights détaillés
      `;

      const analysis = await this.costManager.generateText(prompt);
      const insights = JSON.parse(analysis);
      
      // Sauvegarder les insights
      await this.saveInsights(insights);
      
      return insights;
    } catch (error) {
      console.error('Erreur analyse concurrentielle:', error);
      return [];
    }
  }

  // Calcul des opportunités de prix
  public async calculatePricingOpportunities(): Promise<PricingOpportunity[]> {
    const opportunities: PricingOpportunity[] = [];
    
    // Analyser chaque état
    for (const state of ['Delaware', 'Wyoming', 'Nevada', 'California', 'Texas']) {
      const competitorPrices = this.getCompetitorPricesForState(state);
      const ourPrice = this.getOurPriceForState(state);
      
      if (competitorPrices.length > 0) {
        const avgCompetitorPrice = competitorPrices.reduce((a, b) => a + b, 0) / competitorPrices.length;
        const minCompetitorPrice = Math.min(...competitorPrices);
        const maxCompetitorPrice = Math.max(...competitorPrices);
        
        // Stratégie de prix agressive
        const recommendedPrice = Math.max(
          minCompetitorPrice * 0.9, // 10% moins cher que le moins cher
          ourPrice * 0.95 // Mais pas moins de 95% de notre prix actuel
        );
        
        const potentialProfit = (recommendedPrice - ourPrice) * 100; // Estimation 100 ventes
        
        opportunities.push({
          state,
          competitorPrices,
          ourCurrentPrice: ourPrice,
          recommendedPrice: Math.round(recommendedPrice),
          potentialProfit: Math.round(potentialProfit),
          confidence: 0.85,
          reasoning: `Prix concurrents: $${minCompetitorPrice}-${maxCompetitorPrice}, moyenne: $${Math.round(avgCompetitorPrice)}. Recommandation: $${Math.round(recommendedPrice)} pour capturer le marché.`
        });
      }
    }
    
    return opportunities;
  }

  // Optimisation du budget publicitaire
  public async optimizeAdBudget(currentBudget: number = 500): Promise<AdOptimization[]> {
    const optimizations: AdOptimization[] = [];
    
    // Analyser les campagnes concurrentes
    const competitorAds = this.getAllCompetitorAds();
    
    // Facebook Ads - Focus sur les entrepreneurs internationaux
    const facebookOptimization: AdOptimization = {
      platform: 'facebook',
      currentBudget: currentBudget * 0.6, // 60% du budget
      recommendedBudget: currentBudget * 0.7, // Augmenter à 70%
      targetAudience: 'Entrepreneurs internationaux, 25-45 ans, intérêt business formation',
      message: 'Formez votre LLC aux USA en 24h - Prix compétitifs garantis',
      expectedROI: 3.2, // 320% ROI estimé
      reasoning: 'Concurrents ciblent principalement le marché US. Opportunité sur le marché international.'
    };
    
    // Google Ads - Mots-clés concurrentiels
    const googleOptimization: AdOptimization = {
      platform: 'google',
      currentBudget: currentBudget * 0.3,
      recommendedBudget: currentBudget * 0.25,
      targetAudience: 'Recherches "LLC formation", "Delaware LLC", "Wyoming LLC"',
      message: 'Formation LLC rapide et économique - Comparez nos prix',
      expectedROI: 2.8,
      reasoning: 'Concurrence forte sur Google. Focus sur la différenciation prix.'
    };
    
    // LinkedIn Ads - B2B
    const linkedinOptimization: AdOptimization = {
      platform: 'linkedin',
      currentBudget: currentBudget * 0.1,
      recommendedBudget: currentBudget * 0.05,
      targetAudience: 'Professionnels, consultants, avocats',
      message: 'Solutions LLC pour vos clients internationaux',
      expectedROI: 4.1,
      reasoning: 'Peu de concurrence sur LinkedIn. ROI élevé mais volume limité.'
    };
    
    optimizations.push(facebookOptimization, googleOptimization, linkedinOptimization);
    
    return optimizations;
  }

  // Détection de nouvelles opportunités
  public async detectMarketOpportunities(): Promise<CompetitiveInsight[]> {
    const opportunities: CompetitiveInsight[] = [];
    
    // Analyser les services manquants
    const allServices = this.getAllCompetitorServices();
    const ourServices = ['LLC Formation', 'EIN', 'Operating Agreement', 'Registered Agent'];
    
    const missingServices = allServices.filter(service => 
      !ourServices.includes(service.name) && service.included
    );
    
    // Recommandations de nouveaux services
    for (const service of missingServices.slice(0, 3)) {
      opportunities.push({
        type: 'opportunity',
        severity: 'medium',
        description: `Service manquant: ${service.name}`,
        impact: `Ajouter ce service pourrait augmenter nos ventes de 15-20%`,
        recommendation: `Développer et proposer ${service.name} à un prix compétitif`,
        estimatedValue: service.price * 50 // 50 ventes estimées
      });
    }
    
    // Opportunités de prix
    const pricingOpportunities = await this.calculatePricingOpportunities();
    for (const opp of pricingOpportunities.slice(0, 3)) {
      if (opp.potentialProfit > 1000) {
        opportunities.push({
          type: 'opportunity',
          severity: 'high',
          description: `Opportunité de prix: ${opp.state}`,
          impact: `Profit potentiel: $${opp.potentialProfit}`,
          recommendation: `Ajuster le prix à $${opp.recommendedPrice} pour ${opp.state}`,
          estimatedValue: opp.potentialProfit
        });
      }
    }
    
    return opportunities;
  }

  // Alertes de menaces concurrentielles
  public async detectCompetitiveThreats(): Promise<CompetitiveInsight[]> {
    const threats: CompetitiveInsight[] = [];
    
    // Détecter les baisses de prix agressives
    for (const competitor of this.competitors) {
      const recentPriceChanges = this.getRecentPriceChanges(competitor.id);
      
      for (const change of recentPriceChanges) {
        if (change.priceReduction > 20) { // Baisse de plus de 20%
          threats.push({
            type: 'threat',
            severity: 'high',
            description: `${competitor.name} a baissé ses prix de ${change.priceReduction}%`,
            impact: 'Risque de perte de parts de marché',
            recommendation: 'Analyser notre positionnement et ajuster si nécessaire',
            estimatedValue: -change.priceReduction * 100 // Perte estimée
          });
        }
      }
    }
    
    // Détecter les nouvelles campagnes publicitaires
    const newAdCampaigns = this.getNewAdCampaigns();
    for (const campaign of newAdCampaigns) {
      threats.push({
        type: 'threat',
        severity: 'medium',
        description: `Nouvelle campagne ${campaign.platform} de ${campaign.competitor}`,
        impact: 'Augmentation de la concurrence publicitaire',
        recommendation: 'Surveiller l\'impact sur nos performances',
        estimatedValue: -campaign.estimatedBudget * 0.1
      });
    }
    
    return threats;
  }

  // Génération de rapport complet
  public async generateCompetitiveReport(): Promise<{
    summary: string;
    opportunities: CompetitiveInsight[];
    threats: CompetitiveInsight[];
    pricingRecommendations: PricingOpportunity[];
    adOptimizations: AdOptimization[];
    nextActions: string[];
  }> {
    const [opportunities, threats, pricingOpps, adOpts] = await Promise.all([
      this.detectMarketOpportunities(),
      this.detectCompetitiveThreats(),
      this.calculatePricingOpportunities(),
      this.optimizeAdBudget()
    ]);
    
    const totalOpportunityValue = opportunities.reduce((sum, opp) => sum + opp.estimatedValue, 0);
    const totalThreatValue = threats.reduce((sum, threat) => sum + threat.estimatedValue, 0);
    
    const summary = `
      📊 Rapport Concurrentiel Mivion - ${new Date().toLocaleDateString()}
      
      💰 Opportunités détectées: $${totalOpportunityValue.toLocaleString()}
      ⚠️ Menaces identifiées: $${Math.abs(totalThreatValue).toLocaleString()}
      📈 Net impact: $${(totalOpportunityValue + totalThreatValue).toLocaleString()}
      
      🎯 Actions prioritaires:
      ${opportunities.slice(0, 3).map(opp => `- ${opp.recommendation}`).join('\n')}
    `;
    
    const nextActions = [
      'Implémenter les ajustements de prix recommandés',
      'Optimiser le budget publicitaire selon les recommandations',
      'Développer les nouveaux services identifiés',
      'Surveiller les menaces concurrentielles',
      'Mettre à jour l\'analyse dans 24h'
    ];
    
    return {
      summary,
      opportunities,
      threats,
      pricingRecommendations: pricingOpps,
      adOptimizations: adOpts,
      nextActions
    };
  }

  // Méthodes utilitaires
  private getCompetitorPricesForState(state: string): number[] {
    return this.competitors
      .flatMap(c => c.pricing)
      .filter(p => p.state === state)
      .map(p => p.totalCost);
  }

  private getOurPriceForState(state: string): number {
    // Logique de prix basée sur l'algorithme existant
    const statePrices: Record<string, number> = {
      'Delaware': 999,
      'Wyoming': 759,
      'Nevada': 1049,
      'California': 1519,
      'Texas': 699
    };
    return statePrices[state] || 699;
  }

  private getAllCompetitorServices(): CompetitorService[] {
    return this.competitors.flatMap(c => c.services);
  }

  private getAllCompetitorAds(): CompetitorAd[] {
    return this.competitors.flatMap(c => c.ads);
  }

  private getRecentPriceChanges(competitorId: string): any[] {
    // Logique pour détecter les changements récents de prix
    return [];
  }

  private getNewAdCampaigns(): any[] {
    // Logique pour détecter les nouvelles campagnes
    return [];
  }

  private async saveInsights(insights: CompetitiveInsight[]) {
    try {
    for (const insight of insights) {
        await prisma.competitiveInsight.create({
        data: {
          type: insight.type,
          severity: insight.severity,
          description: insight.description,
          impact: insight.impact,
          recommendation: insight.recommendation,
            estimatedValue: insight.estimatedValue
        }
      });
      }
    } catch (error) {
      console.error('Erreur sauvegarde insights:', error);
    }
  }
}

// Export de l'instance singleton
export const mivion = new MivionCompetitiveIntelligence();

// Fonctions utilitaires pour l'API
export async function getCompetitiveAnalysis() {
  return await mivion.generateCompetitiveReport();
}

export async function getPricingOpportunities() {
  return await mivion.calculatePricingOpportunities();
}

export async function getAdOptimizations(budget: number = 500) {
  return await mivion.optimizeAdBudget(budget);
}

export async function getMarketOpportunities() {
  return await mivion.detectMarketOpportunities();
}

export async function getCompetitiveThreats() {
  return await mivion.detectCompetitiveThreats();
} 