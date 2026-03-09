import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/client';
import { type AuditLogDTO, type AuditLog, mapAuditLogDTO } from '../types';

export function useAuditLogs(entityType?: string) {
  return useQuery<AuditLog[]>({
    queryKey: ['auditLogs', entityType],
    queryFn: async () => {
      const endpoint = entityType
        ? `/admin/logs?entity_type=${entityType}`
        : '/admin/logs';
      
      const dtos = await apiRequest<AuditLogDTO[]>(endpoint);
      return dtos.map(mapAuditLogDTO);
    },
  });
}
