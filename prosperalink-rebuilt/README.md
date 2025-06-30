# ProsperaLink - Application de Formation d'Entreprises LLC

Application complète pour la formation d'entreprises LLC aux États-Unis, avec gestion des utilisateurs, entreprises, documents et paiements.

## 🚀 Fonctionnalités

### ✅ Implémentées
- **Authentification complète** avec NextAuth.js
- **Gestion des utilisateurs** (inscription, connexion, sessions)
- **CRUD des entreprises** (création, lecture, mise à jour, suppression)
- **Gestion des documents** (upload, stockage, récupération)
- **Système de paiement** avec Stripe
- **Dashboard interactif** avec statistiques en temps réel
- **Calculateur de prix** dynamique
- **Interface responsive** et moderne
- **Base de données** SQLite (prêt pour MySQL en production)

### 🔄 En cours de développement
- Notifications par email
- Gestion des rôles avancée
- Tests automatisés
- Déploiement automatisé

## 🛠️ Technologies utilisées

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Base de données**: Prisma ORM avec SQLite/MySQL
- **Authentification**: NextAuth.js
- **Paiements**: Stripe
- **UI Components**: Composants personnalisés

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Compte Stripe (pour les paiements)

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd prosperalink-rebuilt
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
Créer un fichier `.env.local` à la racine du projet :

```env
# Base de données
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (optionnel pour le développement)
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key_here"
```

4. **Initialiser la base de données**
```bash
npx prisma generate
npx prisma db push
```

5. **Lancer l'application**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 📁 Structure du projet

```
src/
├── app/                    # Pages et API routes Next.js
│   ├── api/               # API routes
│   │   ├── auth/          # Authentification
│   │   ├── companies/     # Gestion des entreprises
│   │   ├── documents/     # Gestion des documents
│   │   ├── payments/      # Gestion des paiements
│   │   └── webhooks/      # Webhooks Stripe
│   ├── auth/              # Pages d'authentification
│   ├── dashboard/         # Dashboard utilisateur
│   └── layout.tsx         # Layout principal
├── components/            # Composants React
│   ├── ui/               # Composants UI de base
│   └── layout/           # Composants de layout
├── lib/                  # Utilitaires et configurations
│   ├── auth.ts           # Configuration NextAuth
│   ├── prisma.ts         # Client Prisma
│   └── stripe.ts         # Configuration Stripe
└── types/                # Types TypeScript
```

## 🔧 Configuration

### Base de données

L'application utilise SQLite par défaut pour le développement. Pour la production avec MySQL :

1. Modifier `prisma/schema.prisma` :
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

2. Mettre à jour `DATABASE_URL` dans `.env.local` :
```env
DATABASE_URL="mysql://user:password@host:port/database"
```

### Stripe

1. Créer un compte sur [Stripe](https://stripe.com)
2. Récupérer les clés API dans le dashboard
3. Configurer les webhooks pour `/api/webhooks/stripe`

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests d'intégration
npm run test:integration

# Tests E2E
npm run test:e2e
```

## 📦 Déploiement

### Vercel (Recommandé)

1. Connecter le repository à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Autres plateformes

L'application peut être déployée sur :
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Sécurité

- Authentification sécurisée avec NextAuth.js
- Hachage des mots de passe avec bcrypt
- Protection CSRF
- Validation des données côté serveur
- Variables d'environnement sécurisées

## 📈 Monitoring

- Logs d'erreur automatiques
- Métriques de performance
- Monitoring des paiements Stripe

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation technique

## 🎯 Roadmap

- [ ] Intégration de notifications push
- [ ] Système de templates de documents
- [ ] API publique pour les partenaires
- [ ] Application mobile React Native
- [ ] Intelligence artificielle pour l'assistance
- [ ] Intégration multi-devises
- [ ] Système de parrainage
- [ ] Analytics avancés

---

**ProsperaLink** - Simplifiez la formation de votre entreprise LLC aux États-Unis 🚀
