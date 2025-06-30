// Logique pure pour vérifier les permissions d'un consultant

export interface ConsultantPermission {
  permission: string;
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
}

export function hasConsultantPermissionMock(
  permissions: ConsultantPermission[],
  permission: string,
  action: 'read' | 'write' | 'delete' = 'read'
): boolean {
  const permissionRecord = permissions.find(p => p.permission === permission);
  if (!permissionRecord) return false;
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
} 