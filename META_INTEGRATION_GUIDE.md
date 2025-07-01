# Guide d'intégration Meta API - ProsperaLink

## 📋 Vue d'ensemble

Ce guide détaille l'intégration complète de l'API Meta (Facebook) dans l'application ProsperaLink pour permettre aux utilisateurs de gérer leurs pages Facebook, publier du contenu et suivre leurs performances.

## 🚀 Configuration initiale

### 1. Variables d'environnement

Ajoutez ces variables à votre fichier `.env.local` :

```env
# Facebook/Meta API
FACEBOOK_APP_ID="736683922139398"
FACEBOOK_APP_SECRET="d75a56bd78e799375b370240394f0dfe"
FACEBOOK_NAMESPACE="prosperalink"
FACEBOOK_REDIRECT_URI="http://localhost:3000/api/auth/facebook/callback"

# Privacy and Terms URLs
PRIVACY_POLICY_URL="https://prosperalink.com/privacy"
TERMS_OF_SERVICE_URL="https://prosperalink.com/terms"
DATA_DELETION_URL="https://prosperalink.com/data-deletion"
```

### 2. Configuration Meta Developer Console

1. Allez sur [Meta for Developers](https://developers.facebook.com/)
2. Sélectionnez votre app : **ProsperaLink**
3. Vérifiez la configuration :

#### App Settings
- **App ID**: 736683922139398
- **App Secret**: d75a56bd78e799375b370240394f0dfe
- **Display Name**: ProsperaLink
- **Namespace**: prosperalink
- **Contact Email**: hafsaoui.hassen@gmail.com

#### Facebook Login Settings
- **Valid OAuth Redirect URIs**: 
  - `http://localhost:3000/api/auth/facebook/callback` (développement)
  - `https://prosperalink.com/api/auth/facebook/callback` (production)

#### Permissions
- `email`
- `public_profile`
- `pages_manage_posts`
- `pages_read_engagement`
- `business_management`

## 🏗️ Architecture de l'intégration

### Fichiers créés/modifiés

```
src/
├── lib/
│   └── meta-api.ts                 # Classe principale Meta API
├── app/
│   └── api/
│       ├── auth/
│       │   └── facebook/
│       │       ├── route.ts        # Initiation auth
│       │       └── callback/
│       │           └── route.ts    # Callback auth
│       └── social/
│           └── facebook/
│               ├── pages/
│               │   └── route.ts    # Gestion pages
│               ├── posts/
│               │   └── route.ts    # Gestion publications
│               └── insights/
│                   └── route.ts    # Analytics
└── components/
    ├── FacebookIntegration.tsx     # Interface utilisateur
    └── MetaIntegrationTest.tsx     # Tests d'intégration
```

### Base de données

Le modèle `User` a été étendu avec :

```prisma
model User {
  // ... autres champs
  
  // Facebook integration
  facebookId String? @unique
  facebookAccessToken String?
  facebookConnected Boolean @default(false)
  
  // ... relations
}
```

## 🔧 Installation et déploiement

### 1. Installation des dépendances

```bash
npm install
```

### 2. Migration de la base de données

```bash
npx prisma db push
npx prisma generate
```

### 3. Test de l'intégration

```bash
# Test des composants Meta
npm run dev

# Test spécifique de l'intégration
node scripts/test-meta-integration.js
```

### 4. Déploiement

```bash
# Build de production
npm run build

# Démarrage en production
npm start
```

## 🧪 Tests

### Tests automatisés

```bash
# Test de l'intégration Meta
npm run test:meta

# Test complet de l'application
npm run test
```

### Tests manuels

1. **Test d'authentification** :
   - Accédez à `/dashboard`
   - Cliquez sur "Connecter Facebook"
   - Vérifiez la redirection et le callback

2. **Test de gestion des pages** :
   - Connectez votre compte Facebook
   - Vérifiez que vos pages apparaissent
   - Testez la sélection de page

3. **Test de publication** :
   - Rédigez un message
   - Publiez sur une page
   - Vérifiez la publication sur Facebook

4. **Test d'analytics** :
   - Vérifiez les insights de vos pages
   - Testez différents périodes (jour/semaine/mois)

## 🔒 Sécurité

### Bonnes pratiques

1. **Tokens d'accès** :
   - Stockage sécurisé des tokens
   - Renouvellement automatique
   - Validation des permissions

2. **Permissions** :
   - Demande minimale de permissions
   - Explication claire de l'usage
   - Possibilité de révocation

3. **Données utilisateur** :
   - Conformité GDPR
   - Chiffrement des données sensibles
   - Suppression à la demande

### Variables sensibles

```env
# Ne jamais commiter ces valeurs
FACEBOOK_APP_SECRET="your-secret-here"
NEXTAUTH_SECRET="your-nextauth-secret"
```

## 📊 Fonctionnalités disponibles

### 1. Authentification Facebook
- Connexion OAuth 2.0
- Gestion des sessions
- Liaison de comptes

### 2. Gestion des pages
- Liste des pages gérées
- Informations détaillées
- Permissions par page

### 3. Publications
- Publication immédiate
- Programmation de posts
- Support des liens et médias

### 4. Analytics
- Impressions de page
- Utilisateurs engagés
- Engagements par post
- Nombre d'abonnés

### 5. Gestion des commentaires
- Lecture des commentaires
- Réponses automatisées
- Modération

## 🚨 Dépannage

### Erreurs courantes

1. **"Invalid OAuth redirect URI"**
   - Vérifiez l'URL de redirection dans Meta Developer Console
   - Assurez-vous que l'URL correspond exactement

2. **"App not configured for Facebook Login"**
   - Activez Facebook Login dans votre app Meta
   - Vérifiez les paramètres OAuth

3. **"Insufficient permissions"**
   - Vérifiez les permissions demandées
   - Assurez-vous que l'app est en mode développement ou production

4. **"Token expired"**
   - Implémentez le renouvellement automatique des tokens
   - Gérer les tokens de longue durée

### Logs de débogage

```javascript
// Activer les logs détaillés
console.log('Meta API Debug:', {
  appId: process.env.FACEBOOK_APP_ID,
  redirectUri: process.env.FACEBOOK_REDIRECT_URI,
  // Ne pas logger les secrets en production
});
```

## 📈 Monitoring et analytics

### Métriques à surveiller

1. **Performance** :
   - Temps de réponse des API
   - Taux de succès des requêtes
   - Utilisation des ressources

2. **Utilisation** :
   - Nombre d'utilisateurs connectés
   - Publications par jour
   - Pages gérées

3. **Erreurs** :
   - Taux d'erreur d'authentification
   - Échecs de publication
   - Problèmes de permissions

### Outils de monitoring

- **Logs** : Winston ou Pino
- **Métriques** : Prometheus + Grafana
- **Alertes** : Sentry ou Rollbar

## 🔄 Mises à jour et maintenance

### Mise à jour de l'API Meta

1. **Surveiller les changements** :
   - [Changelog Meta](https://developers.facebook.com/docs/graph-api/changelog)
   - [Blog Meta for Developers](https://developers.facebook.com/blog/)

2. **Tests de régression** :
   - Tests automatisés après chaque mise à jour
   - Validation des fonctionnalités critiques

3. **Migration progressive** :
   - Support des anciennes et nouvelles versions
   - Migration des utilisateurs existants

### Maintenance

- **Nettoyage des tokens expirés** : Tâche cron hebdomadaire
- **Mise à jour des permissions** : Vérification mensuelle
- **Optimisation des performances** : Monitoring continu

## 📞 Support

### Ressources utiles

- [Documentation Meta API](https://developers.facebook.com/docs/)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- [Facebook Login](https://developers.facebook.com/docs/facebook-login/)

### Contact

Pour toute question sur l'intégration :
- Email : hafsaoui.hassen@gmail.com
- Documentation : Ce guide
- Issues : GitHub repository

---

**Note** : Ce guide doit être mis à jour régulièrement pour refléter les changements de l'API Meta et les évolutions de l'application ProsperaLink. 