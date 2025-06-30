// Pricing Algorithm for ProsperaLink 360 Subscription
// Based on the business plan: Annual Price = Annual Recurring Costs + $500 Target Profit

export interface StatePricing {
  state: string;
  annualPrice: number;
  stateAnnualReportFee: number;
  registeredAgentFee: number;
  irsFilingCost: number;
  totalRecurringCosts: number;
  targetProfit: number;
}

export const STATE_PRICING_DATA: StatePricing[] = [
  { state: "Alabama", annualPrice: 749, stateAnnualReportFee: 50, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 249, targetProfit: 500 },
  { state: "Alaska", annualPrice: 749, stateAnnualReportFee: 50, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 249, targetProfit: 500 },
  { state: "Arizona", annualPrice: 699, stateAnnualReportFee: 0, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 199, targetProfit: 500 },
  { state: "Arkansas", annualPrice: 849, stateAnnualReportFee: 150, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 349, targetProfit: 500 },
  { state: "California", annualPrice: 1519, stateAnnualReportFee: 800, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 999, targetProfit: 520 },
  { state: "Colorado", annualPrice: 709, stateAnnualReportFee: 10, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 209, targetProfit: 500 },
  { state: "Connecticut", annualPrice: 779, stateAnnualReportFee: 80, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 279, targetProfit: 500 },
  { state: "Delaware", annualPrice: 999, stateAnnualReportFee: 300, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 499, targetProfit: 500 },
  { state: "Florida", annualPrice: 838, stateAnnualReportFee: 139, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 338, targetProfit: 500 },
  { state: "Georgia", annualPrice: 749, stateAnnualReportFee: 50, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 249, targetProfit: 500 },
  { state: "Hawaii", annualPrice: 714, stateAnnualReportFee: 15, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 214, targetProfit: 500 },
  { state: "Idaho", annualPrice: 699, stateAnnualReportFee: 0, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 199, targetProfit: 500 },
  { state: "Illinois", annualPrice: 774, stateAnnualReportFee: 75, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 274, targetProfit: 500 },
  { state: "Indiana", annualPrice: 714, stateAnnualReportFee: 15, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 214, targetProfit: 500 },
  { state: "Iowa", annualPrice: 714, stateAnnualReportFee: 15, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 214, targetProfit: 500 },
  { state: "Kansas", annualPrice: 749, stateAnnualReportFee: 50, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 249, targetProfit: 500 },
  { state: "Kentucky", annualPrice: 714, stateAnnualReportFee: 15, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 214, targetProfit: 500 },
  { state: "Louisiana", annualPrice: 734, stateAnnualReportFee: 35, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 234, targetProfit: 500 },
  { state: "Maine", annualPrice: 784, stateAnnualReportFee: 85, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 284, targetProfit: 500 },
  { state: "Maryland", annualPrice: 999, stateAnnualReportFee: 300, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 499, targetProfit: 500 },
  { state: "Massachusetts", annualPrice: 1199, stateAnnualReportFee: 500, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 699, targetProfit: 500 },
  { state: "Michigan", annualPrice: 724, stateAnnualReportFee: 25, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 224, targetProfit: 500 },
  { state: "Minnesota", annualPrice: 699, stateAnnualReportFee: 0, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 199, targetProfit: 500 },
  { state: "Mississippi", annualPrice: 699, stateAnnualReportFee: 0, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 199, targetProfit: 500 },
  { state: "Missouri", annualPrice: 699, stateAnnualReportFee: 0, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 199, targetProfit: 500 },
  { state: "Montana", annualPrice: 719, stateAnnualReportFee: 20, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 219, targetProfit: 500 },
  { state: "Nebraska", annualPrice: 706, stateAnnualReportFee: 7, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 206, targetProfit: 500 },
  { state: "Nevada", annualPrice: 1049, stateAnnualReportFee: 350, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 549, targetProfit: 500 },
  { state: "New Hampshire", annualPrice: 799, stateAnnualReportFee: 100, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 299, targetProfit: 500 },
  { state: "New Jersey", annualPrice: 774, stateAnnualReportFee: 75, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 274, targetProfit: 500 },
  { state: "New Mexico", annualPrice: 699, stateAnnualReportFee: 0, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 199, targetProfit: 500 },
  { state: "New York", annualPrice: 704, stateAnnualReportFee: 4, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 203, targetProfit: 501 },
  { state: "North Carolina", annualPrice: 899, stateAnnualReportFee: 200, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 399, targetProfit: 500 },
  { state: "North Dakota", annualPrice: 749, stateAnnualReportFee: 50, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 249, targetProfit: 500 },
  { state: "Ohio", annualPrice: 699, stateAnnualReportFee: 0, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 199, targetProfit: 500 },
  { state: "Oklahoma", annualPrice: 724, stateAnnualReportFee: 25, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 224, targetProfit: 500 },
  { state: "Oregon", annualPrice: 799, stateAnnualReportFee: 100, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 299, targetProfit: 500 },
  { state: "Pennsylvania", annualPrice: 706, stateAnnualReportFee: 7, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 206, targetProfit: 500 },
  { state: "Rhode Island", annualPrice: 749, stateAnnualReportFee: 50, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 249, targetProfit: 500 },
  { state: "South Carolina", annualPrice: 699, stateAnnualReportFee: 0, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 199, targetProfit: 500 },
  { state: "South Dakota", annualPrice: 749, stateAnnualReportFee: 50, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 249, targetProfit: 500 },
  { state: "Tennessee", annualPrice: 999, stateAnnualReportFee: 300, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 499, targetProfit: 500 },
  { state: "Texas", annualPrice: 699, stateAnnualReportFee: 0, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 199, targetProfit: 500 },
  { state: "Utah", annualPrice: 717, stateAnnualReportFee: 18, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 217, targetProfit: 500 },
  { state: "Vermont", annualPrice: 744, stateAnnualReportFee: 45, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 244, targetProfit: 500 },
  { state: "Virginia", annualPrice: 749, stateAnnualReportFee: 50, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 249, targetProfit: 500 },
  { state: "Washington", annualPrice: 759, stateAnnualReportFee: 60, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 259, targetProfit: 500 },
  { state: "West Virginia", annualPrice: 724, stateAnnualReportFee: 25, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 224, targetProfit: 500 },
  { state: "Wisconsin", annualPrice: 724, stateAnnualReportFee: 25, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 224, targetProfit: 500 },
  { state: "Wyoming", annualPrice: 759, stateAnnualReportFee: 60, registeredAgentFee: 49, irsFilingCost: 150, totalRecurringCosts: 259, targetProfit: 500 },
];

