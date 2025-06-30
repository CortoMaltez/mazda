# ProsperaLink - Growth-as-a-Service

Votre écosystème de croissance américain. De la création d'entreprise à l'expansion mondiale, tout-en-un.

## 🚀 Vision Stratégique

ProsperaLink transforme la complexité administrative en avantage concurrentiel. Notre plateforme **Growth-as-a-Service** offre :

- **Formation LLC** : Création rapide et sécurisée
- **Banking US** : Compte bancaire américain intégré
- **Compliance** : Gestion automatisée de la conformité
- **Growth Tools** : Outils d'expansion internationale

## 🛠️ Stack Technique

- **Framework** : Next.js 15 avec App Router
- **Langage** : TypeScript
- **Styling** : Tailwind CSS + shadcn/ui
- **Composants** : Radix UI
- **Icons** : Lucide React
- **Base de données** : Prisma + SQLite
- **Authentification** : NextAuth.js
- **Paiements** : Stripe
- **Déploiement** : Vercel (recommandé)

## 📦 Installation

### 1. Cloner le repository
```bash
git clone [repository-url]
cd prosperalink-rebuilt
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
Créer un fichier `.env.local` dans le répertoire racine :

```env
# Database (SQLite for development)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-change-this-in-production"

# Stripe (get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"

# Email (optional - get from https://resend.com)
RESEND_API_KEY="your_resend_api_key"
```

### 4. Générer la clé NextAuth
```bash
openssl rand -base64 32
```
Copier la sortie et remplacer `your-nextauth-secret-key-change-this-in-production` dans `.env.local`

### 5. Obtenir les clés Stripe (Gratuit)
1. Aller sur https://dashboard.stripe.com/test/apikeys
2. Copier votre "Secret key" et "Publishable key"
3. Remplacer les valeurs dans `.env.local`

### 6. Initialiser la base de données
```bash
npx prisma generate
npx prisma db push
```

### 7. Démarrer l'application
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 🏗️ Architecture

```
src/
├── app/                    # App Router Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── ui/               # Composants shadcn/ui
│   ├── Hero.tsx          # Section héro
│   └── ...               # Autres composants
├── lib/                  # Utilitaires
│   ├── auth.ts           # Configuration NextAuth
│   ├── prisma.ts         # Client Prisma
│   ├── utils.ts          # Fonctions utilitaires
│   └── pricing-algorithm.ts # Algorithme de pricing
└── types/                # Types TypeScript
```

## 💰 Modèle de Tarification

Notre algorithme de pricing modulaire :

- **Formation LLC** : 497€
- **Banking US** : 197€
- **Compliance** : 297€
- **Growth Tools** : 397€

**Réductions automatiques :**
- 10% pour 400€+
- 15% pour 600€+
- 20% pour 800€+

**Facteurs d'État :**
- Delaware : 1.0x (référence)
- Wyoming : 0.9x (moins cher)
- Nevada : 1.1x (plus cher)
- Autres : 1.2x (sur mesure)

## 🎯 Fonctionnalités Clés

### Page d'Accueil
- Hero moderne avec proposition de valeur claire
- Section problèmes des entrepreneurs globaux
- Présentation de la solution Growth-as-a-Service
- Modules de services modulaires
- Calculateur de pricing interactif
- Témoignages clients
- FAQ interactive
- Section blog

### Système d'Authentification
- Inscription/Connexion sécurisée
- Sessions JWT
- Routes protégées
- Gestion des utilisateurs

### Dashboard Client
- Vue d'ensemble des entreprises
- Métriques de revenus et conformité
- Gestion des documents
- Notifications intelligentes

### Intégration Paiements
- Stripe pour les paiements
- Gestion des abonnements
- Historique des transactions

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Autres plateformes
L'application Next.js peut être déployée sur :
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 Scripts Disponibles

```bash
npm run dev      # Développement local
npm run build    # Build de production
npm run start    # Démarrer en production
npm run lint     # Linter ESLint
```

## 🔧 Configuration

### Variables d'Environnement
Créer un fichier `.env.local` avec les variables nécessaires (voir section Installation).

### Tailwind CSS
Configuration dans `tailwind.config.ts` avec :
- Couleurs personnalisées
- Animations
- Composants shadcn/ui

## 🎨 Personnalisation

### Couleurs
Modifier les variables CSS dans `src/app/globals.css` :

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... */
}
```

### Composants
Tous les composants sont dans `src/components/` et peuvent être facilement modifiés.

## 📱 Responsive Design

L'application est entièrement responsive avec :
- Mobile-first approach
- Breakpoints Tailwind
- Navigation mobile optimisée
- Composants adaptatifs

## 🔍 SEO

- Métadonnées optimisées
- Structure sémantique
- Performance optimisée
- Images optimisées

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

© 2024 ProsperaLink LLC. Tous droits réservés.

---

**ProsperaLink** - Transformez votre présence américaine en avantage concurrentiel. 