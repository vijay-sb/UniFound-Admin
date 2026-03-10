// ============================================================================
// USE ITEM IMAGE HOOK
// ============================================================================
// Fetches item image URLs with conditional enabling
// Only fetches when explicitly requested by parent component

import { useQuery } from "@tanstack/react-query";
import { fetchItemImage } from "@/api/admin.items.api";

/**
 * Fetches a signed URL for viewing an item's image
 * - Only fetches when 'enabled' prop is true
 * - Useful for lazy-loading images (e.g., when user clicks preview button)
 * - Caches image URL using React Query
 * 
 * @param itemId - ID of the item to fetch image for
 * @param enabled - Whether to actually fetch the image (lazy loading)
 * @returns React Query hook result with:
 *   - data: Signed image URL
 *   - isLoading: Whether image URL is being fetched
 *   - isError: Whether fetch failed
 * 
 * @example
 * const [showImage, setShowImage] = useState(false)
 * const { data: imageUrl } = useItemImage(itemId, showImage)
 * if (showImage) return <img src={imageUrl} />
 */
export function useItemImage(itemId: string, enabled: boolean) {
  return useQuery({
    // Unique cache key including item ID (different items get separate cache entries)
    queryKey: ["admin", "items", itemId, "image"],
    // Function that fetches the signed image URL
    queryFn: () => fetchItemImage(itemId),
    // Only execute this query when enabled is true (lazy loading)
    enabled,
  });
}
