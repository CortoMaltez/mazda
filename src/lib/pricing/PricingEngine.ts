export interface PricingBreakdown {
  total: number;
  breakdown: {
    stateFees: number;
    agentFee: number;
    taxFiling: number;
    prosperalinkFee: number;
  };
  savings: {
    vsLegalZoom: number;
    vsRocketLawyer: number;
    vsIncfile: number;
  };
  transparency: {
    stateFeesBreakdown: Array<{
      fee: string;
      amount: number;
      description: string;
    }>;
    ourCosts: Array<{
      item: string;
      cost: number;
      description: string;
    }>;
  };
}

export interface StateFees {
  annual: number;
  formation: number;
  breakdown: Array<{
    fee: string;
    amount: number;
    description: string;
  }>;
}

export class TransparentPricingEngine {
  // Constantes de coûts
  private readonly FIXED_PROFIT = 500; // Marge fixe ProsperaLink
  private readonly AGENT_COST = 49; // Coût agent agréé annuel
  private readonly TAX_FILING_COST = 150; // Coût préparation fiscale
  private readonly OPERATING_AGREEMENT_COST = 75; // Coût rédaction Operating Agreement
  private readonly EIN_PROCESSING_COST = 25; // Coût obtention EIN
  private readonly DOCUMENT_GENERATION_COST = 50; // Coût génération documents
  private readonly SUPPORT_COST = 100; // Coût support client

  // Coûts des concurrents (estimés)
  private readonly COMPETITOR_PRICES = {
    legalZoom: 299,
    rocketLawyer: 399,
    incfile: 199
  };

  // Frais d'état par état
  private readonly STATE_FEES: Record<string, StateFees> = {
    'Delaware': {
      annual: 300,
      formation: 90,
      breakdown: [
        { fee: 'Frais de formation', amount: 90, description: 'Frais d\'enregistrement auprès du Secretary of State' },
        { fee: 'Frais annuels', amount: 300, description: 'Frais annuels obligatoires' }
      ]
    },
    'Wyoming': {
      annual: 60,
      formation: 100,
      breakdown: [
        { fee: 'Frais de formation', amount: 100, description: 'Frais d\'enregistrement auprès du Secretary of State' },
        { fee: 'Frais annuels', amount: 60, description: 'Frais annuels obligatoires' }
      ]
    },
    'Nevada': {
      annual: 350,
      formation: 75,
      breakdown: [
        { fee: 'Frais de formation', amount: 75, description: 'Frais d\'enregistrement auprès du Secretary of State' },
        { fee: 'Frais annuels', amount: 350, description: 'Frais annuels obligatoires' }
      ]
    },
    'Florida': {
      annual: 138.75,
      formation: 125,
      breakdown: [
        { fee: 'Frais de formation', amount: 125, description: 'Frais d\'enregistrement auprès du Secretary of State' },
        { fee: 'Frais annuels', amount: 138.75, description: 'Frais annuels obligatoires' }
      ]
    },
    'Texas': {
      annual: 0,
      formation: 300,
      breakdown: [
        { fee: 'Frais de formation', amount: 300, description: 'Frais d\'enregistrement auprès du Secretary of State' },
        { fee: 'Frais annuels', amount: 0, description: 'Aucun frais annuel obligatoire' }
      ]
    }
  };

  /**
   * Calcule le prix total avec décomposition transparente
   */
  calculatePrice(state: string): PricingBreakdown {
    const stateFees = this.getStateFees(state);
    const ourTotalCosts = this.calculateOurCosts();
    const totalPrice = stateFees.annual + ourTotalCosts + this.FIXED_PROFIT;

    return {
      total: totalPrice,
      breakdown: {
        stateFees: stateFees.annual,
        agentFee: this.AGENT_COST,
        taxFiling: this.TAX_FILING_COST,
        prosperalinkFee: this.FIXED_PROFIT
      },
      savings: this.calculateSavingsVsCompetitors(totalPrice, state),
      transparency: {
        stateFeesBreakdown: stateFees.breakdown,
        ourCosts: [
          { item: 'Agent agréé (1 an)', cost: this.AGENT_COST, description: 'Service d\'agent agréé pour recevoir les documents officiels' },
          { item: 'Préparation fiscale', cost: this.TAX_FILING_COST, description: 'Préparation des déclarations fiscales initiales' },
          { item: 'Operating Agreement', cost: this.OPERATING_AGREEMENT_COST, description: 'Rédaction de l\'accord d\'exploitation personnalisé' },
          { item: 'Obtention EIN', cost: this.EIN_PROCESSING_COST, description: 'Demande et obtention du numéro d\'identification fiscale' },
          { item: 'Génération documents', cost: this.DOCUMENT_GENERATION_COST, description: 'Création de tous les documents légaux nécessaires' },
          { item: 'Support client', cost: this.SUPPORT_COST, description: 'Support client premium pendant 1 an' }
        ]
      }
    };
  }

  /**
   * Récupère les frais d'état pour un état donné
   */
  private getStateFees(state: string): StateFees {
    const normalizedState = this.normalizeStateName(state);
    const fees = this.STATE_FEES[normalizedState];
    
    if (!fees) {
      // Valeurs par défaut si l'état n'est pas trouvé
      return {
        annual: 200,
        formation: 100,
        breakdown: [
          { fee: 'Frais de formation', amount: 100, description: 'Frais d\'enregistrement estimés' },
          { fee: 'Frais annuels', amount: 200, description: 'Frais annuels estimés' }
        ]
      };
    }
    
    return fees;
  }

