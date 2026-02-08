import type { MockItem } from "../types";

interface StatusBadgeProps {
  status: MockItem["status"];
}

const styles: Record<
  MockItem["status"],
  string
> = {
  UNVERIFIED: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  VERIFIED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  AVAILABLE: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`
        px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}
