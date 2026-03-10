// ============================================================================
// STATUS BADGE COMPONENT
// ============================================================================
// Displays colored badge showing item status with appropriate styling

import type { ItemStatus } from "../types";

interface StatusBadgeProps {
  status: ItemStatus; // Item status to display
}

/**
 * Maps each status to its corresponding color and styling
 * - UNVERIFIED: Yellow (needs admin review)
 * - VERIFIED: Green (confirmed legitimate)
 * - AVAILABLE: Blue (published for claims)
 * - CLAIMED: Gray (already claimed)
 * - REJECTED: Red (rejected by admin)
 */
const styles: Record<ItemStatus, string> = {
  UNVERIFIED: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  VERIFIED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  AVAILABLE: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  CLAIMED: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
};

/**
 * Displays item status with color-coded badge
 * Used in item cards to show current item state at a glance
 * 
 * @param status - Current status of the item
 * @returns Styled badge with status text
 * 
 * @example
 * <StatusBadge status="UNVERIFIED" /> // Shows yellow UNVERIFIED badge
 */
export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-0.5 rounded-full
        text-[10px] font-bold uppercase tracking-wider
        border
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}
