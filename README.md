# 🚀 ProsperaLink - Plateforme de Formation LLC avec IA

**ProsperaLink** est une plateforme révolutionnaire de formation d'entreprises LLC aux États-Unis, intégrant une IA avancée (Gemini) pour automatiser et optimiser tous les aspects du business.

## 🎯 Objectifs Business

- **ROI attendu**: 660%
- **Budget IA optimisé**: 15,000$/an
- **Taux de conversion**: >25%
- **Satisfaction client**: >95%

## 🏗️ Architecture Technique

### Stack Technologique
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Base de données**: SQLite (développement) / MySQL (production)
- **Authentification**: NextAuth.js
- **Paiements**: Stripe
- **IA**: Google Gemini API
- **Déploiement**: Vercel

### Structure des Niveaux d'Accès
1. **VISITOR** (0) - Accès public, consultation
2. **CLIENT** (1) - Dashboard, calculateur, services de base
3. **CONSULTANT** (2) - Permissions granulaires accordées par admin
4. **ADMIN** (3) - Accès complet, gestion des utilisateurs et permissions

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Google Cloud (pour Gemini API)
- Compte Stripe

### Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd mazda
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration des variables d'environnement**
```bash
cp env.example .env.local
```

Remplir les variables dans `.env.local` :
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_GEMINI_API_KEY="your-gemini-api-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
```

4. **Configuration de la base de données**
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

> **Note :** Par défaut, l'application démarre sur le port 3000. Si ce port est occupé, Next.js utilisera automatiquement le port 3001. Adaptez vos tests et accès en conséquence.

## 🤖 Services IA Intégrés

- **Assistant IA Avancé** - Recommandations personnalisées
- **Générateur de Contenu IA** - Posts réseaux sociaux, articles
- **Bot WhatsApp IA** - Réponses automatiques, qualification leads
- **Analyse Prédictive IA** - Prévisions de ventes, analyse marché
- **Optimiseur de Conversion IA** - A/B Testing automatique
- **Conseiller IA de Tarification** - Recommandations de prix

## 📊 Fonctionnalités Principales

- ✅ Page d'accueil moderne avec CTA
- ✅ Système d'authentification sécurisé
- ✅ Dashboard client avec calculateur de prix
- ✅ Panneau d'administration complet
- ✅ Espace consultant avec permissions granulaires
- ✅ API routes complètes
- ✅ Intégration Stripe pour les paiements
- ✅ Workflow de formation LLC automatisé
- ✅ Gestionnaire de coûts IA
- ✅ Analytics et reporting
- ✅ Tests automatisés

## 🔧 Scripts Utilitaires

```bash
# Vérifier le progrès du projet
npm run progress

# Mettre à jour la roadmap
npm run roadmap:update

# Tester l'application
npm run test

# Générer le client Prisma
npm run db:generate

# Pousser les changements de base de données
npm run db:push

# Seeder la base de données
npm run db:seed
```

## 📱 Déploiement

### Vercel (Recommandé)
1. Connecter le repository à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Autres plateformes
```bash
npm run build
npm start
```

## 🔐 Sécurité

- Chiffrement des données sensibles
- Conformité RGPD
- Sauvegarde automatique
- Accès sécurisé avec permissions granulaires
- Audit trail complet

> **Sécurité :** Ne jamais commit vos clés API ou secrets dans le repository. Utilisez toujours le fichier `.env.local` pour les variables sensibles.

## 📞 Support

Pour toute question ou support :
- Consulter la [Roadmap Consolidée](./ROADMAP_CONSOLIDATED.md)
- Vérifier les [logs de développement](./GUIDE_DEPANNAGE.md)
- Documentation technique : [DEPLOYMENT.md](./DEPLOYMENT.md)
- Contacter l'équipe de développement

## 📄 Licence

Ce projet est propriétaire et confidentiel.

---

**ProsperaLink** - La référence mondiale pour la formation d'entreprises LLC avec IA.
