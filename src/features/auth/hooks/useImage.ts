import { useQuery } from "@tanstack/react-query";
import { fetchItemImage } from "@/api/admin.items.api";

export function useItemImage(itemId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["admin", "items", itemId, "image"],
    queryFn: () => fetchItemImage(itemId),
    enabled, // 👈 important
  });
}
