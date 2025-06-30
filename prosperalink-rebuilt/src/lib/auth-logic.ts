// Fonctions pures de gestion des rôles et permissions

export const hasPermission = (userRole: string, requiredRole: string): boolean => {
  const roleHierarchy = {
    VISITOR: 0,
    CLIENT: 1,
    CONSULTANT: 2,
    ADMIN: 3
  };
  return (
    roleHierarchy[userRole as keyof typeof roleHierarchy] >=
    roleHierarchy[requiredRole as keyof typeof roleHierarchy]
  );
};

export const requireAuth = (role: string = "CLIENT") => {
  return (session: any) => {
    if (!session) return false;
    return hasPermission(session.user.role, role);
  };
};

export const isVisitor = (session: any) => !session;
export const isClient = (session: any) => session && hasPermission(session.user.role, "CLIENT");
export const isConsultant = (session: any) => session && hasPermission(session.user.role, "CONSULTANT");
export const isAdmin = (session: any) => session && hasPermission(session.user.role, "ADMIN");
export const isAI = (session: any) => session && (hasPermission(session.user.role, "ADMIN") || hasPermission(session.user.role, "CONSULTANT")); 