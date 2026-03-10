// ============================================================================
// USE ADMIN ITEMS HOOK
// ============================================================================
// Fetches all items for the admin dashboard
// Uses React Query for caching and automatic refetching

import { useQuery } from "@tanstack/react-query";
import { fetchAdminItems } from "@/api/admin.items.api";

/**
 * Fetches all items from the admin API
 * - Caches data using React Query (key: ['admin', 'items'])
 * - Automatically refetches when data becomes stale
 * - Handles loading and error states
 * 
 * @returns React Query hook result with:
 *   - data: Array of all admin items
 *   - isLoading: Whether data is currently fetching
 *   - isError: Whether an error occurred
 *   - error: Error object if failed
 * 
 * @example
 * const { data, isLoading } = useAdminItems()
 * if (isLoading) return <div>Loading...</div>
 * return <div>{data.length} items</div>
 */
export function useAdminItems() {
  return useQuery({
    // Unique key for this query (used for caching)
    queryKey: ["admin", "items"],
    // Function that fetches the data
    queryFn: fetchAdminItems,
  });
}
