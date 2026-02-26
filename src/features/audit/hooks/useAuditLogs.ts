import { useQuery } from '@tanstack/react-query';
import type { AuditLog } from '../types';

// Mock data to use until backend API is ready
const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log_1",
    adminId: "admin_123",
    adminName: "Niharika V",
    action: "VERIFIED_ITEM",
    itemId: "item_987",
    details: "Verified lost laptop",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: "log_2",
    adminId: "admin_456",
    adminName: "Vijay S",
    action: "PUBLISHED_ITEM",
    itemId: "item_654",
    details: "Published keys to blind feed",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
  },
  {
    id: "log_3",
    adminId: "admin_123",
    adminName: "Niharika V",
    action: "REJECTED_ITEM",
    itemId: "item_321",
    details: "Rejected spam report",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "log_4",
    adminId: "admin_456",
    adminName: "Vijay S",
    action: "LOGIN",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
  },
  {
    id: "log_5",
    adminId: "admin_123",
    adminName: "Niharika V",
    action: "UPDATED_SETTINGS",
    details: "Changed default claim expiration to 14 days",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
];

export function useAuditLogs() {
  return useQuery({
    queryKey: ['auditLogs'],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return MOCK_AUDIT_LOGS;
    },
  });
}
