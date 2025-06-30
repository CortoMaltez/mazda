#!/usr/bin/env node

/**
 * Script de vérification automatique du progrès ProsperaLink
 * Version optimisée - V1.6
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// Configuration des métriques de progrès optimisées
const PROGRESS_METRICS = {
  // Architecture technique (15%)
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

  // Fonctionnalités principales (25%)
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

  // Intégration IA (20%)
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

  // Sécurité et permissions (15%)
  'security': {
    weight: 15,
    items: [
      { name: 'Middleware auth', file: 'src/middleware.ts', check: () => true },
      { name: 'Permissions granulaires', file: 'src/lib/auth.ts', check: (content) => content.includes('hasConsultantPermission') },
      { name: 'Accès discret', file: 'src/components/DiscreetAccess.tsx', check: () => true },
      { name: 'Protection routes', file: 'src/lib/auth.ts', check: (content) => content.includes('requireAuth') }
    ]
  },

  // API Routes (10%)
  'api_routes': {
    weight: 10,
    items: [
      { name: 'Auth API', file: 'src/app/api/auth/[...nextauth]/route.ts', check: () => true },
      { name: 'Users API', file: 'src/app/api/admin/users/route.ts', check: () => true },
      { name: 'Permissions API', file: 'src/app/api/admin/permissions/route.ts', check: () => true },
      { name: 'Payments API', file: 'src/app/api/payments/route.ts', check: () => true }
    ]
  },

  // Tests et documentation (10%)
  'quality': {
    weight: 10,
    items: [
      { name: 'Roadmap consolidée', file: 'ROADMAP_CONSOLIDATED.md', check: () => true },
      { name: 'Guide dépannage', file: 'GUIDE_DEPANNAGE.md', check: () => true },
      { name: 'README optimisé', file: 'README.md', check: () => true },
      { name: 'Tests automatisés', file: 'src/lib/auth.test.ts', check: () => true }
    ]
  },

  // Configuration (5%)
  'config': {
    weight: 5,
    items: [
      { name: 'Variables env', file: 'env.example', check: () => true },
      { name: 'Prisma schema', file: 'prisma/schema.prisma', check: () => true },
      { name: 'Package.json', file: 'package.json', check: () => true }
    ]
  }
};

// Fonction optimisée pour vérifier l'existence et le contenu d'un fichier
function checkFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return { exists: true, content, size: content.length };
    }
    return { exists: false, content: '', size: 0 };
  } catch (error) {
    return { exists: false, content: '', size: 0, error: error.message };
  }
}

// Fonction optimisée pour calculer le progrès d'une catégorie
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
      size: fileCheck.size,
      error: fileCheck.error
    });
  }

  const progress = (completed / items.length) * 100;
  return { progress, completed, total: items.length, results };
}

// Fonction principale optimisée
async function checkProgress() {
  const prisma = new PrismaClient();
  const basePath = process.cwd();
  
  try {
    console.log('🔍 Vérification de l\'état de ProsperaLink V1.6...\n');
    
    // Test de connexion rapide
    await prisma.$connect();
    console.log('✅ Base de données connectée');
    
    // Vérifier les modèles critiques
    const criticalModels = ['user', 'company', 'AIAnalysis'];
    
    for (const model of criticalModels) {
      try {
        await prisma[model].findMany({ take: 1 });
        console.log(`✅ Modèle ${model}: OK`);
      } catch (error) {
        console.log(`❌ Modèle ${model}: Erreur - ${error.message}`);
      }
    }
    
    // Calculer le progrès global
    let totalProgress = 0;
    let totalWeight = 0;
    
    console.log('\n📊 Analyse du progrès:');
    console.log('='.repeat(50));
    
    for (const [categoryName, category] of Object.entries(PROGRESS_METRICS)) {
      const categoryProgress = calculateCategoryProgress(category, basePath);
      const weightedProgress = (categoryProgress.progress * category.weight) / 100;
      
      totalProgress += weightedProgress;
      totalWeight += category.weight;
      
      console.log(`\n${categoryName.toUpperCase()} (${category.weight}%):`);
      console.log(`  Progrès: ${categoryProgress.progress.toFixed(1)}% (${categoryProgress.completed}/${categoryProgress.total})`);
      
      // Afficher les détails des items
      categoryProgress.results.forEach(result => {
        const status = result.completed ? '✅' : '❌';
        const size = result.size > 0 ? `(${result.size} chars)` : '';
        console.log(`    ${status} ${result.name} ${size}`);
      });
    }
    
    const globalProgress = (totalProgress / totalWeight) * 100;
    
    console.log('\n' + '='.repeat(50));
    console.log(`🎯 PROGRÈS GLOBAL: ${globalProgress.toFixed(1)}%`);
    console.log('='.repeat(50));
    
    // Statistiques de base de données
    console.log('\n📈 Statistiques:');
    try {
      const userCount = await prisma.user.count();
      const companyCount = await prisma.company.count();
      const aiAnalysisCount = await prisma.aIAnalysis.count();
      
      console.log(`- Utilisateurs: ${userCount}`);
      console.log(`- Entreprises: ${companyCount}`);
      console.log(`- Analyses IA: ${aiAnalysisCount}`);
    } catch (error) {
      console.log(`- Erreur statistiques: ${error.message}`);
    }
    
    // Recommandations
    console.log('\n💡 Recommandations:');
    if (globalProgress < 80) {
      console.log('- Continuer le développement des fonctionnalités manquantes');
    } else if (globalProgress < 95) {
      console.log('- Optimiser et tester les fonctionnalités existantes');
    } else {
      console.log('- Préparer le déploiement production');
    }
    
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