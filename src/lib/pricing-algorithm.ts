// États populaires avec leurs facteurs de prix
export const stateFactors = {
  'Delaware': 1.0,    // État de référence
  'Wyoming': 0.9,     // Moins cher
  'Nevada': 1.1,      // Plus cher
  'Florida': 1.0,     // Standard
  'Texas': 0.95,      // Légèrement moins cher
  'California': 1.2,  // Plus cher
  'New York': 1.15,   // Plus cher
  'Arizona': 0.95,    // Légèrement moins cher
  'Colorado': 1.05,   // Légèrement plus cher
  'Utah': 0.9         // Moins cher
}

// Tiers de service avec prix de base
export const pricingTiers = {
  starter: {
    name: 'Starter',
    basePrice: 497,
    description: 'Pour entrepreneurs débutants, test de marché',
    features: [
      'Formation LLC (tous États)',
      'Agent agréé (1 an)',
      'EIN gratuit',
      'Déclaration IRS 5472',
      'Portail client basique',
      'Support email'
    ]
  },
  growth: {
    name: 'Growth',
    basePrice: 997,
    description: 'Pour entrepreneurs en croissance',
    features: [
      'Tout du Starter',
      'Compte bancaire business (Stripe Atlas)',
      'Déclaration fiscale complète',
      'Gestion des rapports annuels',
      'Support prioritaire',
      'Dashboard avancé',
      'Notifications automatiques'
    ]
  },
  scale: {
    name: 'Scale',
    basePrice: 1997,
    description: 'Pour entrepreneurs établis',
    features: [
      'Tout du Growth',
      'Services comptables complets',
      'Optimisation fiscale',
      'Support dédié',
      'API d\'intégration',
      'Formation équipe',
      'Conseil stratégique'
    ]
  }
}

// Modules complémentaires
export const addonModules = {
  'banking-pro': {
    name: 'Banking Pro',
    price: 297,
    description: 'Compte bancaire premium + cartes'
  },
  'tax-optimization': {
    name: 'Tax Optimization',
    price: 497,
    description: 'Optimisation fiscale avancée'
  },
  'compliance-plus': {
    name: 'Compliance Plus',
    price: 197,
    description: 'Surveillance réglementaire'
  },
  'growth-tools': {
    name: 'Growth Tools',
    price: 397,
    description: 'Outils marketing + analytics'
  },
  'legal-shield': {
    name: 'Legal Shield',
    price: 597,
    description: 'Protection juridique'
  }
}

// Fonction de calcul du prix de base
export function calculateBasePrice(tier: keyof typeof pricingTiers, state: string): number {
  const tierData = pricingTiers[tier]
  const stateFactor = stateFactors[state as keyof typeof stateFactors] || 1.0
  
  return Math.round(tierData.basePrice * stateFactor)
}

// Fonction de calcul du prix des addons
export function calculateAddonPrice(selectedAddons: string[]): number {
  return selectedAddons.reduce((total, addonId) => {
    const addon = addonModules[addonId as keyof typeof addonModules]
    return total + (addon?.price || 0)
  }, 0)
}

// Fonction de calcul du prix total
export function calculateTotalPrice(
  tier: keyof typeof pricingTiers, 
  state: string, 
  selectedAddons: string[]
): number {
  const basePrice = calculateBasePrice(tier, state)
  const addonPrice = calculateAddonPrice(selectedAddons)
  
  return basePrice + addonPrice
}

// Fonction de calcul des réductions
export function calculateDiscount(totalPrice: number): { discount: number; percentage: number } {
  if (totalPrice >= 800) {
    return { discount: totalPrice * 0.20, percentage: 20 }
  } else if (totalPrice >= 600) {
    return { discount: totalPrice * 0.15, percentage: 15 }
  } else if (totalPrice >= 400) {
    return { discount: totalPrice * 0.10, percentage: 10 }
  }
  
  return { discount: 0, percentage: 0 }
}

// Fonction de calcul du prix final avec réductions
export function calculateFinalPrice(
  tier: keyof typeof pricingTiers, 
  state: string, 
  selectedAddons: string[]
): { basePrice: number; addonPrice: number; totalBeforeDiscount: number; discount: number; finalPrice: number } {
  const basePrice = calculateBasePrice(tier, state)
  const addonPrice = calculateAddonPrice(selectedAddons)
  const totalBeforeDiscount = basePrice + addonPrice
  const { discount } = calculateDiscount(totalBeforeDiscount)
  const finalPrice = totalBeforeDiscount - discount
  
  return {
    basePrice,
    addonPrice,
    totalBeforeDiscount,
    discount,
    finalPrice: Math.round(finalPrice)
  }
} 