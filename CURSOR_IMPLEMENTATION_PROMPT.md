# Prompt Maître pour Cursor : Transformation ProsperaLink 2.0

## Mission Principale

Tu es chargé de transformer l'application ProsperaLink existante en suivant une nouvelle vision conceptuelle où le produit principal n'est pas juste un service de formation LLC, mais une **infrastructure de sérénité** pour les entrepreneurs globaux.

## Contexte de la Vision

ProsperaLink doit évoluer selon 4 cercles concentriques :
1. **Le Cœur Transactionnel** : L'offre ProsperaLink 360
2. **L'Écosystème de Services** : Services modulaires et flexibles
3. **La Plateforme Technologique** : API et intégrations
4. **Le Mouvement Culturel** : Communauté et éducation

## Changements Prioritaires à Implémenter

### 1. Transformation du Dashboard (PRIORITÉ HAUTE)

Le dashboard actuel dans `/src/app/dashboard` doit devenir un "Command Center" intelligent.

**Modifications requises :**

```typescript
// src/app/dashboard/page.tsx
// Remplacer le dashboard statique par un dashboard proactif qui :
// 1. Anticipe les besoins du client
// 2. Suggère des actions contextuelles
// 3. Affiche des insights personnalisés via Gemini

// Ajouter ces composants :
- <ComplianceHealthScore /> // Score visuel de santé de l'entreprise
- <AIInsights /> // Messages personnalisés de l'IA
- <NextStepsWidget /> // Actions suggérées basées sur le contexte
- <PersonalizedTimeline /> // Timeline interactive des échéances
```

### 2. Intégration IA Contextuelle (PRIORITÉ HAUTE)

L'IA Gemini ne doit pas être un chatbot isolé mais un assistant omniprésent.

**Créer un nouveau service :**

```typescript
// src/services/ai/ContextualAI.ts
export class ContextualAI {
  // Analyser le contexte utilisateur en temps réel
  async analyzeUserContext(userId: string, currentPage: string) {
    // Récupérer l'historique et l'état du client
    // Générer des suggestions contextuelles
    // Retourner des actions proactives
  }
  
  // Générer des messages personnalisés
  async generatePersonalizedMessage(context: Context) {
    // Utiliser Gemini pour créer des messages qui :
    // - Utilisent le prénom du client
    // - Référencent son historique spécifique
    // - Proposent des actions concrètes
  }
}
```

**Intégrer dans chaque page :**
- Document upload : "Je vois que vous uploadez un EIN. Voulez-vous que je vérifie sa validité ?"
- Paiement : "Basé sur votre activité, le forfait Wyoming semble optimal. Voici pourquoi..."
- Support : "J'ai préparé un résumé de votre situation pour accélérer la résolution."

### 3. Refonte de la Page d'Accueil

La page actuelle est trop longue et technique. La simplifier autour du concept de **sérénité**.

**Structure cible :**
```
Hero : "Votre LLC. Sans la Complexité."
     -> 3 chiffres clés : 997$/an | 0$ cachés | ∞ tranquillité
     
Problem : Une seule section courte sur l'anxiété de la conformité

Solution : Les 3 piliers en cards visuelles simples

Pricing : Calculateur transparent avec explication IA

CTA : "Commencez avec une consultation gratuite"
```

### 4. Système de Tarification Transparent

Implémenter l'algorithme de tarification avec transparence totale.

```typescript
// src/lib/pricing/PricingEngine.ts
export class TransparentPricingEngine {
  // Constantes
  private readonly FIXED_PROFIT = 500;
  private readonly AGENT_COST = 49;
  private readonly TAX_FILING_COST = 150;
  
  calculatePrice(state: string): PricingBreakdown {
    const stateFees = this.getStateFees(state);
    const annualCost = stateFees.annual + this.AGENT_COST + this.TAX_FILING_COST;
    const totalPrice = annualCost + this.FIXED_PROFIT;
    
    return {
      total: totalPrice,
      breakdown: {
        stateFees: stateFees.annual,
        agentFee: this.AGENT_COST,
        taxFiling: this.TAX_FILING_COST,
        prosperalinkFee: this.FIXED_PROFIT
      },
      savings: this.calculateSavingsVsCompetitors(totalPrice, state)
    };
  }
}
```

### 5. Services Modulaires

Transformer les services en modules autonomes pouvant être achetés séparément.

```typescript
// src/app/services/page.tsx
// Créer une nouvelle page de services avec :
// - Grille de services individuels
// - Prix transparent pour chaque service
// - Recommandations IA basées sur le profil client
// - Bundle "ProsperaLink 360" mis en avant comme meilleure valeur
```

### 6. Consultation "Pay What You Want"

Implémenter le système de réservation flexible.

```typescript
// src/components/Consultation/FlexibleBooking.tsx
// Créer un composant avec :
// - Slider pour choisir le montant (min 0.50$)
// - Intégration Stripe pour paiement variable
// - Redirection vers Calendly après paiement
// - Message expliquant la philosophie
```

### 7. API Publique (Phase 2)

Préparer l'architecture pour une API publique.

```typescript
// src/app/api/v1/
// Structure suggérée :
// - /api/v1/auth - Authentification partenaires
// - /api/v1/llc/formation - Endpoint de création
// - /api/v1/llc/status - Suivi en temps réel
// - /api/v1/webhooks - Notifications aux partenaires
```

### 8. Métriques et Analytics

Implémenter un système de tracking pour mesurer l'impact de la vision.

```typescript
// src/lib/analytics/VisionMetrics.ts
// Tracker :
// - Temps passé sur le portail
// - Interactions avec l'IA
// - Taux d'acceptation des suggestions
// - Parcours utilisateur complet
// - Revenue per customer
```

## Instructions Techniques

1. **Base de données** : Étendre le schéma Prisma pour supporter :
   - Contexte utilisateur pour l'IA
   - Services modulaires
   - Historique des interactions
   - Préférences personnalisées

2. **Sécurité** : Toutes les nouvelles fonctionnalités doivent :
   - Respecter les niveaux d'accès existants
   - Chiffrer les données sensibles
   - Logger les actions importantes

3. **Performance** : 
   - Utiliser le cache pour les suggestions IA
   - Lazy loading pour les composants lourds
   - Optimiser les appels Gemini

4. **UI/UX** :
   - Maintenir la cohérence avec le design system existant
   - Animations subtiles pour la sérénité
   - Mobile-first pour tous les nouveaux composants

## Questions à Me Poser

Avant d'implémenter chaque fonctionnalité, n'hésite pas à me demander :
- Des clarifications sur la vision
- Des exemples de copy/messaging
- Des décisions sur les priorités
- L'accès à des ressources spécifiques

## Ordre d'Implémentation Suggéré

1. **Semaine 1** : Dashboard intelligent + IA contextuelle
2. **Semaine 2** : Refonte page d'accueil + tarification transparente
3. **Semaine 3** : Services modulaires + consultation flexible
4. **Semaine 4** : API publique + métriques

## Ressources Disponibles

- Clé API Gemini : Déjà configurée dans le projet
- Intégration Stripe : Fonctionnelle
- Base de données : Prisma configuré
- Authentification : NextAuth opérationnel

## Philosophie de Code

Chaque ligne de code doit refléter la vision :
- **Simplicité** : Code clair et maintenable
- **Transparence** : Logique business explicite
- **Intelligence** : Utilisation judicieuse de l'IA
- **Sérénité** : Experience utilisateur fluide

Commence par analyser la structure actuelle dans `/archive` si nécessaire, puis implémente progressivement cette vision en gardant toutes les fonctionnalités existantes opérationnelles.