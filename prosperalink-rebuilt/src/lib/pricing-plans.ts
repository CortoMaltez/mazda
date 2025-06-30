export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  currency: string;
  interval: 'one-time' | 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  profit: number;
  margin: number;
  target: 'freemium' | 'starter' | 'growth' | 'scale' | 'enterprise';
  stripePriceId?: string;
  description: string;
  estimatedTime: string;
  includes: string[];
  upsells: string[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'freemium',
    name: 'Plan Freemium',
    price: 0,
    currency: 'USD',
    interval: 'one-time',
    features: [
      'Formation LLC de base',
      'EIN inclus',
      'Support IA limité (5 questions/mois)',
      'Documents essentiels',
      'Accès au portail client'
    ],
    profit: 0,
    margin: 0,
    target: 'freemium',
    description: 'Formation LLC de base pour tester nos services',
    estimatedTime: '24h',
    includes: ['EIN', 'Documents de base', 'Support limité'],
    upsells: ['starter', 'growth']
  },
  {
    id: 'starter',
    name: 'Plan Starter IA',
    price: 297,
    originalPrice: 397,
    currency: 'USD',
    interval: 'one-time',
    features: [
      'Formation LLC en 12h',
      'EIN automatique',
      'Support IA basique 24/7',
      'Documents générés IA',
      'Portail client IA',
      'Conformité de base',
      'Email support'
    ],
    popular: true,
    profit: 252,
    margin: 85,
    target: 'starter',
    description: 'Formation LLC complète avec support IA',
    estimatedTime: '12h',
    includes: ['EIN', 'Documents complets', 'Support IA 24/7', 'Portail client'],
    upsells: ['banking', 'accounting', 'compliance']
  },
  {
    id: 'growth',
    name: 'Plan Growth IA',
    price: 597,
    originalPrice: 797,
    currency: 'USD',
    interval: 'one-time',
    features: [
      'Tout du Starter IA',
      'Compte bancaire inclus',
      'Services comptables 6 mois',
      'Conformité prédictive IA',
      'Marketplace d\'accès',
      'Support prioritaire',
      'Analyse fiscale IA'
    ],
    profit: 477,
    margin: 80,
    target: 'growth',
    description: 'Formation LLC + services bancaires et comptables',
    estimatedTime: '12h + 48h',
    includes: ['EIN', 'Compte bancaire', 'Comptabilité 6 mois', 'Conformité IA'],
    upsells: ['scale', 'tax-optimization', 'growth-strategy']
  },
  {
    id: 'scale',
    name: 'Plan Scale IA',
    price: 997,
    originalPrice: 1297,
    currency: 'USD',
    interval: 'one-time',
    features: [
      'Tout du Growth IA',
      'Services comptables 12 mois',
      'Support prioritaire IA 24/7',
      'Gestion de risque IA',
      'Stratégie croissance IA',
      'API IA personnalisée',
      'Consultant dédié 1 mois'
    ],
    profit: 748,
    margin: 75,
    target: 'scale',
    description: 'Solution complète pour entreprises en croissance',
    estimatedTime: '12h + 72h',
    includes: ['EIN', 'Compte bancaire', 'Comptabilité 12 mois', 'Consultant'],
    upsells: ['enterprise', 'api-custom', 'legal-services']
  },
  {
    id: 'enterprise',
    name: 'Plan Enterprise IA',
    price: 1997,
    originalPrice: 2997,
    currency: 'USD',
    interval: 'one-time',
    features: [
      'Tout du Scale IA',
      'Services sur mesure',
      'IA dédiée personnalisée',
      'Consultant dédié 12 mois',
      'Services juridiques inclus',
      'Support VIP 24/7',
      'Audit complet IA'
    ],
    profit: 1398,
    margin: 70,
    target: 'enterprise',
    description: 'Solution enterprise avec IA dédiée',
    estimatedTime: '12h + 120h',
    includes: ['EIN', 'Compte bancaire', 'Comptabilité 12 mois', 'Consultant 12 mois', 'Services juridiques'],
    upsells: ['custom-development', 'white-label', 'partnership']
  }
];

export const UPSELL_SERVICES = [
  {
    id: 'banking',
    name: 'Compte Bancaire Premium',
    price: 199,
    description: 'Compte bancaire business avec cartes de crédit',
    profit: 179,
    margin: 90
  },
  {
    id: 'accounting',
    name: 'Services Comptables IA',
    price: 299,
    interval: 'yearly',
    description: 'Comptabilité automatisée avec IA',
    profit: 254,
    margin: 85
  },
  {
    id: 'compliance',
    name: 'Conformité Prédictive',
    price: 149,
    interval: 'yearly',
    description: 'Surveillance continue de la conformité',
    profit: 119,
    margin: 80
  },
  {
    id: 'tax-optimization',
    name: 'Optimisation Fiscale IA',
    price: 199,
    interval: 'monthly',
    description: 'Optimisation fiscale continue',
    profit: 159,
    margin: 80
  },
  {
    id: 'growth-strategy',
    name: 'Stratégie Croissance IA',
    price: 299,
    interval: 'monthly',
    description: 'Plan de croissance personnalisé',
    profit: 224,
    margin: 75
  },
  {
    id: 'legal-services',
    name: 'Services Juridiques',
    price: 399,
    interval: 'monthly',
    description: 'Support juridique complet',
    profit: 279,
    margin: 70
  }
];

export function getPlanById(id: string): PricingPlan | undefined {
  return PRICING_PLANS.find(plan => plan.id === id);
}

export function getUpsellById(id: string) {
  return UPSELL_SERVICES.find(upsell => upsell.id === id);
}

export function calculateTotalProfit(planId: string, upsells: string[] = []): number {
  const plan = getPlanById(planId);
  if (!plan) return 0;

  let totalProfit = plan.profit;
  
  for (const upsellId of upsells) {
    const upsell = getUpsellById(upsellId);
    if (upsell) {
      totalProfit += upsell.profit;
    }
  }
  
  return totalProfit;
}

export function getRecommendedPlan(clientType: 'individual' | 'small-business' | 'enterprise'): PricingPlan {
  switch (clientType) {
    case 'individual':
      return getPlanById('starter')!;
    case 'small-business':
      return getPlanById('growth')!;
    case 'enterprise':
      return getPlanById('enterprise')!;
    default:
      return getPlanById('starter')!;
  }
}

export function getUpsellRecommendations(planId: string): string[] {
  const plan = getPlanById(planId);
  return plan?.upsells || [];
} 