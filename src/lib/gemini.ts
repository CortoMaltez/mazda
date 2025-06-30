import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Types pour les interactions IA
export interface AIResponse {
  content: string;
  confidence: number;
  suggestions?: string[];
}

export interface ContentGenerationRequest {
  type: 'blog' | 'email' | 'faq' | 'seo' | 'support';
  topic: string;
  tone: 'professional' | 'friendly' | 'formal';
  length: 'short' | 'medium' | 'long';
  context?: string;
}

export interface SupportQuery {
  question: string;
  userContext: {
    companyStatus?: string;
    documents?: string[];
    recentActivity?: string[];
    subscriptionType?: string;
  };
}

// Fonctions IA pour ProsperaLink
export async function generateContent(request: ContentGenerationRequest): Promise<AIResponse> {
  const prompt = `
    Tu es un expert en formation d'entreprises LLC aux États-Unis pour ProsperaLink.
    Génère du contenu ${request.type} sur le thème: "${request.topic}"
    
    Ton: ${request.tone}
    Longueur: ${request.length}
    Contexte: ${request.context || 'Formation d\'entreprises LLC pour entrepreneurs internationaux'}
    
    Le contenu doit être:
    - Professionnel et informatif
    - Optimisé pour le référencement
    - Adapté aux entrepreneurs internationaux
    - Conforme aux réglementations américaines
    - Engageant et actionnable
  `;

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return {
      content: text,
      confidence: 0.9,
      suggestions: []
    };
  } catch (error) {
    console.error('Erreur génération contenu:', error);
    return {
      content: 'Erreur lors de la génération du contenu.',
      confidence: 0,
      suggestions: ['Vérifiez votre connexion internet', 'Réessayez dans quelques instants']
    };
  }
}

export async function answerSupportQuery(query: SupportQuery): Promise<AIResponse> {
  const prompt = `
    Tu es l'assistant IA de ProsperaLink, spécialisé dans la formation d'entreprises LLC.
    
    Question du client: "${query.question}"
    
    Contexte du client:
    - Statut entreprise: ${query.userContext.companyStatus || 'Non spécifié'}
    - Documents disponibles: ${query.userContext.documents?.join(', ') || 'Aucun'}
    - Activité récente: ${query.userContext.recentActivity?.join(', ') || 'Aucune'}
    - Type d'abonnement: ${query.userContext.subscriptionType || 'Non spécifié'}
    
    Fournis une réponse:
    - Précise et utile
    - Basée sur les réglementations américaines
    - Adaptée au contexte du client
    - Avec des suggestions d'actions concrètes
    - En français (sauf si le client préfère l'anglais)
  `;

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return {
      content: text,
      confidence: 0.85,
      suggestions: ['Consultez notre FAQ', 'Contactez votre account manager']
    };
  } catch (error) {
    console.error('Erreur réponse support:', error);
    return {
      content: 'Je ne peux pas répondre pour le moment. Contactez votre account manager.',
      confidence: 0,
      suggestions: ['Contactez le support', 'Consultez la FAQ']
    };
  }
}

export async function generateSEOMetadata(page: string, content: string): Promise<{
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
}> {
  const prompt = `
    Génère des métadonnées SEO pour la page "${page}" de ProsperaLink.
    
    Contenu de la page: ${content.substring(0, 500)}...
    
    Génère:
    1. Title tag (60 caractères max)
    2. Meta description (160 caractères max)
    3. Keywords (5-8 mots-clés pertinents)
    4. Open Graph title
    5. Open Graph description
    
    Focus sur: formation LLC, entrepreneurs internationaux, conformité américaine, Delaware, Wyoming
  `;

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse la réponse (format attendu: JSON-like)
    const lines = text.split('\n');
    const title = lines.find(l => l.includes('Title:'))?.split('Title:')[1]?.trim() || '';
    const description = lines.find(l => l.includes('Description:'))?.split('Description:')[1]?.trim() || '';
    const keywords = lines.find(l => l.includes('Keywords:'))?.split('Keywords:')[1]?.trim().split(',').map(k => k.trim()) || [];
    
    return {
      title: title.substring(0, 60),
      description: description.substring(0, 160),
      keywords,
      ogTitle: title,
      ogDescription: description
    };
  } catch (error) {
    console.error('Erreur génération SEO:', error);
    return {
      title: 'ProsperaLink - Formation d\'entreprises LLC aux États-Unis',
      description: 'Service professionnel de formation d\'entreprises LLC. Formation rapide, sécurisée et économique.',
      keywords: ['LLC', 'formation entreprise', 'Delaware', 'Wyoming', 'EIN'],
      ogTitle: 'ProsperaLink - Formation d\'entreprises LLC',
      ogDescription: 'Service professionnel de formation d\'entreprises LLC aux États-Unis'
    };
  }
}

export async function analyzeDocument(documentText: string): Promise<{
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  riskLevel: 'low' | 'medium' | 'high';
}> {
  const prompt = `
    Analyse ce document légal/fiscal pour un client ProsperaLink:
    
    ${documentText.substring(0, 2000)}
    
    Fournis:
    1. Résumé en 2-3 phrases
    2. Points clés (3-5 points)
    3. Actions à entreprendre
    4. Niveau de risque (low/medium/high)
  `;

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse la réponse
    const lines = text.split('\n');
    const summary = lines.find(l => l.includes('Résumé:'))?.split('Résumé:')[1]?.trim() || '';
    const keyPoints = lines.filter(l => l.includes('•') || l.includes('-')).map(l => l.replace(/^[•-]\s*/, '').trim());
    const actionItems = lines.filter(l => l.includes('Action:')).map(l => l.split('Action:')[1]?.trim()).filter(Boolean);
    const riskLevel = text.includes('high') ? 'high' : text.includes('medium') ? 'medium' : 'low';
    
    return {
      summary,
      keyPoints,
      actionItems,
      riskLevel
    };
  } catch (error) {
    console.error('Erreur analyse document:', error);
    return {
      summary: 'Document en cours d\'analyse...',
      keyPoints: [],
      actionItems: [],
      riskLevel: 'low'
    };
  }
} 