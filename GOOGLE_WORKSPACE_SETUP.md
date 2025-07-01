# Configuration Google Workspace pour ProsperaLink V2

Ce guide vous explique comment configurer l'intégration Google Workspace pour ProsperaLink V2.

## Prérequis

1. Un compte Google (Gmail)
2. Accès à Google Cloud Console
3. Connaissances de base en développement web

## Étape 1: Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Cliquez sur "Sélectionner un projet" puis "Nouveau projet"
3. Nommez votre projet (ex: "ProsperaLink V2")
4. Cliquez sur "Créer"

## Étape 2: Activer les APIs nécessaires

Dans votre projet Google Cloud, activez les APIs suivantes :

1. **Google Drive API**
   - Recherchez "Google Drive API" dans la barre de recherche
   - Cliquez sur "Activer"

2. **Google Calendar API**
   - Recherchez "Google Calendar API"
   - Cliquez sur "Activer"

3. **Google Docs API**
   - Recherchez "Google Docs API"
   - Cliquez sur "Activer"

4. **Google OAuth2 API**
   - Recherchez "Google+ API" ou "OAuth2 API"
   - Cliquez sur "Activer"

## Étape 3: Créer les identifiants OAuth2

1. Dans le menu de gauche, allez dans "APIs et services" > "Identifiants"
2. Cliquez sur "Créer des identifiants" > "ID client OAuth 2.0"
3. Sélectionnez "Application Web"
4. Nommez votre client (ex: "ProsperaLink Web Client")

### Configuration des URIs autorisés

**URIs de redirection autorisés :**
```
http://localhost:3000/api/auth/callback/google
https://votre-domaine.com/api/auth/callback/google
```

**Origines JavaScript autorisées :**
```
http://localhost:3000
https://votre-domaine.com
```

## Étape 4: Configurer les scopes OAuth2

Dans la configuration de votre client OAuth2, ajoutez les scopes suivants :

```
openid
email
profile
https://www.googleapis.com/auth/calendar
https://www.googleapis.com/auth/drive
https://www.googleapis.com/auth/userinfo.profile
https://www.googleapis.com/auth/userinfo.email
```

## Étape 5: Récupérer les identifiants

Après avoir créé votre client OAuth2, vous obtiendrez :

- **Client ID** : `123456789-abcdefghijklmnop.apps.googleusercontent.com`
- **Client Secret** : `GOCSPX-abcdefghijklmnopqrstuvwxyz`

## Étape 6: Configurer l'environnement

1. Copiez le fichier `env.example` vers `.env.local`
2. Ajoutez vos identifiants Google :

```env
# Google Workspace OAuth2
GOOGLE_CLIENT_ID="votre-client-id-ici"
GOOGLE_CLIENT_SECRET="votre-client-secret-ici"
```

## Étape 7: Tester l'intégration

1. Démarrez votre serveur de développement :
   ```bash
   npm run dev
   ```

2. Allez sur `http://localhost:3000/dashboard`

3. Connectez-vous avec Google

4. Testez l'initialisation du hub Google Drive

## Fonctionnalités disponibles

### Hub Google Drive Corporate
- Création automatique d'un dossier principal pour l'entreprise
- Sous-dossiers organisés par catégorie :
  - Documents Légaux
  - Compliance
  - Factures & Paiements
  - Correspondance
  - Rapports Annuels

### Synchronisation Google Calendar
- Synchronisation automatique des tâches de compliance
- Création d'événements avec rappels
- Intégration avec Google Meet pour les consultations

### Documents Google Docs
- Création automatique de documents légaux
- Templates personnalisés
- Stockage organisé dans Google Drive

## Dépannage

### Erreur "Connexion Google requise"
- Vérifiez que les identifiants OAuth2 sont corrects
- Assurez-vous que les URIs de redirection sont configurés
- Vérifiez que les APIs sont activées

### Erreur "Token d'accès Google non disponible"
- L'utilisateur doit se reconnecter avec Google
- Vérifiez que les scopes sont correctement configurés

### Erreur "Impossible de créer le hub corporate"
- Vérifiez les permissions Google Drive
- Assurez-vous que l'utilisateur a accès à Google Drive

## Sécurité

### Bonnes pratiques
1. Ne jamais commiter les identifiants dans Git
2. Utiliser des variables d'environnement
3. Limiter les scopes aux minimums nécessaires
4. Surveiller l'utilisation des APIs

### Permissions recommandées
- Accès en lecture/écriture à Google Drive
- Accès en lecture/écriture à Google Calendar
- Accès en lecture/écriture à Google Docs

## Support

Pour toute question ou problème :
1. Vérifiez les logs du serveur
2. Consultez la documentation Google APIs
3. Contactez l'équipe de développement

## Ressources utiles

- [Google Cloud Console](https://console.cloud.google.com/)
- [Google APIs Documentation](https://developers.google.com/apis)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google Workspace APIs](https://developers.google.com/workspace) 