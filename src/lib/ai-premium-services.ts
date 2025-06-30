import { GoogleGenerativeAI } from '@google/generative-ai';
import { prisma } from './prisma';

// Configuration IA
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

// Fonction pour générer du texte avec Gemini
async function generateText(prompt: string, maxTokens: number = 4000): Promise<{ text: string; tokensUsed: number }> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Estimation des tokens utilisés
    const tokensUsed = Math.ceil(text.length / 4);
    
    return { text, tokensUsed };
  } catch (error) {
    console.error('Erreur génération texte:', error);
    throw new Error('Erreur lors de la génération de texte');
  }
}

export interface AIService {
  id: string;
  name: string;
  description: string;
  price: number;
  profit: number;
  margin: number;
  prompt: string;
  maxTokens: number;
  responseFormat: 'text' | 'json' | 'html';
}

export interface AIAnalysis {
  id: string;
  serviceId: string;
  userId: string;
  input: any;
  output: any;
  cost: number;
  tokensUsed: number;
  createdAt: Date;
  status: 'pending' | 'completed' | 'failed';
}

// Services IA Premium
export const AI_PREMIUM_SERVICES: AIService[] = [
  {
    id: 'tax_optimization',
    name: 'Optimisation Fiscale IA',
    description: 'Analyse complète de votre situation fiscale et recommandations d\'optimisation personnalisées',
    price: 199,
    profit: 159,
    margin: 80,
    prompt: `En tant qu'expert fiscal spécialisé dans l'optimisation pour les LLC américaines, analysez la situation suivante et fournissez des recommandations détaillées pour minimiser les impôts tout en restant conforme à la loi.

Situation du client:
- Type d'entreprise: {businessType}
- État: {state}
- Revenus estimés: {estimatedRevenue}
- Nombre d'employés: {employees}
- Activité: {businessDescription}

Fournissez:
1. Structure fiscale optimale
2. Déductions disponibles
3. Stratégies de report d'impôts
4. Économies fiscales potentielles
5. Risques à considérer
6. Plan d'action sur 12 mois`,
    maxTokens: 4000,
    responseFormat: 'html'
  },
  {
    id: 'growth_strategy',
    name: 'Stratégie de Croissance IA',
    description: 'Plan de croissance personnalisé avec projections financières et roadmap détaillée',
    price: 299,
    profit: 224,
    margin: 75,
    prompt: `En tant que consultant en stratégie d'entreprise spécialisé dans la croissance des LLC, développez un plan de croissance complet pour cette entreprise.

Informations de l'entreprise:
- Nom: {companyName}
- Secteur: {businessType}
- Marché: {state}
- Revenus actuels: {estimatedRevenue}
- Employés: {employees}
- Description: {businessDescription}

Créez un plan incluant:
1. Analyse du marché et concurrence
2. Opportunités de croissance identifiées
3. Stratégies de pénétration de marché
4. Projections financières sur 3 ans
5. Besoins en financement
6. Roadmap d'exécution trimestrielle
7. KPIs de suivi
8. Risques et mitigation`,
    maxTokens: 5000,
    responseFormat: 'html'
  },
  {
    id: 'compliance_audit',
    name: 'Audit de Conformité IA',
    description: 'Audit complet de conformité avec alertes prédictives et plan de correction',
    price: 149,
    profit: 119,
    margin: 80,
    prompt: `En tant qu'expert en conformité réglementaire pour les LLC américaines, effectuez un audit complet de conformité.

Entreprise à auditer:
- Nom: {companyName}
- État: {state}
- Type: {businessType}
- Activité: {businessDescription}
- Employés: {employees}

Audit à effectuer:
1. Conformité étatique (licences, permis)
2. Conformité fédérale (EIN, rapports)
3. Conformité fiscale (impôts, déclarations)
4. Conformité employeur (si applicable)
5. Conformité sectorielle spécifique
6. Échéances à venir (12 mois)
7. Risques de non-conformité
8. Plan de correction prioritaire
9. Système d'alertes recommandé`,
    maxTokens: 3500,
    responseFormat: 'html'
  },
  {
    id: 'financial_planning',
    name: 'Planification Financière IA',
    description: 'Plan financier complet avec projections, budgets et stratégies d\'investissement',
    price: 249,
    profit: 187,
    margin: 75,
    prompt: `En tant que planificateur financier spécialisé dans les entreprises LLC, créez un plan financier complet.

Données de l'entreprise:
- Nom: {companyName}
- Revenus: {estimatedRevenue}
- État: {state}
- Secteur: {businessType}
- Employés: {employees}

Plan financier à développer:
1. Analyse de la situation financière actuelle
2. Projections de revenus (3 ans)
3. Budget opérationnel détaillé
4. Plan de trésorerie
5. Stratégies de financement
6. Plan d'investissement
7. Gestion des risques financiers
8. Optimisation de la structure financière
9. Scénarios de stress test
10. Recommandations d'épargne et d'investissement`,
    maxTokens: 4500,
    responseFormat: 'html'
  },
  {
    id: 'market_analysis',
    name: 'Analyse de Marché IA',
    description: 'Analyse approfondie du marché avec opportunités et menaces identifiées',
    price: 179,
    profit: 134,
    margin: 75,
    prompt: `En tant qu'analyste de marché spécialisé dans les petites entreprises américaines, effectuez une analyse complète du marché.

Marché à analyser:
- Secteur: {businessType}
- Géographie: {state}
- Taille d'entreprise: {employees} employés
- Activité: {businessDescription}

Analyse requise:
1. Taille et croissance du marché
2. Segmentation de la clientèle
3. Analyse concurrentielle détaillée
4. Tendances du secteur
5. Opportunités de marché
6. Menaces et risques
7. Positionnement recommandé
8. Stratégies de différenciation
9. Projections de marché (3 ans)
10. Recommandations d'action`,
    maxTokens: 4000,
    responseFormat: 'html'
  },
  {
    id: 'legal_consultation',
    name: 'Consultation Juridique IA',
    description: 'Conseils juridiques spécialisés pour la protection et la croissance de votre LLC',
    price: 399,
    profit: 279,
    margin: 70,
    prompt: `En tant qu'avocat spécialisé en droit des affaires pour les LLC américaines, fournissez des conseils juridiques complets.

Situation juridique:
- Entreprise: {companyName}
- État: {state}
- Type: {businessType}
- Activité: {businessDescription}
- Employés: {employees}

Conseils juridiques requis:
1. Structure juridique optimale
2. Protection de la responsabilité
3. Contrats types recommandés
4. Propriété intellectuelle
5. Conformité réglementaire
6. Gestion des litiges
7. Planification successorale
8. Protection des actifs
9. Risques juridiques identifiés
10. Recommandations de couverture d'assurance
11. Plan d'action juridique prioritaire`,
    maxTokens: 5000,
    responseFormat: 'html'
  }
];

