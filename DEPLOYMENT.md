# 🚀 Guide de Déploiement ProsperaLink

## 📋 Prérequis

- Compte Vercel (recommandé) ou autre plateforme de déploiement
- Variables d'environnement configurées
- Base de données de production (MySQL recommandé)

## 🔧 Configuration Vercel

### 1. Connexion du Repository
1. Connectez-vous à [Vercel](https://vercel.com)
2. Importez votre repository GitHub/GitLab
3. Sélectionnez le framework Next.js
4. Configurez les variables d'environnement

### 2. Variables d'Environnement Requises

```env
# Base de données
DATABASE_URL="mysql://user:password@host:port/database"

# NextAuth
NEXTAUTH_SECRET="your-production-secret-key"
NEXTAUTH_URL="https://your-domain.vercel.app"

# IA - Gemini
GOOGLE_GEMINI_API_KEY="your-gemini-api-key"

# Paiements - Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Réseaux sociaux (optionnel)
META_ACCESS_TOKEN="your-meta-access-token"
WHATSAPP_PHONE_NUMBER_ID="your-whatsapp-phone-number-id"
WHATSAPP_ACCESS_TOKEN="your-whatsapp-access-token"

# Email (optionnel)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### 3. Configuration de la Base de Données

#### Option 1: PlanetScale (Recommandé)
```bash
# Installer PlanetScale CLI
npm install -g pscale

# Créer une base de données
pscale database create prosperalink

# Obtenir l'URL de connexion
pscale connect prosperalink main
```

#### Option 2: Vercel Postgres
1. Créer une base de données Postgres dans Vercel
2. Utiliser l'URL fournie dans DATABASE_URL

### 4. Déploiement

```bash
# Déploiement automatique via Git
git push origin main

# Ou déploiement manuel
vercel --prod
```

## 🔍 Vérification Post-Déploiement

### 1. Tests de Fonctionnalité
- [ ] Page d'accueil accessible
- [ ] Authentification fonctionnelle
- [ ] Dashboard client opérationnel
- [ ] Panneau admin accessible
- [ ] API routes répondent correctement
- [ ] Paiements Stripe fonctionnels
- [ ] Services IA opérationnels

### 2. Monitoring
- Vérifier les logs Vercel
- Surveiller les performances
- Contrôler les coûts IA
- Tester les webhooks Stripe

### 3. Sécurité
- Vérifier les headers de sécurité
- Tester les permissions granulaires
- Valider l'encryption des données
- Contrôler l'accès admin

## 🚨 Dépannage

### Erreurs Courantes

#### Base de Données
```bash
# Réinitialiser la base de données
npx prisma db push --force-reset
npx prisma db seed
```

#### Variables d'Environnement
- Vérifier que toutes les variables sont définies
- Redéployer après modification des variables
- Utiliser les variables de production (pas de test)

#### Performance
- Optimiser les images
- Vérifier le bundle size
- Contrôler les requêtes API

## 📊 Analytics et Monitoring

### Vercel Analytics
- Activer Vercel Analytics
- Configurer les événements personnalisés
- Surveiller les métriques de performance

### Monitoring IA
- Surveiller les coûts Gemini API
- Optimiser les requêtes IA
- Configurer les alertes de budget

## 🔄 Mises à Jour

### Processus de Mise à Jour
1. Développer en local
2. Tester avec `npm run build`
3. Pousser vers Git
4. Vérifier le déploiement automatique
5. Tester en production
6. Monitorer les performances

### Rollback
```bash
# Revenir à une version précédente
vercel rollback
```

## 📞 Support

En cas de problème :
1. Consulter les logs Vercel
2. Vérifier la [documentation](./README.md)
3. Consulter le [guide de dépannage](./GUIDE_DEPANNAGE.md)
4. Contacter l'équipe de développement

---

**ProsperaLink** - Déploiement optimisé et sécurisé pour la production. 