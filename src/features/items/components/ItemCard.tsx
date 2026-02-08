import { useState } from "react";
import { Calendar, MapPin, Tag, Image } from "lucide-react";
import StatusBadge from "./StatusBadge";
import VerifyButton from "./VerifyButton";
import type { AdminItem } from "../types";

interface ItemCardProps {
  item: AdminItem;
  onVerify?: (id: string) => void;
  showVerifyAction?: boolean;
}

export default function ItemCard({
  item,
  onVerify,
  showVerifyAction = false,
}: ItemCardProps) {
  const [showImage, setShowImage] = useState(false);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <>
      <div className="group relative overflow-hidden bg-[#0a0a0a]/40 backdrop-blur-md border border-white/5 rounded-xl hover:border-[#3ECF8E]/30 transition-all">
        <div className="relative p-5 flex flex-col sm:flex-row gap-4 justify-between">
          {/* Info */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <StatusBadge status={item.status} />
              <span className="text-xs text-gray-500 font-mono">#{item.id}</span>
            </div>

            <h3 className="text-lg font-medium text-white">
              {item.category}
            </h3>

            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                {item.campus_zone}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(item.found_at)}
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                {item.type.toLowerCase()}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 sm:items-end">
            <button
              onClick={() => setShowImage(true)}
              className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
            >
              <Image className="w-4 h-4" />
              Preview Image
            </button>

            {showVerifyAction && onVerify && item.status === "UNVERIFIED" && (
              <VerifyButton itemId={item.id} onVerify={onVerify} />
            )}
          </div>
        </div>
      </div>

      {/* Image Preview Modal (mock for now) */}
      {showImage && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 w-[320px]">
            <h4 className="text-sm font-medium mb-3 text-white">
              Image Preview
            </h4>

            <div className="h-48 bg-gray-800 flex items-center justify-center text-gray-500 text-sm rounded">
              Signed image URL (fetched on demand)
            </div>

            <button
              onClick={() => setShowImage(false)}
              className="mt-4 w-full border border-white/10 py-1 text-sm rounded hover:bg-white/5"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
