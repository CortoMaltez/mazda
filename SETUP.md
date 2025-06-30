# Configuration ProsperaLink

## Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Base de données
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# Google OAuth (optionnel)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe (pour les paiements)
STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="whsec_your-stripe-webhook-secret"

# Email (optionnel)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

## Installation et démarrage

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Configurer la base de données :**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Lancer l'application :**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur :**
   ```
   http://localhost:3000
   ```

## Configuration Google OAuth (optionnel)

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API Google+ 
4. Créez des identifiants OAuth 2.0
5. Ajoutez `http://localhost:3000/api/auth/callback/google` aux URIs de redirection autorisés
6. Copiez le Client ID et Client Secret dans votre fichier `.env.local`

## Configuration Stripe (optionnel)

1. Créez un compte sur [Stripe](https://stripe.com/)
2. Récupérez vos clés API dans le dashboard
3. Configurez les webhooks pour les événements de paiement
4. Ajoutez les clés dans votre fichier `.env.local`

## Structure de l'application

```
src/
├── app/                    # Pages Next.js 13+
│   ├── api/               # Routes API
│   ├── auth/              # Pages d'authentification
│   ├── dashboard/         # Pages du dashboard
│   └── layout.tsx         # Layout principal
├── components/            # Composants React
│   ├── ui/               # Composants UI de base
│   └── layout/           # Composants de layout
├── lib/                  # Utilitaires et configurations
└── types/                # Types TypeScript
```

## Fonctionnalités implémentées

- ✅ Landing page complète
- ✅ Système d'authentification (NextAuth)
- ✅ Dashboard utilisateur
- ✅ Calculateur de prix interactif
- ✅ Navigation responsive
- ✅ Base de données SQLite avec Prisma
- ✅ Interface utilisateur moderne (Tailwind CSS + shadcn/ui)

## Prochaines étapes

- [ ] Intégration Stripe pour les paiements
- [ ] Gestion des entreprises (CRUD)
- [ ] Système de documents
- [ ] Notifications par email
- [ ] API pour les formations d'entreprises
- [ ] Tests automatisés
- [ ] Déploiement en production

## Support

Pour toute question ou problème, consultez la documentation ou contactez l'équipe de développement. 