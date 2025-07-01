import { prisma } from "./prisma";
import { UserRole } from "@prisma/client";

// ========================================
// HIÉRARCHIE DES RÔLES
// ========================================
const ROLE_HIERARCHY = {
  VISITOR: 0,
  CLIENT: 1,
  CONSULTANT: 2,
  ADMIN: 3
} as const;

// ========================================
// FONCTIONS DE VÉRIFICATION DES PERMISSIONS
// ========================================

/**
 * Vérifie si un utilisateur a les permissions requises
 */
export const hasPermission = (userRole: string, requiredRole: string): boolean => {
  return (
    ROLE_HIERARCHY[userRole as keyof typeof ROLE_HIERARCHY] >=
    ROLE_HIERARCHY[requiredRole as keyof typeof ROLE_HIERARCHY]
  );
};

/**
 * Crée une fonction de vérification d'authentification
 */
export const requireAuth = (role: string = "CLIENT") => {
  return (session: any) => {
    if (!session) return false;
    return hasPermission(session.user.role, role);
  };
};

/**
 * Vérifie les permissions granulaires pour les consultants
 */
export const hasConsultantPermission = async (
  userId: string, 
  permission: string, 
  action: 'read' | 'write' | 'delete' = 'read'
): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { consultantPermissions: true } as any,
  });

  if (!user || user.role !== UserRole.CONSULTANT) {
    return false;
  }

  const permissions = (user as any).consultantPermissions || [];
  const permissionRecord = permissions.find((p: any) => p.permission === permission);
  
  if (!permissionRecord) {
    return false;
  }

  switch (action) {
    case 'read':
      return permissionRecord.canRead;
    case 'write':
      return permissionRecord.canWrite;
    case 'delete':
      return permissionRecord.canDelete;
    default:
      return false;
  }
};

/**
 * Vérifie l'accès avec permissions granulaires
 */
export const canAccess = async (
  session: any, 
  permission: string, 
  action: 'read' | 'write' | 'delete' = 'read'
): Promise<boolean> => {
  if (!session) return false;
  
  // Les admins ont accès à tout
  if (session.user.role === 'ADMIN') return true;
  
  // Les consultants ont des permissions granulaires
  if (session.user.role === 'CONSULTANT') {
    return await hasConsultantPermission(session.user.id, permission, action);
  }
  
  // Les clients ont accès basique
  if (session.user.role === 'CLIENT') {
    return ['dashboard', 'calculator', 'companies'].includes(permission);
  }
  
  return false;
};

// ========================================
// FONCTIONS DE VÉRIFICATION DES RÔLES
// ========================================

export const isVisitor = (session: any) => !session;
export const isClient = (session: any) => session && hasPermission(session.user.role, "CLIENT");
export const isConsultant = (session: any) => session && hasPermission(session.user.role, "CONSULTANT");
export const isAdmin = (session: any) => session && hasPermission(session.user.role, "ADMIN");
export const isAI = (session: any) => session && (hasPermission(session.user.role, "ADMIN") || hasPermission(session.user.role, "CONSULTANT"));

// ========================================
// UTILITAIRES D'AUTHENTIFICATION
// ========================================

/**
 * Vérifie si un utilisateur peut accéder à une ressource spécifique
 */
export const canAccessResource = async (
  session: any,
  resourceType: string,
  resourceId?: string,
  action: 'read' | 'write' | 'delete' = 'read'
): Promise<boolean> => {
  if (!session) return false;

  // Les admins ont accès à tout
  if (session.user.role === 'ADMIN') return true;

  // Vérification spécifique par type de ressource
  switch (resourceType) {
    case 'company':
      if (resourceId) {
        // Vérifier que l'utilisateur possède cette entreprise
        const company = await prisma.company.findFirst({
          where: {
            id: resourceId,
            userId: session.user.id
          }
        });
        return !!company;
      }
      return canAccess(session, 'companies', action);
      
    case 'document':
      if (resourceId) {
        // Vérifier que l'utilisateur a accès à ce document
        const document = await prisma.document.findFirst({
          where: {
            id: resourceId,
            company: {
              userId: session.user.id
            }
          }
        });
        return !!document;
      }
      return canAccess(session, 'documents', action);
      
    case 'payment':
      if (resourceId) {
        // Vérifier que l'utilisateur a accès à ce paiement
        const payment = await prisma.payment.findFirst({
          where: {
            id: resourceId,
            company: {
              userId: session.user.id
            }
          }
        });
        return !!payment;
      }
      return canAccess(session, 'payments', action);
      
    default:
      return canAccess(session, resourceType, action);
  }
};

/**
 * Obtient les permissions d'un consultant
 */
export const getConsultantPermissions = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { consultantPermissions: true } as any,
  });

  if (!user || user.role !== UserRole.CONSULTANT) {
    return [];
  }

  return (user as any).consultantPermissions || [];
}; 