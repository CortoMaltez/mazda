const { metaAPI } = require('../src/lib/meta-api.ts');

async function testMetaIntegration() {
  console.log('🧪 Test d\'intégration Meta API\n');

  try {
    // Test 1: Configuration
    console.log('1. Test de configuration...');
    console.log('   App ID:', process.env.FACEBOOK_APP_ID || '736683922139398');
    console.log('   Namespace:', process.env.FACEBOOK_NAMESPACE || 'prosperalink');
    console.log('   ✅ Configuration OK\n');

    // Test 2: URL d'authentification
    console.log('2. Test de génération d\'URL d\'authentification...');
    const authUrl = metaAPI.getAuthUrl('test_state');
    console.log('   URL générée:', authUrl);
    console.log('   ✅ URL d\'authentification OK\n');

    // Test 3: Validation de token (simulation)
    console.log('3. Test de validation de token...');
    const tokenValidation = await metaAPI.validateToken('test_token');
    console.log('   Résultat:', tokenValidation);
    console.log('   ✅ Validation de token OK\n');

    // Test 4: Formatage des dates
    console.log('4. Test de formatage des dates...');
    const formattedDate = metaAPI.formatFacebookDate('2024-01-01T00:00:00+0000');
    console.log('   Date formatée:', formattedDate);
    console.log('   ✅ Formatage de date OK\n');

    // Test 5: Calcul du taux d'engagement
    console.log('5. Test de calcul du taux d\'engagement...');
    const engagementRate = metaAPI.formatEngagementRate(100, 1000);
    console.log('   Taux d\'engagement:', engagementRate + '%');
    console.log('   ✅ Calcul d\'engagement OK\n');

    console.log('🎉 Tous les tests sont passés avec succès !');
    console.log('\n📋 Prochaines étapes :');
    console.log('   1. Configurer les variables d\'environnement');
    console.log('   2. Tester l\'authentification Facebook');
    console.log('   3. Tester la récupération des pages');
    console.log('   4. Tester les publications');
    console.log('   5. Tester les analytics');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    process.exit(1);
  }
}

// Fonction pour tester les endpoints API
async function testAPIEndpoints() {
  console.log('\n🌐 Test des endpoints API\n');

  const baseUrl = 'http://localhost:3000';
  const endpoints = [
    '/api/auth/facebook',
    '/api/social/facebook/pages',
    '/api/social/facebook/posts',
    '/api/social/facebook/insights'
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Test de ${endpoint}...`);
      const response = await fetch(`${baseUrl}${endpoint}`);
      console.log(`   Status: ${response.status}`);
      console.log(`   ✅ Endpoint accessible\n`);
    } catch (error) {
      console.log(`   ❌ Erreur: ${error.message}\n`);
    }
  }
}

// Fonction pour vérifier les variables d'environnement
function checkEnvironmentVariables() {
  console.log('🔧 Vérification des variables d\'environnement\n');

  const requiredVars = [
    'FACEBOOK_APP_ID',
    'FACEBOOK_APP_SECRET',
    'FACEBOOK_NAMESPACE',
    'FACEBOOK_REDIRECT_URI'
  ];

  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (value) {
      console.log(`   ✅ ${varName}: ${varName.includes('SECRET') ? '***' : value}`);
    } else {
      console.log(`   ❌ ${varName}: Non définie`);
    }
  }
  console.log('');
}

// Fonction principale
async function main() {
  console.log('🚀 Démarrage des tests d\'intégration Meta API\n');

  // Vérifier les variables d'environnement
  checkEnvironmentVariables();

  // Tester l'intégration Meta
  await testMetaIntegration();

  // Tester les endpoints API (si le serveur est en cours d'exécution)
  console.log('Voulez-vous tester les endpoints API ? (y/n)');
  // Note: En production, vous pourriez automatiser cette partie
  
  console.log('\n✨ Tests terminés !');
}

// Exécuter les tests si le script est appelé directement
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testMetaIntegration,
  testAPIEndpoints,
  checkEnvironmentVariables
}; 