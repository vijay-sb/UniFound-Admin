import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAdminClaims, approveClaim } from "@/api/admin.claims.api";
import AdminGuard from "@/components/AdminGuard";
import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import QrScannerModal from "@/features/items/components/QrScannerModal";
import {
  Loader2,
  ClipboardList,
  CheckCircle,
  AlertTriangle,
  Clock,
  XCircle,
  Eye,
} from "lucide-react";

const STATUS_TABS = [
  { value: "", label: "All Claims", icon: ClipboardList },
  { value: "PENDING", label: "Pending", icon: Clock },
  { value: "MANUAL_REVIEW", label: "Manual Review", icon: Eye },
  { value: "APPROVED", label: "Approved", icon: CheckCircle },
  { value: "REJECTED", label: "Rejected", icon: XCircle },
];

const STATUS_BADGE: Record<string, string> = {
  PENDING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  MANUAL_REVIEW: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  APPROVED: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  REJECTED: "bg-red-500/20 text-red-400 border-red-500/30",
};

function formatTime(ts: string): string {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffHour / 24);
  if (diffHour < 1) return "< 1h ago";
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return d.toLocaleDateString();
}

function getConfidenceColor(score: number | null): string {
  if (score === null) return "text-gray-500";
  if (score >= 80) return "text-emerald-400";
  if (score >= 40) return "text-yellow-400";
  return "text-red-400";
}

function truncateId(id: string): string {
  return id.length > 8 ? `${id.slice(0, 8)}…` : id;
}

export default function AdminClaimsPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const queryClient = useQueryClient();

  const {
    data: claims,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminClaims", statusFilter],
    queryFn: () => fetchAdminClaims(statusFilter || undefined),
  });

  const approvalMutation = useMutation({
    mutationFn: approveClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminClaims"] });
    },
  });

  const manualReviewCount =
    claims?.filter((c) => c.status === "MANUAL_REVIEW").length ?? 0;

  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <AdminGuard>
      <ModernAdminLayout>
        <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-emerald-400" />
            Claims Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage student item claims
          </p>
        </div>
        <div className="flex items-center gap-3">
          {manualReviewCount > 0 && (
            <div className="px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-medium animate-pulse">
              {manualReviewCount} need{manualReviewCount === 1 ? "s" : ""} review
            </div>
          )}
          <button
            onClick={() => setIsScannerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black rounded-lg text-sm font-semibold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/10"
          >
            <CheckCircle className="w-4 h-4" />
            Scan to Handover
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                statusFilter === tab.value
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex flex-col items-center py-16 gap-2">
          <AlertTriangle className="w-8 h-8 text-red-400" />
          <p className="text-sm text-red-400">Failed to load claims</p>
        </div>
      )}

      {/* Claims Table */}
      {claims && claims.length > 0 && (
        <div className="border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-left">
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Zone</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">
                  Confidence
                </th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">
                  Claim ID
                </th>
                <th className="px-4 py-3 font-medium text-right">Date</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {claims.map((claim) => (
                <tr
                  key={claim.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 text-white font-medium">
                    {claim.category}
                  </td>
                  <td className="px-4 py-3 text-gray-300">{claim.campusZone}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                        STATUS_BADGE[claim.status] ??
                        "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {claim.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={`font-mono text-sm font-medium ${getConfidenceColor(
                        claim.confidenceScore
                      )}`}
                    >
                      {claim.confidenceScore !== null
                        ? `${claim.confidenceScore}%`
                        : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500 hidden md:table-cell">
                    {truncateId(claim.id)}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500 text-xs">
                    {formatTime(claim.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {claim.status === "MANUAL_REVIEW" && (
                      <button
                        onClick={() => approvalMutation.mutate(claim.id)}
                        disabled={approvalMutation.isPending}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium hover:bg-emerald-500/30 transition-colors disabled:opacity-50 flex items-center gap-1.5 ml-auto"
                      >
                        {approvalMutation.isPending ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <CheckCircle className="w-3 h-3" />
                        )}
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty state */}
      {claims && claims.length === 0 && (
        <div className="text-center py-16">
          <ClipboardList className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            No claims found
            {statusFilter ? ` with status "${statusFilter.replace("_", " ")}"` : ""}.
          </p>
        </div>
      )}

      {/* QR Scanner Modal */}
      <QrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onHandoverComplete={() => {
          queryClient.invalidateQueries({ queryKey: ["adminClaims"] });
        }}
      />
    </div>
      </ModernAdminLayout>
    </AdminGuard>
  );
}
