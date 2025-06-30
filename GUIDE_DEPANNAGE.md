# 🔧 Guide de Dépannage ProsperaLink

## 🚨 Problèmes Courants

### 1. Erreur de Base de Données

**Symptôme**: `Error: P1001: Can't reach database server`

**Solution**:
```bash
# Vérifier la configuration
npx prisma db push

# Si problème persiste, recréer la base
rm -rf prisma/dev.db
npx prisma db push
npx prisma db seed
```

### 2. Erreur d'Authentification

**Symptôme**: `Error: Invalid credentials`

**Solution**:
```bash
# Vérifier les variables d'environnement
cat .env.local

# Redémarrer le serveur
npm run dev
```

### 3. Erreur IA Gemini

**Symptôme**: `Error: API key not found`

**Solution**:
1. Vérifier `GOOGLE_GEMINI_API_KEY` dans `.env.local`
2. Tester l'API : `curl -H "Authorization: Bearer YOUR_KEY" https://generativelanguage.googleapis.com/v1beta/models`

### 4. Erreur Stripe

**Symptôme**: `Error: Invalid API key provided`

**Solution**:
1. Vérifier les clés Stripe dans `.env.local`
2. Utiliser les clés de test pour le développement
3. Configurer les webhooks

## 🔍 Diagnostic

### Vérifier l'état du projet
```bash
npm run progress
```

### Tester l'application
```bash
npm run test
```

### Vérifier les logs
```bash
# Logs Next.js
npm run dev

# Logs Prisma
npx prisma studio
```

## 🛠️ Maintenance

### Nettoyage du cache
```bash
# Nettoyer Next.js
rm -rf .next
npm run dev

# Nettoyer Prisma
npx prisma generate
```

### Mise à jour des dépendances
```bash
npm update
npm audit fix
```

### Optimisation de la base de données
```bash
npx prisma db push
npx prisma generate
```

## 📊 Monitoring

### Métriques importantes
- Temps de réponse API
- Utilisation mémoire
- Erreurs 500
- Coûts IA (limite: 15,000$/an)

### Alertes automatiques
- Dépassement budget IA
- Erreurs critiques
- Performance dégradée

## 🆘 Support Urgent

1. **Vérifier les logs** dans la console
2. **Tester les endpoints** API
3. **Vérifier la base de données** avec Prisma Studio
4. **Contacter l'équipe** avec les logs d'erreur

---

**Note**: Ce guide couvre les problèmes les plus courants. Pour des cas spécifiques, consulter la documentation technique complète. 