// Fonction pour exécuter un service IA
export async function executeAIService(
  serviceId: string,
  userId: string,
  inputData: any
): Promise<AIAnalysis> {
  let analysis: any = null;
  
  try {
    const service = AI_PREMIUM_SERVICES.find(s => s.id === serviceId);
    if (!service) {
      throw new Error('Service IA non trouvé');
    }

    // Créer l'analyse dans la base de données
    analysis = await prisma.AIAnalysis.create({
      data: {
        serviceId,
        userId,
        input: JSON.stringify(inputData),
        output: '',
        cost: 0,
        tokensUsed: 0,
        status: 'pending'
      }
    });

    // Préparer le prompt avec les données
    let prompt = service.prompt;
    for (const [key, value] of Object.entries(inputData)) {
      prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), String(value));
    }

    // Appeler l'IA Gemini
    const { text, tokensUsed } = await generateText(prompt, service.maxTokens);
    const cost = (tokensUsed / 1000) * 0.01; // $0.01 per 1K tokens

    // Mettre à jour l'analyse avec le résultat
    await prisma.AIAnalysis.update({
      where: { id: analysis.id },
      data: {
        output: JSON.stringify({ result: text }),
        cost: cost,
        tokensUsed: tokensUsed,
        status: 'completed'
      }
    });

    return {
      id: analysis.id,
      serviceId: analysis.serviceId,
      userId: analysis.userId,
      input: JSON.parse(analysis.input),
      output: { result: text },
      cost: cost,
      tokensUsed: tokensUsed,
      createdAt: analysis.createdAt,
      status: 'completed'
    };

  } catch (error) {
    console.error('Erreur exécution service IA:', error);
    
    if (analysis) {
    // Marquer l'analyse comme échouée
      await prisma.AIAnalysis.update({
        where: { id: analysis.id },
        data: {
          output: JSON.stringify({ error: error instanceof Error ? error.message : 'Erreur inconnue' }),
          status: 'failed'
        }
      });
    }
    
    throw error;
  }
}

