export type AuditAction =
  | 'VERIFIED_ITEM'
  | 'PUBLISHED_ITEM'
  | 'REJECTED_ITEM'
  | 'GENERATE_QUESTIONS'
  | 'PREPARE_ITEM'
  | 'CREATE_CLAIM'
  | 'SUBMIT_CLAIM_ANSWERS'
  | 'APPROVE_CLAIM'
  | 'HANDOVER_ITEM'
  | 'LOGIN'
  | 'LOGOUT'
  | 'UPDATED_SETTINGS';

// Backend response shape from GET /api/admin/logs
export interface AuditLogDTO {
  ID: string;
  ActorID: { UUID: string; Valid: boolean };
  Action: string;
  EntityType: string;
  EntityID: { UUID: string; Valid: boolean };
  Metadata: { RawMessage: Record<string, unknown> | null; Valid: boolean };
  CreatedAt: string;
}

// Normalized frontend shape
export interface AuditLog {
  id: string;
  actorId: string;
  action: AuditAction | string;
  entityType: string;
  entityId: string;
  metadata: Record<string, unknown> | null;
  timestamp: string;
}

// Map backend DTO to frontend type
export function mapAuditLogDTO(dto: AuditLogDTO): AuditLog {
  return {
    id: dto.ID,
    actorId: dto.ActorID?.Valid ? dto.ActorID.UUID : '',
    action: dto.Action,
    entityType: dto.EntityType,
    entityId: dto.EntityID?.Valid ? dto.EntityID.UUID : '',
    metadata: dto.Metadata?.Valid ? dto.Metadata.RawMessage : null,
    timestamp: dto.CreatedAt,
  };
}