  /**
   * Normalise le nom de l'état
   */
  private normalizeStateName(state: string): string {
    const stateMap: Record<string, string> = {
      'delaware': 'Delaware',
      'wyoming': 'Wyoming',
      'nevada': 'Nevada',
      'florida': 'Florida',
      'texas': 'Texas',
      'de': 'Delaware',
      'wy': 'Wyoming',
      'nv': 'Nevada',
      'fl': 'Florida',
      'tx': 'Texas'
    };
    
    return stateMap[state.toLowerCase()] || state;
  }

  /**
   * Calcule nos coûts totaux
   */
  private calculateOurCosts(): number {
    return this.AGENT_COST + 
           this.TAX_FILING_COST + 
           this.OPERATING_AGREEMENT_COST + 
           this.EIN_PROCESSING_COST + 
           this.DOCUMENT_GENERATION_COST + 
           this.SUPPORT_COST;
  }

  /**
   * Calcule les économies par rapport aux concurrents
   */
  private calculateSavingsVsCompetitors(ourPrice: number, state: string): {
    vsLegalZoom: number;
    vsRocketLawyer: number;
    vsIncfile: number;
  } {
    const stateFees = this.getStateFees(state);
    const competitorTotal = this.COMPETITOR_PRICES.legalZoom + stateFees.annual;
    
    return {
      vsLegalZoom: Math.max(0, competitorTotal - ourPrice),
      vsRocketLawyer: Math.max(0, (this.COMPETITOR_PRICES.rocketLawyer + stateFees.annual) - ourPrice),
      vsIncfile: Math.max(0, (this.COMPETITOR_PRICES.incfile + stateFees.annual) - ourPrice)
    };
  }

  /**
   * Génère une explication détaillée du prix
   */
  generatePriceExplanation(state: string): string {
    const pricing = this.calculatePrice(state);
    const stateFees = this.getStateFees(state);
    
    return `
## Décomposition Transparente du Prix - ${state}

### 💰 Prix Total: $${pricing.total}

### 📋 Décomposition Détaillée:

**Frais d'État (${state}): $${stateFees.annual}**
${stateFees.breakdown.map(fee => `- ${fee.fee}: $${fee.amount} - ${fee.description}`).join('\n')}

**Nos Services: $${pricing.breakdown.agentFee + pricing.breakdown.taxFiling}**
- Agent agréé (1 an): $${this.AGENT_COST}
- Préparation fiscale: $${this.TAX_FILING_COST}
- Operating Agreement: $${this.OPERATING_AGREEMENT_COST}
- Obtention EIN: $${this.EIN_PROCESSING_COST}
- Génération documents: $${this.DOCUMENT_GENERATION_COST}
- Support client premium: $${this.SUPPORT_COST}

**Marge ProsperaLink: $${this.FIXED_PROFIT}**
*Cette marge couvre nos coûts opérationnels et nous permet de maintenir un service de qualité.*

### 💡 Économies Réalisées:
- vs LegalZoom: $${pricing.savings.vsLegalZoom}
- vs RocketLawyer: $${pricing.savings.vsRocketLawyer}
- vs Incfile: $${pricing.savings.vsIncfile}

### ✅ Ce qui est inclus:
- Formation LLC complète
- Agent agréé (1 an)
- EIN (numéro d'identification fiscale)
- Operating Agreement personnalisé
- Support client premium
- Conformité automatique
- Support IA 24/7
    `.trim();
  }

  /**
   * Compare les prix entre différents états
   */
  compareStatePrices(states: string[]): Array<{
    state: string;
    totalPrice: number;
    annualFees: number;
    formationFees: number;
    savings: number;
  }> {
    return states.map(state => {
      const pricing = this.calculatePrice(state);
      const stateFees = this.getStateFees(state);
      const avgCompetitorPrice = (this.COMPETITOR_PRICES.legalZoom + 
                                 this.COMPETITOR_PRICES.rocketLawyer + 
                                 this.COMPETITOR_PRICES.incfile) / 3;
      
      return {
        state,
        totalPrice: pricing.total,
        annualFees: stateFees.annual,
        formationFees: stateFees.formation,
        savings: Math.max(0, (avgCompetitorPrice + stateFees.annual) - pricing.total)
      };
    }).sort((a, b) => a.totalPrice - b.totalPrice);
  }

  /**
   * Calcule le ROI pour un entrepreneur
   */
  calculateROI(initialInvestment: number, expectedRevenue: number, timeframe: number = 1): {
    roi: number;
    breakeven: number;
    profitAfterFees: number;
  } {
    const totalFees = initialInvestment;
    const netRevenue = expectedRevenue - totalFees;
    const roi = (netRevenue / totalFees) * 100;
    const breakeven = totalFees / expectedRevenue;
    
    return {
      roi: Math.round(roi * 100) / 100,
      breakeven: Math.round(breakeven * 12 * 100) / 100, // en mois
      profitAfterFees: netRevenue
    };
  }
} 