// Fonction pour récupérer les analyses d'un utilisateur
export async function getUserAnalyses(userId: string): Promise<AIAnalysis[]> {
  try {
    const analyses = await prisma.AIAnalysis.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

    return analyses.map((analysis: any) => ({
      id: analysis.id,
      serviceId: analysis.serviceId,
      userId: analysis.userId,
    input: JSON.parse(analysis.input),
      output: JSON.parse(analysis.output || '{}'),
      cost: analysis.cost,
      tokensUsed: analysis.tokensUsed,
      createdAt: analysis.createdAt,
      status: analysis.status
  }));
  } catch (error) {
    console.error('Erreur récupération analyses:', error);
    return [];
  }
}

// Fonction pour calculer les statistiques IA
export async function getAIStats(userId: string) {
  try {
    const analyses = await prisma.AIAnalysis.findMany({
    where: { userId }
  });

    const totalCost = analyses.reduce((sum: number, a: any) => sum + a.cost, 0);
    const totalTokens = analyses.reduce((sum: number, a: any) => sum + a.tokensUsed, 0);
    const completedAnalyses = analyses.filter((a: any) => a.status === 'completed').length;
    const failedAnalyses = analyses.filter((a: any) => a.status === 'failed').length;

  return {
    totalAnalyses: analyses.length,
    completedAnalyses,
    failedAnalyses,
    totalCost,
    totalTokens,
    averageCost: analyses.length > 0 ? totalCost / analyses.length : 0
  };
  } catch (error) {
    console.error('Erreur calcul statistiques IA:', error);
    return {
      totalAnalyses: 0,
      completedAnalyses: 0,
      failedAnalyses: 0,
      totalCost: 0,
      totalTokens: 0,
      averageCost: 0
    };
  }
}

// Fonction pour recommander des services
export function recommendServices(businessData: any): AIService[] {
  const recommendations: AIService[] = [];

  // Recommandations basées sur le type d'entreprise
  if (businessData.businessType?.toLowerCase().includes('tech')) {
    recommendations.push(
      AI_PREMIUM_SERVICES.find(s => s.id === 'growth_strategy')!,
      AI_PREMIUM_SERVICES.find(s => s.id === 'market_analysis')!
    );
  }

  // Recommandations basées sur la taille
  if (businessData.employees > 10) {
    recommendations.push(
      AI_PREMIUM_SERVICES.find(s => s.id === 'compliance_audit')!,
      AI_PREMIUM_SERVICES.find(s => s.id === 'financial_planning')!
    );
  }

  // Recommandations basées sur les revenus
  if (businessData.estimatedRevenue > 100000) {
    recommendations.push(
      AI_PREMIUM_SERVICES.find(s => s.id === 'tax_optimization')!,
      AI_PREMIUM_SERVICES.find(s => s.id === 'legal_consultation')!
    );
  }

  // Toujours recommander l'optimisation fiscale
  if (!recommendations.find(s => s.id === 'tax_optimization')) {
    recommendations.push(AI_PREMIUM_SERVICES.find(s => s.id === 'tax_optimization')!);
  }

  return recommendations.slice(0, 3); // Limiter à 3 recommandations
}

// Fonction pour calculer la valeur ajoutée
export function calculateValueAdded(serviceId: string, businessData: any): number {
  const service = AI_PREMIUM_SERVICES.find(s => s.id === serviceId);
  if (!service) return 0;

  let valueMultiplier = 1;

  // Multiplicateurs basés sur le type d'entreprise
  switch (serviceId) {
    case 'tax_optimization':
      valueMultiplier = businessData.estimatedRevenue > 50000 ? 5 : 3;
      break;
    case 'growth_strategy':
      valueMultiplier = businessData.employees > 5 ? 4 : 2;
      break;
    case 'compliance_audit':
      valueMultiplier = businessData.employees > 10 ? 6 : 3;
      break;
    case 'financial_planning':
      valueMultiplier = businessData.estimatedRevenue > 100000 ? 4 : 2;
      break;
    case 'market_analysis':
      valueMultiplier = 3;
      break;
    case 'legal_consultation':
      valueMultiplier = businessData.estimatedRevenue > 200000 ? 8 : 4;
      break;
  }

  return service.price * valueMultiplier;
} 