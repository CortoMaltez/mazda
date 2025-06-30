#!/usr/bin/env node

/**
 * Script de test pour vérifier le bon fonctionnement de ProsperaLink
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const TEST_CONFIG = {
  port: 3000, // Port utilisé par le serveur
  timeout: 10000, // Timeout en ms
  endpoints: [
    '/',
    '/admin',
    '/consultant',
    '/dashboard',
    '/api/progress'
  ]
};

// Fonction pour tester un endpoint
function testEndpoint(url) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: TEST_CONFIG.port,
      path: url,
      method: 'GET',
      timeout: TEST_CONFIG.timeout
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          success: res.statusCode >= 200 && res.statusCode < 400,
          data: data.substring(0, 200) + '...' // Limiter la taille
        });
      });
    });

    req.on('error', (error) => {
      reject({
        url,
        error: error.message,
        success: false
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject({
        url,
        error: 'Timeout',
        success: false
      });
    });

    req.end();
  });
}

// Fonction pour vérifier les fichiers critiques
function checkCriticalFiles() {
  const criticalFiles = [
    'src/app/page.tsx',
    'src/components/DiscreetAccessWrapper.tsx',
    'src/components/DiscreetIndicatorWrapper.tsx',
    'src/components/AIChatbot.tsx',
    'src/app/api/progress/route.ts',
    'scripts/check-progress.js',
    'scripts/update-roadmap.js'
  ];

  const results = [];
  
  for (const file of criticalFiles) {
    const filePath = path.join(process.cwd(), file);
    const exists = fs.existsSync(filePath);
    results.push({
      file,
      exists,
      success: exists
    });
  }
  
  return results;
}

// Fonction pour tester les scripts npm
function testNpmScripts() {
  const scripts = [
    'dev',
    'build',
    'progress',
    'roadmap:update'
  ];

  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    return { success: false, error: 'package.json non trouvé' };
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const results = [];
    
    for (const script of scripts) {
      const exists = packageJson.scripts && packageJson.scripts[script];
      results.push({
        script,
        exists,
        success: exists
      });
    }
    
    return { success: true, results };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Fonction principale de test
async function runTests() {
  console.log('🧪 Tests de ProsperaLink en cours...\n');
  
  let allTestsPassed = true;
  
  // Test 1: Vérification des fichiers critiques
  console.log('📁 Test 1: Vérification des fichiers critiques');
  const fileResults = checkCriticalFiles();
  for (const result of fileResults) {
    const status = result.success ? '✅' : '❌';
    console.log(`   ${status} ${result.file}`);
    if (!result.success) allTestsPassed = false;
  }
  console.log('');
  
  // Test 2: Vérification des scripts npm
  console.log('📦 Test 2: Vérification des scripts npm');
  const scriptResults = testNpmScripts();
  if (scriptResults.success) {
    for (const result of scriptResults.results) {
      const status = result.success ? '✅' : '❌';
      console.log(`   ${status} npm run ${result.script}`);
      if (!result.success) allTestsPassed = false;
    }
  } else {
    console.log(`   ❌ Erreur: ${scriptResults.error}`);
    allTestsPassed = false;
  }
  console.log('');
  
  // Test 3: Test des endpoints (si le serveur est en cours)
  console.log('🌐 Test 3: Test des endpoints');
  console.log('   ⏳ Attente du démarrage du serveur...');
  
  // Attendre un peu que le serveur démarre
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  for (const endpoint of TEST_CONFIG.endpoints) {
    try {
      const result = await testEndpoint(endpoint);
      const status = result.success ? '✅' : '⚠️';
      console.log(`   ${status} ${endpoint} (${result.status})`);
      if (!result.success) allTestsPassed = false;
    } catch (error) {
      console.log(`   ❌ ${endpoint} - ${error.error}`);
      allTestsPassed = false;
    }
  }
  
  // Résumé
  console.log('\n📊 RÉSUMÉ DES TESTS');
  console.log('='.repeat(50));
  
  if (allTestsPassed) {
    console.log('🎉 Tous les tests sont passés avec succès !');
    console.log('✅ ProsperaLink est prêt à être utilisé');
  } else {
    console.log('⚠️  Certains tests ont échoué');
    console.log('🔧 Vérifiez les erreurs ci-dessus');
  }
  
  console.log('\n🚀 Prochaines étapes :');
  console.log('   1. Ouvrir http://localhost:3001');
  console.log('   2. Tester l\'accès discret (Ctrl+Alt+A/C)');
  console.log('   3. Vérifier le panneau admin');
  console.log('   4. Tester le système de progrès');
  
  return allTestsPassed;
}

async function testApp() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Test de l\'application ProsperaLink...\n');
    
    // Test de connexion à la base de données
    console.log('1. Test de connexion à la base de données...');
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie\n');
    
    // Test des modèles Prisma
    console.log('2. Test des modèles Prisma...');
    
    // Test du modèle User
    try {
      const users = await prisma.user.findMany({ take: 1 });
      console.log('✅ Modèle User: OK');
    } catch (error) {
      console.log('❌ Modèle User: Erreur -', error.message);
    }
    
    // Test du modèle Company
    try {
      const companies = await prisma.company.findMany({ take: 1 });
      console.log('✅ Modèle Company: OK');
    } catch (error) {
      console.log('❌ Modèle Company: Erreur -', error.message);
    }
    
    // Test du modèle AIAnalysis
    try {
      const analyses = await prisma.AIAnalysis.findMany({ take: 1 });
      console.log('✅ Modèle AIAnalysis: OK');
    } catch (error) {
      console.log('❌ Modèle AIAnalysis: Erreur -', error.message);
    }
    
    // Test du modèle Competitor
    try {
      const competitors = await prisma.Competitor.findMany({ take: 1 });
      console.log('✅ Modèle Competitor: OK');
    } catch (error) {
      console.log('❌ Modèle Competitor: Erreur -', error.message);
    }
    
    // Test du modèle CompetitiveInsight
    try {
      const insights = await prisma.CompetitiveInsight.findMany({ take: 1 });
      console.log('✅ Modèle CompetitiveInsight: OK');
    } catch (error) {
      console.log('❌ Modèle CompetitiveInsight: Erreur -', error.message);
    }
    
    console.log('\n3. Test des variables d\'environnement...');
    const requiredEnvVars = [
      'DATABASE_URL',
      'NEXTAUTH_SECRET',
      'NEXTAUTH_URL',
      'GOOGLE_GEMINI_API_KEY',
      'STRIPE_SECRET_KEY',
      'STRIPE_PUBLISHABLE_KEY'
    ];
    
    for (const envVar of requiredEnvVars) {
      if (process.env[envVar]) {
        console.log(`✅ ${envVar}: Configuré`);
      } else {
        console.log(`❌ ${envVar}: Manquant`);
      }
    }
    
    console.log('\n4. Statistiques de la base de données...');
    const userCount = await prisma.user.count();
    const companyCount = await prisma.company.count();
    const analysisCount = await prisma.AIAnalysis.count();
    
    console.log(`📊 Utilisateurs: ${userCount}`);
    console.log(`📊 Entreprises: ${companyCount}`);
    console.log(`📊 Analyses IA: ${analysisCount}`);
    
    console.log('\n🎉 Test terminé avec succès!');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  runTests().then((success) => {
    process.exit(success ? 0 : 1);
  }).catch((error) => {
    console.error('❌ Erreur lors des tests:', error);
    process.exit(1);
  });
}

module.exports = { runTests, testEndpoint, checkCriticalFiles, testNpmScripts }; 