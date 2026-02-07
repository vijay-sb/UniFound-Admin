import { Calendar, MapPin, Tag } from "lucide-react";
import StatusBadge from "./StatusBadge";
import VerifyButton from "./VerifyButton";
import type { MockItem } from "../types";

interface ItemCardProps {
  item: MockItem;
  onVerify?: (id: string) => void;
  showVerifyAction?: boolean;
}

export default function ItemCard({ item, onVerify, showVerifyAction = false }: ItemCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="
      group relative overflow-hidden
      bg-[#0a0a0a]/40 backdrop-blur-md
      border border-white/5 rounded-xl
      hover:border-[#3ECF8E]/30 hover:bg-[#0a0a0a]/60
      transition-all duration-300
    ">
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3ECF8E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Side: Info */}
        <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
                <StatusBadge status={item.status} />
                <span className="text-xs text-gray-500 font-mono">#{item.id}</span>
            </div>
            
            <h3 className="text-lg font-medium text-white group-hover:text-[#3ECF8E] transition-colors">
                {item.category}
            </h3>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-600" />
                    <span>{item.campus_zone}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-600" />
                    <span>{formatDate(item.found_at)}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-gray-600" />
                    <span className="capitalize">{item.type.toLowerCase()}</span>
                </div>
            </div>
        </div>

        {/* Right Side: Actions */}
        {showVerifyAction && onVerify && (
          <div className="sm:pl-6 sm:border-l sm:border-white/5 flex items-center justify-end">
            <VerifyButton itemId={item.id} onVerify={onVerify} />
          </div>
        )}
      </div>
    </div>
  );
}