// Pricing tiers for marketing simplification
export const PRICING_TIERS = {
  ESSENTIAL: {
    name: "Essential",
    priceRange: "$699 - $799",
    states: STATE_PRICING_DATA.filter(p => p.annualPrice >= 699 && p.annualPrice <= 799),
    features: [
      "LLC Formation",
      "EIN Acquisition",
      "Operating Agreement",
      "Registered Agent Service",
      "Annual Report Filing",
      "BOI Report Filing",
      "Form 5472 & 1120 Filing",
      "48-hour Support Response"
    ]
  },
  GROWTH: {
    name: "Growth",
    priceRange: "$800 - $999",
    states: STATE_PRICING_DATA.filter(p => p.annualPrice >= 800 && p.annualPrice <= 999),
    features: [
      "Everything in Essential",
      "Premium Business Address",
      "Mail Scanning Service",
      "Bank Account Assistance",
      "Priority Support"
    ]
  },
  PREMIUM: {
    name: "Premium",
    priceRange: "$1000+",
    states: STATE_PRICING_DATA.filter(p => p.annualPrice >= 1000),
    features: [
      "Everything in Growth",
      "Dedicated Account Manager",
      "ITIN Application Assistance",
      "Premium Bank Assistance",
      "Trademark Filing Support",
      "24-hour Support Response"
    ]
  }
};

// Functions
export function getStatePricing(stateName: string): StatePricing | null {
  return STATE_PRICING_DATA.find(p => 
    p.state.toLowerCase() === stateName.toLowerCase()
  ) || null;
}

export function calculateSubscriptionPrice(stateName: string): number {
  const pricing = getStatePricing(stateName);
  return pricing ? pricing.annualPrice : 699; // Default to lowest price
}

export function getPricingTier(stateName: string) {
  const pricing = getStatePricing(stateName);
  if (!pricing) return PRICING_TIERS.ESSENTIAL;
  
  if (pricing.annualPrice >= 1000) return PRICING_TIERS.PREMIUM;
  if (pricing.annualPrice >= 800) return PRICING_TIERS.GROWTH;
  return PRICING_TIERS.ESSENTIAL;
}

export function getAllStates(): string[] {
  return STATE_PRICING_DATA.map(p => p.state).sort();
}

export function getStatesByTier(tier: keyof typeof PRICING_TIERS): string[] {
  return PRICING_TIERS[tier].states.map(p => p.state).sort();
} 