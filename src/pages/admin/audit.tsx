import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import { ShieldCheck, User, Clock, Activity, FileText } from "lucide-react";
import { useAuditLogs } from "@/features/audit/hooks/useAuditLogs";
import type { AuditAction } from "@/features/audit/types";

// Helper function to format timestamp
const formatTime = (isoString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(isoString));
};

// Helper function to get badge styling based on action type
const getActionBadgeStyle = (action: AuditAction) => {
  switch (action) {
    case "VERIFIED_ITEM":
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    case "PUBLISHED_ITEM":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "REJECTED_ITEM":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "LOGIN":
    case "LOGOUT":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    default:
      return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  }
};

// Helper for formatting action display text
const formatActionText = (action: AuditAction) => {
  return action.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

export default function AdminAuditPage() {
  const { data: logs, isLoading } = useAuditLogs();

  return (
    <ModernAdminLayout>
      <div className="p-8">
        <AdminPageHeader
          title="Audit Log"
          description="Track system activity, item verifications, and admin actions."
          icon={ShieldCheck}
        />

        <div className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden mt-6">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-white/[0.02] text-xs font-medium text-gray-400 uppercase tracking-wider">
            <div className="col-span-3 flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> Admin
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" /> Action
            </div>
            <div className="col-span-4 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" /> Details
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> Timestamp
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="p-8 text-center text-gray-500">
              <div className="animate-spin w-6 h-6 border-2 border-[#3ECF8E] border-t-transparent rounded-full mx-auto mb-3"></div>
              Loading audit logs...
            </div>
          )}

          {/* Audit Logs List */}
          <div className="divide-y divide-white/5">
            {!isLoading && logs?.map((log) => (
              <div
                key={log.id}
                className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.01] transition-colors"
              >
                {/* Admin Name */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-300">
                    {log.adminName.charAt(0)}
                  </div>
                  <div className="text-sm font-medium text-gray-200">
                    {log.adminName}
                    <div className="text-xs text-gray-500 font-normal">
                      ID: {log.adminId}
                    </div>
                  </div>
                </div>

                {/* Action Badge */}
                <div className="col-span-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getActionBadgeStyle(
                      log.action
                    )}`}
                  >
                    {formatActionText(log.action)}
                  </span>
                </div>

                {/* Details / Item ID */}
                <div className="col-span-4 text-sm text-gray-400 pr-4">
                  {log.details ? (
                    <span>{log.details}</span>
                  ) : log.itemId ? (
                    <span className="font-mono text-xs">Item: {log.itemId}</span>
                  ) : (
                    <span className="italic opacity-50">No details provided</span>
                  )}
                </div>

                {/* Timestamp */}
                <div className="col-span-2 text-sm text-gray-500 whitespace-nowrap">
                  {formatTime(log.timestamp)}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {!isLoading && logs?.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                No audit logs found.
              </div>
            )}
          </div>
        </div>
      </div>
    </ModernAdminLayout>
  );
}
