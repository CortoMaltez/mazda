#!/usr/bin/env node

/**
 * Script de mise à jour automatique de la roadmap ProsperaLink
 * Ajoute automatiquement les nouvelles contributions et met à jour le progrès
 */

const fs = require('fs');
const path = require('path');

// Configuration des versions
const VERSION_CONFIG = {
  currentVersion: '1.6',
  date: new Date().toISOString().split('T')[0],
  contribution: 'Système de suivi de progrès automatique',
  details: [
    'Script de vérification automatique du progrès',
    'Composant ProgressTracker pour l\'interface',
    'API route pour les données de progrès',
    'Intégration dans le panneau d\'administration',
    'Mise à jour automatique de la roadmap'
  ]
};

// Fonction pour lire le fichier roadmap
function readRoadmap() {
  const roadmapPath = path.join(process.cwd(), 'ROADMAP.txt');
  try {
    return fs.readFileSync(roadmapPath, 'utf8');
  } catch (error) {
    console.error('Erreur lors de la lecture de la roadmap:', error.message);
    return null;
  }
}

// Fonction pour écrire le fichier roadmap
function writeRoadmap(content) {
  const roadmapPath = path.join(process.cwd(), 'ROADMAP.txt');
  try {
    fs.writeFileSync(roadmapPath, content, 'utf8');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'écriture de la roadmap:', error.message);
    return false;
  }
}

// Fonction pour ajouter une nouvelle version
function addNewVersion(roadmapContent) {
  const versionSection = `### VERSION ${VERSION_CONFIG.currentVersion} - ${VERSION_CONFIG.contribution}
**Date**: ${VERSION_CONFIG.date}
**Contribution**: ${VERSION_CONFIG.contribution}
**Détails**:
${VERSION_CONFIG.details.map(detail => `- ${detail}`).join('\n')}

`;

  // Trouver la section des versions
  const versionPattern = /## 📝 HISTORIQUE DES CONTRIBUTIONS ET PROMPTS/;
  const match = roadmapContent.match(versionPattern);
  
  if (match) {
    const insertIndex = match.index + match[0].length;
    const beforeSection = roadmapContent.substring(0, insertIndex);
    const afterSection = roadmapContent.substring(insertIndex);
    
    return beforeSection + '\n' + versionSection + afterSection;
  }
  
  return roadmapContent;
}

// Fonction pour mettre à jour le TODO
function updateTodo(roadmapContent) {
  const todoPattern = /## 📋 TODO IMMÉDIAT[\s\S]*?(?=## 🎉 VISION FINALE)/;
  const match = roadmapContent.match(todoPattern);
  
  if (match) {
    const currentTodo = match[0];
    
    // Mettre à jour les éléments complétés
    let updatedTodo = currentTodo
      .replace('5. 🔄 Tests et validation', '5. ✅ Tests et validation (partiel)')
      .replace('6. 🔄 Documentation complète', '6. ✅ Documentation complète')
      .replace('7. 🔄 Déploiement production', '7. 🔄 Déploiement production');
    
    // Ajouter de nouveaux éléments si nécessaire
    if (!updatedTodo.includes('8. ✅ Système de suivi de progrès')) {
      updatedTodo = updatedTodo.replace(
        '7. 🔄 Déploiement production',
        '7. 🔄 Déploiement production\n8. ✅ Système de suivi de progrès'
      );
    }
    
    return roadmapContent.replace(currentTodo, updatedTodo);
  }
  
  return roadmapContent;
}

// Fonction pour mettre à jour le système de versioning
function updateVersioningSystem(roadmapContent) {
  const versioningPattern = /## 🔄 SYSTÈME DE VERSIONING[\s\S]*?(?=## 📞 CONTACT ET SUPPORT)/;
  const match = roadmapContent.match(versioningPattern);
  
  if (match) {
    const currentVersioning = match[0];
    
    // Mettre à jour les instructions
    const updatedVersioning = currentVersioning.replace(
      'Chaque nouvelle contribution ou prompt sera ajouté sous un nouveau numéro de version (ex: VERSION 1.6, 1.7, etc.)',
      'Chaque nouvelle contribution ou prompt sera ajouté sous un nouveau numéro de version (ex: VERSION 1.7, 1.8, etc.)'
    );
    
    return roadmapContent.replace(currentVersioning, updatedVersioning);
  }
  
  return roadmapContent;
}

// Fonction principale
function updateRoadmap() {
  console.log('🔄 Mise à jour de la roadmap ProsperaLink...\n');
  
  // Lire le contenu actuel
  const roadmapContent = readRoadmap();
  if (!roadmapContent) {
    console.error('❌ Impossible de lire le fichier roadmap');
    return false;
  }
  
  // Ajouter la nouvelle version
  let updatedContent = addNewVersion(roadmapContent);
  
  // Mettre à jour le TODO
  updatedContent = updateTodo(updatedContent);
  
  // Mettre à jour le système de versioning
  updatedContent = updateVersioningSystem(updatedContent);
  
  // Écrire le fichier mis à jour
  const success = writeRoadmap(updatedContent);
  
  if (success) {
    console.log('✅ Roadmap mise à jour avec succès!');
    console.log(`📝 Version ${VERSION_CONFIG.currentVersion} ajoutée`);
    console.log(`📅 Date: ${VERSION_CONFIG.date}`);
    console.log(`🎯 Contribution: ${VERSION_CONFIG.contribution}`);
    console.log('\n📋 Détails ajoutés:');
    VERSION_CONFIG.details.forEach(detail => {
      console.log(`   - ${detail}`);
    });
    console.log('\n🚀 Roadmap prête pour la prochaine contribution!\n');
    return true;
  } else {
    console.error('❌ Erreur lors de la mise à jour de la roadmap');
    return false;
  }
}

// Fonction pour créer un rapport de changements
function createChangeReport() {
  const reportPath = path.join(process.cwd(), 'CHANGELOG.md');
  const reportContent = `# 📋 CHANGELOG - ProsperaLink

## Version ${VERSION_CONFIG.currentVersion} - ${VERSION_CONFIG.date}

### 🎯 Contribution
${VERSION_CONFIG.contribution}

### ✨ Nouvelles Fonctionnalités
${VERSION_CONFIG.details.map(detail => `- ${detail}`).join('\n')}

### 🔧 Améliorations Techniques
- Script de vérification automatique du progrès
- Composant React pour affichage du progrès
- API route pour données de progrès
- Intégration dans le panneau d'administration

### 📊 Impact sur le Projet
- Suivi en temps réel du progrès
- Visibilité accrue pour les administrateurs
- Automatisation des rapports de progrès
- Comparaison continue avec la roadmap

### 🎯 Prochaines Étapes
- Tests automatisés
- Déploiement production
- Optimisation des performances
- Expansion internationale

---

*Généré automatiquement le ${new Date().toLocaleDateString('fr-FR')}*
`;

  try {
    fs.writeFileSync(reportPath, reportContent, 'utf8');
    console.log('📄 Rapport de changements créé: CHANGELOG.md');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de la création du rapport:', error.message);
    return false;
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  const success = updateRoadmap();
  if (success) {
    createChangeReport();
  }
}

module.exports = { updateRoadmap, createChangeReport, VERSION_CONFIG }; 