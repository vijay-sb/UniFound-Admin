import { useQuery } from "@tanstack/react-query";
import { fetchAdminItems } from "@/api/admin.items.api";

export function useAdminItems() {
  return useQuery({
    queryKey: ["admin", "items"],
    queryFn: fetchAdminItems,
  });
}
