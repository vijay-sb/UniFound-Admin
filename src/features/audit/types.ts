export type AuditAction = 
  | 'VERIFIED_ITEM'
  | 'PUBLISHED_ITEM'
  | 'REJECTED_ITEM'
  | 'LOGIN'
  | 'LOGOUT'
  | 'UPDATED_SETTINGS';

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: AuditAction;
  itemId?: string;
  details?: string;
  timestamp: string;
}
