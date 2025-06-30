# Structure des Niveaux d'Accès - ProsperaLink

## Vue d'ensemble

L'application ProsperaLink utilise un système de contrôle d'accès à 4 niveaux avec des permissions granulaires pour les consultants.

## Hiérarchie des Rôles

### 1. VISITOR (Visiteur)
- **Niveau**: 0
- **Accès**: Public
- **Fonctionnalités**:
  - Consultation de la page d'accueil
  - Accès aux informations publiques
  - Inscription et connexion

### 2. CLIENT (Client)
- **Niveau**: 1
- **Accès**: Authentifié
- **Fonctionnalités**:
  - Dashboard personnel
  - Calculateur de prix
  - Gestion de ses entreprises
  - Accès à ses documents et paiements

### 3. CONSULTANT (Consultant)
- **Niveau**: 2
- **Accès**: Authentifié + Permissions granulaires
- **Fonctionnalités**:
  - Accès selon les permissions accordées par l'admin
  - Permissions possibles:
    - `dashboard`: Accès au dashboard
    - `users`: Gestion des utilisateurs
    - `companies`: Gestion des entreprises
    - `payments`: Gestion des paiements
    - `documents`: Gestion des documents
    - `analytics`: Accès aux analytics
  - Actions possibles par permission:
    - `canRead`: Lecture
    - `canWrite`: Écriture/Modification
    - `canDelete`: Suppression

### 4. ADMIN (Administrateur)
- **Niveau**: 3
- **Accès**: Complet
- **Fonctionnalités**:
  - Accès à toutes les fonctionnalités
  - Gestion des utilisateurs
  - Attribution des permissions aux consultants
  - Analytics et statistiques
  - Configuration système

## Structure de la Base de Données

### Modèle User
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      UserRole @default(VISITOR)
  // ... autres champs
  
  // Relations pour les permissions
  consultantPermissions ConsultantPermission[] @relation("ConsultantPermissions")
  grantedPermissions ConsultantPermission[] @relation("AdminGrantedPermissions")
}
```

### Modèle ConsultantPermission
```prisma
model ConsultantPermission {
  id          String   @id @default(cuid())
  consultantId String
  grantedBy   String   // admin user ID
  permission  String   // nom de la permission
  canRead     Boolean  @default(false)
  canWrite    Boolean  @default(false)
  canDelete   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  consultant User @relation("ConsultantPermissions", fields: [consultantId], references: [id])
  admin      User @relation("AdminGrantedPermissions", fields: [grantedBy], references: [id])
}
```

## Routes et Accès

### Routes Publiques (VISITOR+)
- `/` - Page d'accueil
- `/auth/signin` - Connexion
- `/auth/signup` - Inscription

### Routes Client (CLIENT+)
- `/dashboard` - Dashboard client
- `/dashboard/calculator` - Calculateur de prix

### Routes Consultant (CONSULTANT+ avec permissions)
- `/consultant` - Espace consultant
- `/consultant/users` - Si permission "users"
- `/consultant/companies` - Si permission "companies"
- `/consultant/payments` - Si permission "payments"
- `/consultant/documents` - Si permission "documents"
- `/consultant/analytics` - Si permission "analytics"

### Routes Admin (ADMIN seulement)
- `/admin` - Panneau d'administration
- `/admin/users` - Gestion des utilisateurs
- `/admin/permissions` - Gestion des permissions

## API Routes

### Admin Routes
- `GET /api/admin/users` - Liste des utilisateurs
- `PATCH /api/admin/users/[id]` - Mise à jour du rôle d'un utilisateur
- `GET /api/admin/permissions` - Liste des permissions
- `POST /api/admin/permissions` - Création/Modification de permissions

### Consultant Routes
- `GET /api/consultant/permissions` - Permissions du consultant connecté

## Fonctions de Vérification

### Vérification des Rôles
```typescript
import { isVisitor, isClient, isConsultant, isAdmin } from "@/lib/auth";

// Vérification simple
if (isAdmin(session)) {
  // Accès admin
}

// Vérification hiérarchique
if (hasPermission(session.user.role, "CONSULTANT")) {
  // Accès consultant ou supérieur
}
```

### Vérification des Permissions Granulaires
```typescript
import { canAccess } from "@/lib/auth";

// Vérification avec permissions granulaires
const canReadUsers = await canAccess(session, "users", "read");
const canWriteCompanies = await canAccess(session, "companies", "write");
```

## Workflow d'Attribution des Permissions

1. **Création d'un Consultant**:
   - L'admin change le rôle d'un utilisateur en "CONSULTANT"

2. **Attribution des Permissions**:
   - L'admin accède au panneau d'administration
   - Sélectionne le consultant
   - Choisit les permissions à accorder
   - Définit les niveaux d'accès (lecture/écriture/suppression)

3. **Utilisation des Permissions**:
   - Le consultant se connecte
   - L'application vérifie ses permissions
   - Affiche uniquement les fonctionnalités autorisées

## Sécurité

### Middleware
- Vérification automatique des permissions au niveau des routes
- Redirection automatique selon le niveau d'accès

### Validation
- Vérification côté serveur de toutes les permissions
- Protection contre l'élévation de privilèges
- Validation des données d'entrée

### Audit
- Traçabilité des permissions accordées
- Historique des modifications de rôles
- Logs des actions administratives

## Interface Utilisateur

### Navigation Adaptative
- Affichage des menus selon le rôle
- Indication visuelle du niveau d'accès
- Boutons d'action conditionnels

### Messages d'Information
- Notifications de permissions insuffisantes
- Guide d'utilisation selon le niveau
- Support pour demander des permissions

## Maintenance

### Gestion des Permissions
- Interface d'administration intuitive
- Attribution en lot possible
- Templates de permissions prédéfinis

### Monitoring
- Dashboard des permissions actives
- Statistiques d'utilisation
- Alertes de sécurité

Cette structure garantit une séparation claire des responsabilités tout en permettant une flexibilité maximale dans l'attribution des accès selon les besoins de l'organisation. 