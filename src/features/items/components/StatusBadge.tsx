import type { ItemStatus } from "../types";

interface StatusBadgeProps {
  status: ItemStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    UNVERIFIED: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    VERIFIED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    RETURNED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  return (
    <span className={`
      px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border
      ${styles[status] || "bg-gray-500/10 text-gray-500 border-gray-500/20"}
    `}>
      {status}
    </span>
  );
}
