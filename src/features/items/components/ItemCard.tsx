import { useState } from "react";
import { Calendar, MapPin, Tag, Image, X } from "lucide-react";
import StatusBadge from "./StatusBadge";
import VerifyButton from "./VerifyButton";
import { useItemImage } from "@/features/auth/hooks/useImage";
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
  const [zoomed, setZoomed] = useState(false);

  const {
    data: imageUrl,
    isLoading,
    isError,
  } = useItemImage(item.id, showImage);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <>
      {/* Item Card */}
      <div className="group relative overflow-hidden bg-[#0a0a0a]/40 backdrop-blur-md border border-white/5 rounded-xl hover:border-[#3ECF8E]/30 transition-all">
        <div className="relative p-5 flex flex-col sm:flex-row gap-4 justify-between">
          {/* Info */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <StatusBadge status={item.status} />
              <span className="text-xs text-gray-500 font-mono">
                #{item.id}
              </span>
            </div>

            <h3 className="text-lg font-medium text-white">
              {item.category}
            </h3>

            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                {item.campusZone}
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(item.foundAt.time)}
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

      {/* Enhanced Image Preview Modal */}
      {showImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h4 className="text-sm font-medium text-white">
                Image Preview
              </h4>
              <button
                onClick={() => {
                  setShowImage(false);
                  setZoomed(false);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              {isLoading && (
                <div className="text-gray-500">Loading image…</div>
              )}

              {isError && (
                <div className="text-red-400">Failed to load image</div>
              )}

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Item"
                  onClick={() => setZoomed(!zoomed)}
                  className={`
                    max-h-full max-w-full
                    transition-transform duration-300 ease-in-out
                    ${zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}
                  `}
                  draggable={false}
                />
              )}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 text-xs text-gray-500 border-t border-white/10 text-center">
              Click image to {zoomed ? "zoom out" : "zoom in"}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
