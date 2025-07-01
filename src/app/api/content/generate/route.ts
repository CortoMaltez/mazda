import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { geminiModel } from '@/services/gemini';
import { generateSocialContent, generateAdCreative, generateContentCalendar } from '@/lib/social-media-ai';
import { AIUsageService } from '@/services/aiUsageService';

export async function POST(request: NextRequest) {
  try {
    // Vérification de l'authentification
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      type, 
      platform, 
      topic, 
      contentType, 
      targetAudience, 
      tone, 
      keywords,
      objective,
      budget
    } = body;

    // Estimation du nombre de tokens pour cette requête
    const estimatedTokens = estimateTokenUsage(type, body);

    // Vérification et enregistrement de l'usage IA
    try {
      const usageCheck = await AIUsageService.checkAndRecordAIUsage(session.user.id, estimatedTokens);
      
      if (!usageCheck.success) {
        return NextResponse.json({ 
          error: 'Budget IA dépassé', 
          details: usageCheck.error,
          usage: {
            current: usageCheck.currentUsage,
            budget: usageCheck.monthlyBudget,
            remaining: usageCheck.remainingTokens
          }
        }, { status: 429 });
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'usage IA:', error);
      return NextResponse.json({ error: 'Erreur lors de la vérification du budget IA' }, { status: 500 });
    }

    let result;

    switch (type) {
      case 'social_post':
        result = await generateSocialContent(platform, contentType, topic);
        break;
      
      case 'ad_creative':
        result = await generateAdCreative(platform, objective, targetAudience);
        break;
      
      case 'content_calendar':
        result = await generateContentCalendar(30); // 30 days
        break;
      
      case 'blog_post':
        result = await generateBlogPost(topic, targetAudience, tone, keywords);
        break;
      
      case 'ad_campaign':
        result = await generateAdCampaign(platform, objective, targetAudience, budget);
        break;
      
      default:
        return NextResponse.json({ error: 'Type de contenu non supporté' }, { status: 400 });
    }

    // Récupérer l'usage mis à jour
    const updatedUsage = await AIUsageService.getAIUsage(session.user.id);

    return NextResponse.json({ 
      success: true, 
      data: result,
      usage: {
        current: updatedUsage.currentUsage,
        budget: updatedUsage.monthlyBudget,
        remaining: updatedUsage.remainingTokens
      }
    });

  } catch (error) {
    console.error('Erreur génération contenu:', error);
    return NextResponse.json({ error: 'Erreur lors de la génération' }, { status: 500 });
  }
}

/**
 * Estime le nombre de tokens nécessaires pour une requête
 */
function estimateTokenUsage(type: string, body: any): number {
  const baseTokens = 1000; // Tokens de base pour le prompt
  
  switch (type) {
    case 'social_post':
      return baseTokens + 500; // ~1500 tokens
    case 'ad_creative':
      return baseTokens + 800; // ~1800 tokens
    case 'content_calendar':
      return baseTokens + 2000; // ~3000 tokens
    case 'blog_post':
      return baseTokens + 3000; // ~4000 tokens
    case 'ad_campaign':
      return baseTokens + 2500; // ~3500 tokens
    default:
      return baseTokens + 1000; // ~2000 tokens par défaut
  }
}

async function generateBlogPost(topic: string, audience: string, tone: string, keywords: string[]) {
  const prompt = `
    Crée un article de blog professionnel pour ProsperaLink sur le sujet: "${topic}"
    
    Public cible: ${audience}
    Ton: ${tone}
    Mots-clés à inclure: ${keywords.join(', ')}
    
    L'article doit:
    - Être optimisé SEO avec les mots-clés
    - Être structuré avec des titres H2, H3
    - Inclure une introduction accrocheuse
    - Contenir des exemples concrets
    - Avoir une conclusion avec call-to-action
    - Être entre 800-1200 mots
    - Inclure des métadonnées SEO (title, description, keywords)
    
    Format de réponse JSON:
    {
      "title": "Titre SEO optimisé",
      "metaDescription": "Description pour les moteurs de recherche",
      "keywords": ["mot-clé1", "mot-clé2"],
      "content": "Contenu HTML avec balises",
      "summary": "Résumé en 2-3 phrases",
      "estimatedReadingTime": "5 min",
      "seoScore": 85
    }
  `;

  const response = await geminiModel.generateContent(prompt);
  return JSON.parse(response.response.text());
}

async function generateAdCampaign(platform: string, objective: string, audience: string, budget: number) {
  const prompt = `
    Crée une campagne publicitaire complète pour ProsperaLink sur ${platform}
    
    Objectif: ${objective}
    Public cible: ${audience}
    Budget: $${budget}
    
    La campagne doit inclure:
    - Nom de campagne
    - Objectifs et KPIs
    - Audience ciblée détaillée
    - Créatifs (textes, images, vidéos)
    - Mots-clés recommandés
    - Paramètres de budget
    - Stratégie de test A/B
    - Métriques de performance attendues
    
    Format JSON:
    {
      "campaignName": "Nom de la campagne",
      "objective": "Objectif principal",
      "budget": {
        "daily": 50,
        "total": ${budget},
        "recommended": ${budget * 1.2}
      },
      "targeting": {
        "age": [25, 55],
        "gender": ["all"],
        "interests": ["entrepreneurship", "business"],
        "locations": ["United States", "Canada", "Europe"],
        "behaviors": ["business owners", "startup founders"]
      },
      "creatives": [
        {
          "type": "image",
          "headline": "Titre accrocheur",
          "description": "Description persuasive",
          "callToAction": "Commencer maintenant",
          "imagePrompt": "Description pour génération d'image"
        }
      ],
      "keywords": ["LLC formation", "business setup", "entrepreneur"],
      "negativeKeywords": ["free", "cheap", "scam"],
      "recommendations": ["Recommandations d'optimisation"]
    }
  `;

  const response = await geminiModel.generateContent(prompt);
  return JSON.parse(response.response.text());
} 