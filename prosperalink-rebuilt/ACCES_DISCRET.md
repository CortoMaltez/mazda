# Accès Discret - ProsperaLink

## Vue d'ensemble

Le système d'accès discret permet aux administrateurs et consultants d'accéder rapidement aux outils de gestion sans interférer avec l'expérience utilisateur normale.

## Méthodes d'accès

### 1. Raccourcis Clavier

#### Accès Administrateur
- **Raccourci** : `Ctrl + Alt + A`
- **Code d'accès** : `admin2024`, `prospera_admin`, ou `superuser`
- **Redirection** : `/admin`

#### Accès Consultant
- **Raccourci** : `Ctrl + Alt + C`
- **Code d'accès** : `consultant2024`, `prospera_consultant`, ou `advisor`
- **Redirection** : `/consultant`

### 2. Zone Cliquable Discrète

- **Localisation** : Coin supérieur droit de l'écran (zone 20x20px)
- **Action** : Clic dans cette zone ouvre le panneau d'accès
- **Visibilité** : Invisible pour les utilisateurs normaux

### 3. Indicateurs Discrets

#### Afficher l'indicateur
- **Raccourci** : `Ctrl + Alt + I`
- **Bouton** : Petit bouton flottant en bas à gauche (œil)

#### Afficher les statistiques
- **Raccourci** : `Ctrl + Alt + S`
- **Contenu** : Statistiques système en temps réel

## Fonctionnalités

### Mode Administrateur
- Accès complet au système d'administration
- Gestion des utilisateurs
- Statistiques détaillées
- Configuration système
- Logs et monitoring

### Mode Consultant
- Outils de gestion client
- Suivi des dossiers LLC
- Communication avec les clients
- Rapports et analyses
- Support client

## Sécurité

### Codes d'accès
- Les codes sont temporaires et doivent être changés régulièrement
- Utilisation recommandée d'une authentification sécurisée en production
- Logs d'accès pour audit

### Recommandations
1. Changer les codes d'accès par défaut
2. Implémenter une authentification à deux facteurs
3. Limiter les tentatives de connexion
4. Surveiller les accès suspects

## Interface Utilisateur

### Indicateurs Visuels
- **Administrateur** : Point rouge + badge "ADMIN"
- **Consultant** : Point bleu + badge "CONSULTANT"
- **Mode discret** : Indicateur flottant en bas à gauche

### Panneau d'accès
- Interface moderne avec backdrop blur
- Champs de saisie sécurisés
- Boutons d'action clairs
- Instructions intégrées

## Développement

### Composants
- `DiscreetAccess.tsx` : Gestion de l'accès principal
- `DiscreetIndicator.tsx` : Indicateurs et statistiques
- Intégration dans `page.tsx`

### Personnalisation
- Modifier les codes d'accès dans `DiscreetAccess.tsx`
- Ajuster les raccourcis clavier
- Personnaliser l'interface utilisateur
- Ajouter de nouvelles fonctionnalités

## Support

Pour toute question concernant l'accès discret :
- Contactez l'équipe technique
- Consultez les logs d'accès
- Vérifiez les permissions utilisateur

---

**Note** : Ce système est conçu pour un usage interne et ne doit pas être exposé aux utilisateurs finaux. 