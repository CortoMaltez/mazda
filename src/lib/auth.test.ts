import { hasPermission, requireAuth, isAdmin, isConsultant, isClient, isVisitor } from "./auth-logic";

describe("Gestion des rôles et permissions", () => {
  it("hasPermission - hiérarchie correcte", () => {
    expect(hasPermission("ADMIN", "CLIENT")).toBe(true);
    expect(hasPermission("CONSULTANT", "CLIENT")).toBe(true);
    expect(hasPermission("CLIENT", "CONSULTANT")).toBe(false);
    expect(hasPermission("VISITOR", "CLIENT")).toBe(false);
  });

  it("requireAuth - session et rôle", () => {
    const session = { user: { role: "ADMIN" } };
    expect(requireAuth("CLIENT")(session)).toBe(true);
    expect(requireAuth("ADMIN")(session)).toBe(true);
    expect(requireAuth("ADMIN")(null)).toBe(false);
  });

  it("isAdmin, isConsultant, isClient, isVisitor", () => {
    const adminSession = { user: { role: "ADMIN" } };
    const consultantSession = { user: { role: "CONSULTANT" } };
    const clientSession = { user: { role: "CLIENT" } };
    expect(isAdmin(adminSession)).toBe(true);
    expect(isConsultant(consultantSession)).toBe(true);
    expect(isClient(clientSession)).toBe(true);
    expect(isVisitor(null)).toBe(true);
  });

  // Les fonctions asynchrones canAccess et hasConsultantPermission nécessitent un mock de Prisma
  // On les testera dans un fichier séparé avec un mock de la base si besoin
}); 