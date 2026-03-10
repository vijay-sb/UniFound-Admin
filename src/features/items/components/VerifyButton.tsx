// ============================================================================
// VERIFY BUTTON COMPONENT
// ============================================================================
// Button for admins to verify unverified items
// Shows loading state with spinner during verification

import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

interface VerifyButtonProps {
  itemId: string; // ID of item to verify
  onVerify: (id: string) => void; // Callback when verify button is clicked
}

/**
 * Button for admins to verify an item as legitimate
 * - Shows loading spinner during verification
 * - Disables button while verifying
 * - Displays checkmark icon when ready
 * 
 * @param itemId - ID of the item being verified
 * @param onVerify - Callback function called with itemId when button clicked
 * @returns Styled button with loading state
 * 
 * @example
 * <VerifyButton
 *   itemId="item-123"
 *   onVerify={(id) => console.log('Verifying', id)}
 * />
 */
export default function VerifyButton({ itemId, onVerify }: VerifyButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // Simulate API delay for UX
    setTimeout(() => {
      onVerify(itemId);
      setLoading(false);
    }, 800);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="
        group relative overflow-hidden
        flex items-center gap-2 px-4 py-2
        bg-[#3ECF8E]/10 hover:bg-[#3ECF8E]/20
        border border-[#3ECF8E]/20 rounded-lg
        text-[#3ECF8E] text-xs font-semibold uppercase tracking-wider
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {loading ? (
        // Show spinner while loading
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        // Show checkmark when ready
        <Check className="w-3.5 h-3.5" />
      )}
      <span className="relative z-10">
        {loading ? "Verifying..." : "Verify Item"}
      </span>
    </button>
  );
}
