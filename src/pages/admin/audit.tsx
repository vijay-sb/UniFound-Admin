import { useState } from "react";
import { useAuditLogs } from "@/features/audit/hooks/useAuditLogs";
import AdminGuard from "@/components/AdminGuard";
import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import { Loader2, ShieldCheck, ChevronDown, ChevronRight } from "lucide-react";

const ACTION_BADGES: Record<string, { label: string; color: string }> = {
  VERIFIED_ITEM: { label: "Verified", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  PUBLISHED_ITEM: { label: "Published", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  REJECTED_ITEM: { label: "Rejected", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  GENERATE_QUESTIONS: { label: "AI Questions", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  PREPARE_ITEM: { label: "Prepared", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  CREATE_CLAIM: { label: "Claim Created", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  SUBMIT_CLAIM_ANSWERS: { label: "Answers Submitted", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  APPROVE_CLAIM: { label: "Claim Approved", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  HANDOVER_ITEM: { label: "Handed Over", color: "bg-teal-500/20 text-teal-400 border-teal-500/30" },
  LOGIN: { label: "Login", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  LOGOUT: { label: "Logout", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
};

const ENTITY_FILTERS = [
  { value: "", label: "All Events" },
  { value: "item", label: "Items" },
  { value: "claim", label: "Claims" },
];

function formatTime(ts: string): string {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return d.toLocaleDateString();
}

function truncateId(id: string): string {
  if (!id || id.length < 8) return id || "—";
  return `${id.slice(0, 8)}…`;
}

export default function AuditPage() {
  const [entityFilter, setEntityFilter] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const { data: logs, isLoading, error } = useAuditLogs(entityFilter || undefined);

  return (
    <AdminGuard>
      <ModernAdminLayout>
        <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Audit Log
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track all actions across the system
          </p>
        </div>
      </div>

      {/* Entity Type Filter */}
      <div className="flex gap-2">
        {ENTITY_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setEntityFilter(f.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              entityFilter === f.value
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-16 text-red-400 text-sm">
          Failed to load audit logs. Please try again.
        </div>
      )}

      {/* Table */}
      {logs && logs.length > 0 && (
        <div className="border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-left">
                <th className="px-4 py-3 font-medium w-8"></th>
                <th className="px-4 py-3 font-medium">Action</th>
                <th className="px-4 py-3 font-medium">Entity</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Actor</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Entity ID</th>
                <th className="px-4 py-3 font-medium text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.map((log) => {
                const badge = ACTION_BADGES[log.action] ?? {
                  label: log.action,
                  color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
                };
                const isExpanded = expandedRow === log.id;
                const hasMetadata = log.metadata && Object.keys(log.metadata).length > 0;

                return (
                  <>
                    <tr
                      key={log.id}
                      className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => hasMetadata && setExpandedRow(isExpanded ? null : log.id)}
                    >
                      <td className="px-4 py-3 text-gray-500">
                        {hasMetadata ? (
                          isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )
                        ) : null}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border ${badge.color}`}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono text-gray-300 bg-white/5 px-2 py-0.5 rounded">
                          {log.entityType}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500 hidden md:table-cell">
                        {truncateId(log.actorId)}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500 hidden md:table-cell">
                        {truncateId(log.entityId)}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-500 text-xs">
                        {formatTime(log.timestamp)}
                      </td>
                    </tr>
                    {isExpanded && hasMetadata && (
                      <tr key={`${log.id}-meta`}>
                        <td colSpan={6} className="px-8 py-3 bg-white/[0.02]">
                          <div className="text-xs font-mono text-gray-400 space-y-1">
                            {Object.entries(log.metadata!).map(([k, v]) => (
                              <div key={k} className="flex gap-2">
                                <span className="text-gray-500">{k}:</span>
                                <span className="text-gray-300">
                                  {typeof v === "object" ? JSON.stringify(v) : String(v)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {logs && logs.length === 0 && (
        <div className="text-center py-16 text-gray-500 text-sm">
          No audit logs found{entityFilter ? ` for entity type "${entityFilter}"` : ""}.
        </div>
      )}
    </div>
      </ModernAdminLayout>
    </AdminGuard>
  );
}
