# 🔧 GUIDE DE DÉPANNAGE - PROSPERALINK

## 🚨 Problèmes Courants et Solutions

### 1. Erreur "Event handlers cannot be passed to Client Component props"

**Symptôme :**
```
Error: Event handlers cannot be passed to Client Component props.
<... isVisible={true} onToggle={function onToggle}>
```

**Cause :** Tentative de passer des fonctions depuis un composant serveur vers un composant client.

**Solution :** ✅ **RÉSOLU**
- Création de wrappers client (`DiscreetAccessWrapper.tsx`, `DiscreetIndicatorWrapper.tsx`)
- Gestion de l'état localement dans les composants client

**Vérification :**
```bash
npm run test
```

### 2. Serveur ne démarre pas

**Symptôme :**
```
Port 3000 is in use, using available port 3001 instead.
```

**Solution :**
```bash
# Arrêter le processus sur le port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Ou utiliser le port 3001
# L'application fonctionne sur http://localhost:3001
```

### 3. Erreur de dépendances manquantes

**Symptôme :**
```
Cannot find module './ui/progress'
```

**Solution :**
```bash
# Réinstaller les dépendances
npm install

# Vérifier les composants UI manquants
ls src/components/ui/
```

### 4. Erreur de clé API Gemini

**Symptôme :**
```
Assistant IA temporairement indisponible
```

**Solution :**
1. Créer le fichier `.env.local`
2. Ajouter votre clé API Gemini :
```
GOOGLE_GEMINI_API_KEY=your-api-key-here
```
3. Redémarrer le serveur

### 5. Erreur de base de données

**Symptôme :**
```
Error: P1001: Can't reach database server
```

**Solution :**
```bash
# Générer le client Prisma
npm run db:generate

# Pousser le schéma vers la base de données
npm run db:push

# Ou créer une nouvelle base de données
npx prisma db push --force-reset
```

---

## 🛠️ Commandes de Diagnostic

### Vérification Complète
```bash
# Test complet de l'application
npm run test

# Vérification du progrès
npm run progress

# Mise à jour de la roadmap
npm run roadmap:update
```

### Vérification des Fichiers Critiques
```bash
# Vérifier l'existence des fichiers
ls src/components/DiscreetAccessWrapper.tsx
ls src/components/DiscreetIndicatorWrapper.tsx
ls src/components/ui/progress.tsx
ls scripts/check-progress.js
```

### Vérification du Serveur
```bash
# Démarrer en mode développement
npm run dev

# Construire pour la production
npm run build

# Démarrer en mode production
npm run start
```

---

## 🔍 Diagnostic Automatique

### Script de Diagnostic
```bash
node scripts/test-app.js
```

Ce script vérifie automatiquement :
- ✅ Existence des fichiers critiques
- ✅ Configuration des scripts npm
- ✅ Fonctionnement des endpoints
- ✅ Connectivité du serveur

---

## 📊 Système de Suivi de Progrès

### Vérification du Progrès
```bash
npm run progress
```

**Résultat attendu :**
```
🔍 Vérification du progrès ProsperaLink...

📊 ARCHITECTURE (15%)
   Progrès: 100.0% (6/6)
   ✅ Next.js 15
   ✅ TypeScript
   ✅ Prisma ORM
   ✅ NextAuth.js
   ✅ Stripe
   ✅ Gemini API

📈 Progrès global: 75.5%
🏆 Statut: 🟡 BON
```

### Mise à Jour de la Roadmap
```bash
npm run roadmap:update
```

---

## 🎯 Accès aux Fonctionnalités

### Accès Discret
- **Admin** : `Ctrl + Alt + A`
- **Consultant** : `Ctrl + Alt + C`
- **Fermer** : `Échap`

### Interface Web
- **Page d'accueil** : http://localhost:3001
- **Panneau admin** : http://localhost:3001/admin
- **Espace consultant** : http://localhost:3001/consultant
- **Dashboard** : http://localhost:3001/dashboard

### API Endpoints
- **Progrès** : http://localhost:3001/api/progress
- **Utilisateurs** : http://localhost:3001/api/admin/users
- **Permissions** : http://localhost:3001/api/admin/permissions

---

## 🔧 Configuration Avancée

### Variables d'Environnement
Créer `.env.local` :
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3001"
GOOGLE_GEMINI_API_KEY="your-gemini-api-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
```

### Configuration Prisma
```bash
# Générer le client
npx prisma generate

# Appliquer les migrations
npx prisma db push

# Ouvrir Prisma Studio
npx prisma studio
```

---

## 🚀 Optimisation des Performances

### Mode Développement
```bash
npm run dev
```
- Hot reload activé
- Turbopack pour la compilation rapide
- Debugging facilité

### Mode Production
```bash
npm run build
npm run start
```
- Optimisation automatique
- Compression des assets
- Cache optimisé

---

## 📞 Support et Contact

### En Cas de Problème Persistant

1. **Vérifier les logs** :
   ```bash
   npm run dev 2>&1 | tee logs.txt
   ```

2. **Tester les composants** :
   ```bash
   npm run test
   ```

3. **Vérifier la configuration** :
   ```bash
   npm run progress
   ```

4. **Consulter la documentation** :
   - `SYSTEME_SUIVI_PROGRES.md`
   - `ACCES_DISCRET.md`
   - `ROADMAP.txt`

### Informations Système
- **Node.js** : Version 18+ recommandée
- **npm** : Version 8+ recommandée
- **Next.js** : Version 15.3.4
- **Base de données** : SQLite (développement)

---

## ✅ Checklist de Vérification

Avant de signaler un problème, vérifiez :

- [ ] Node.js et npm sont à jour
- [ ] Toutes les dépendances sont installées
- [ ] Le fichier `.env.local` existe
- [ ] La base de données est initialisée
- [ ] Le serveur démarre sans erreur
- [ ] Les tests passent (`npm run test`)
- [ ] Le progrès est vérifié (`npm run progress`)

---

*Guide de dépannage ProsperaLink - Version 1.6* 