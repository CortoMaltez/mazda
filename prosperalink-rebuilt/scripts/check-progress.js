#!/usr/bin/env node

/**
 * Script de vérification automatique du progrès ProsperaLink
 * Compare l'état actuel du projet avec la roadmap
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// Configuration des métriques de progrès
const PROGRESS_METRICS = {
  // Architecture technique
  'architecture': {
    weight: 15,
    items: [
      { name: 'Next.js 15', file: 'package.json', check: (content) => content.includes('"next": "15.3.4"') },
      { name: 'TypeScript', file: 'tsconfig.json', check: () => true },
      { name: 'Prisma ORM', file: 'package.json', check: (content) => content.includes('"@prisma/client"') },
      { name: 'NextAuth.js', file: 'package.json', check: (content) => content.includes('"next-auth"') },
      { name: 'Stripe', file: 'package.json', check: (content) => content.includes('"stripe"') },
      { name: 'Gemini API', file: 'package.json', check: (content) => content.includes('"@google/generative-ai"') }
    ]
  },

  // Fonctionnalités principales
  'features': {
    weight: 25,
    items: [
      { name: 'Page d\'accueil', file: 'src/app/page.tsx', check: () => true },
      { name: 'Authentification', file: 'src/lib/auth.ts', check: () => true },
      { name: 'Dashboard client', file: 'src/app/dashboard/page.tsx', check: () => true },
      { name: 'Panneau admin', file: 'src/app/admin/page.tsx', check: () => true },
      { name: 'Espace consultant', file: 'src/app/consultant/page.tsx', check: () => true },
      { name: 'Navigation', file: 'src/components/layout/Navigation.tsx', check: () => true }
    ]
  },

  // Intégration IA
  'ai_integration': {
    weight: 20,
    items: [
      { name: 'AIChatbot', file: 'src/components/AIChatbot.tsx', check: () => true },
      { name: 'ContentGenerator', file: 'src/components/ContentGenerator.tsx', check: () => true },
      { name: 'WhatsAppBot', file: 'src/components/WhatsAppBot.tsx', check: () => true },
      { name: 'PredictiveAnalytics', file: 'src/components/PredictiveAnalytics.tsx', check: () => true },
      { name: 'ConversionOptimizer', file: 'src/components/ConversionOptimizer.tsx', check: () => true },
      { name: 'AIPricingAdvisor', file: 'src/components/AIPricingAdvisor.tsx', check: () => true },
      { name: 'Gestionnaire coûts IA', file: 'src/lib/gemini-cost-manager.ts', check: () => true }
    ]
  },

  // Sécurité et permissions
  'security': {
    weight: 15,
    items: [
      { name: 'Middleware auth', file: 'src/middleware.ts', check: () => true },
      { name: 'Permissions granulaires', file: 'src/lib/auth.ts', check: (content) => content.includes('hasConsultantPermission') },
      { name: 'Accès discret', file: 'src/components/DiscreetAccess.tsx', check: () => true },
      { name: 'Protection routes', file: 'src/lib/auth.ts', check: (content) => content.includes('requireAuth') }
    ]
  },

  // API Routes
  'api_routes': {
    weight: 10,
    items: [
      { name: 'Auth API', file: 'src/app/api/auth/[...nextauth]/route.ts', check: () => true },
      { name: 'Users API', file: 'src/app/api/admin/users/route.ts', check: () => true },
      { name: 'Permissions API', file: 'src/app/api/admin/permissions/route.ts', check: () => true },
      { name: 'Payments API', file: 'src/app/api/payments/route.ts', check: () => true }
    ]
  },

  // Tests et documentation
  'quality': {
    weight: 10,
    items: [
      { name: 'Roadmap', file: 'ROADMAP.txt', check: () => true },
      { name: 'Documentation accès', file: 'ACCES_DISCRET.md', check: () => true },
      { name: 'Rapport progrès', file: 'RAPPORT_PROGRES_ROADMAP.md', check: () => true },
      { name: 'README', file: 'README.md', check: () => true }
    ]
  },

  // Configuration
  'config': {
    weight: 5,
    items: [
      { name: 'Variables env', file: '.env.local', check: () => true },
      { name: 'Prisma schema', file: 'prisma/schema.prisma', check: () => true },
      { name: 'Tailwind config', file: 'tailwind.config.ts', check: () => true }
    ]
  }
};

// Fonction pour vérifier l'existence et le contenu d'un fichier
function checkFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return { exists: true, content };
    }
    return { exists: false, content: '' };
  } catch (error) {
    return { exists: false, content: '', error: error.message };
  }
}

// Fonction pour calculer le progrès d'une catégorie
function calculateCategoryProgress(category, basePath) {
  const items = category.items;
  let completed = 0;
  const results = [];

  for (const item of items) {
    const filePath = path.join(basePath, item.file);
    const fileCheck = checkFile(filePath);
    
    let isCompleted = false;
    if (fileCheck.exists) {
      if (item.check) {
        isCompleted = item.check(fileCheck.content);
      } else {
        isCompleted = true;
      }
    }

    if (isCompleted) {
      completed++;
    }

    results.push({
      name: item.name,
      file: item.file,
      completed: isCompleted,
      exists: fileCheck.exists,
      error: fileCheck.error
    });
  }

  const progress = (completed / items.length) * 100;
  return { progress, completed, total: items.length, results };
}

// Fonction principale
async function checkProgress() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Vérification de l\'état de ProsperaLink...\n');
    
    // Test de connexion
    await prisma.$connect();
    console.log('✅ Base de données connectée');
    
    // Vérifier les modèles
    const models = ['user', 'company', 'AIAnalysis', 'Competitor', 'CompetitiveInsight'];
    
    for (const model of models) {
      try {
        await prisma[model].findMany({ take: 1 });
        console.log(`✅ Modèle ${model}: OK`);
      } catch (error) {
        console.log(`❌ Modèle ${model}: Erreur - ${error.message}`);
      }
    }
    
    // Statistiques
    console.log('\n📊 Statistiques:');
    console.log(`- Utilisateurs: ${await prisma.user.count()}`);
    console.log(`- Entreprises: ${await prisma.company.count()}`);
    
    console.log('\n🎉 Vérification terminée!');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  checkProgress();
}

module.exports = { checkProgress, PROGRESS_METRICS }; 