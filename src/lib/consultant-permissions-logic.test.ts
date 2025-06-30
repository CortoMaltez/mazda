import { hasConsultantPermissionMock, ConsultantPermission } from "./consultant-permissions-logic";

describe("Permissions granulaires consultant", () => {
  const permissions: ConsultantPermission[] = [
    { permission: "dashboard", canRead: true, canWrite: false, canDelete: false },
    { permission: "users", canRead: true, canWrite: true, canDelete: false },
    { permission: "companies", canRead: true, canWrite: false, canDelete: true },
  ];

  it("lecture autorisée si canRead", () => {
    expect(hasConsultantPermissionMock(permissions, "dashboard", "read")).toBe(true);
    expect(hasConsultantPermissionMock(permissions, "users", "read")).toBe(true);
    expect(hasConsultantPermissionMock(permissions, "companies", "read")).toBe(true);
  });

  it("écriture autorisée uniquement si canWrite", () => {
    expect(hasConsultantPermissionMock(permissions, "dashboard", "write")).toBe(false);
    expect(hasConsultantPermissionMock(permissions, "users", "write")).toBe(true);
    expect(hasConsultantPermissionMock(permissions, "companies", "write")).toBe(false);
  });

  it("suppression autorisée uniquement si canDelete", () => {
    expect(hasConsultantPermissionMock(permissions, "dashboard", "delete")).toBe(false);
    expect(hasConsultantPermissionMock(permissions, "users", "delete")).toBe(false);
    expect(hasConsultantPermissionMock(permissions, "companies", "delete")).toBe(true);
  });

  it("refus si la permission n'existe pas", () => {
    expect(hasConsultantPermissionMock(permissions, "analytics", "read")).toBe(false);
    expect(hasConsultantPermissionMock(permissions, "analytics", "write")).toBe(false);
    expect(hasConsultantPermissionMock(permissions, "analytics", "delete")).toBe(false);
  });
}); 