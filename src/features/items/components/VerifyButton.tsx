import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

interface VerifyButtonProps {
  itemId: string;
  onVerify: (id: string) => void;
}

export default function VerifyButton({ itemId, onVerify }: VerifyButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // Simulate API delay
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
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Check className="w-3.5 h-3.5" />
      )}
      <span className="relative z-10">
        {loading ? "Verifying..." : "Verify Item"}
      </span>
    </button>
  );
}
