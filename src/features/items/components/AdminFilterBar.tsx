// ============================================================================
// ADMIN FILTER BAR COMPONENT
// ============================================================================
// Dropdown filters for items by category, campus zone, and type
// Allows users to narrow down items based on multiple criteria

import { Filter, MapPin, Tag, Box } from "lucide-react";
import type { ItemFilters } from "@/features/items/hooks/useItemSearch";

interface AdminFilterBarProps {
  filters: ItemFilters; // Current filter selections
  setFilters: (filters: ItemFilters) => void; // Callback to update filters
  categories: string[]; // Available categories from items
  zones: string[]; // Available campus zones from items
}

/**
 * Filter controls for narrowing down items
 * - Filter by category (e.g., 'Laptop', 'Keys')
 * - Filter by campus zone (e.g., 'Library', 'Dorm')
* - Filter by type (LOST or FOUND)
 * - Reset button to clear all filters
 * 
 * @param filters - Current filter selections
 * @param setFilters - Callback to update filters
 * @param categories - Array of available categories
 * @param zones - Array of available campus zones
 * @returns Filter bar with dropdown controls
 * 
 * @example
 * const [filters, setFilters] = useState({ category: 'ALL', ... })
 * <AdminFilterBar
 *   filters={filters}
 *   setFilters={setFilters}
 *   categories={['Laptop', 'Keys', 'Phone']}
 *   zones={['Library', 'Dorm']}
 * />
 */
export default function AdminFilterBar({
  filters,
  setFilters,
  categories,
  zones,
}: AdminFilterBarProps) {
  /**
   * Updates a single filter while keeping others unchanged
   * @param key - Filter key to update (category, campusZone, or type)
   * @param value - New filter value
   */
  const updateFilter = (key: keyof ItemFilters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Filter Label */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mr-2">
        <Filter className="w-4 h-4" />
        <span>Filters:</span>
      </div>

      {/* CATEGORY FILTER */}
      <div className="relative">
        <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <select
          value={filters.category}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="h-10 pl-9 pr-8 bg-blue-950 border border-white/10 rounded-md text-sm focus:border-[#3ECF8E]/50 focus:ring-1 focus:ring-[#3ECF8E]/50 outline-none appearance-none cursor-pointer hover:bg-blue-900 transition-colors min-w-[140px]"
        >
          <option value="ALL">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* ZONE FILTER */}
      <div className="relative">
        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <select
          value={filters.campusZone}
          onChange={(e) => updateFilter("campusZone", e.target.value)}
          className="h-10 pl-9 pr-8 bg-blue-950 border border-white/10 rounded-md text-sm focus:border-[#3ECF8E]/50 focus:ring-1 focus:ring-[#3ECF8E]/50 outline-none appearance-none cursor-pointer hover:bg-blue-900 transition-colors min-w-[140px]"
        >
          <option value="ALL">All Zones</option>
          {zones.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>

      {/* TYPE FILTER (LOST/FOUND) */}
      <div className="relative">
        <Box className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <select
          value={filters.type}
          onChange={(e) => updateFilter("type", e.target.value)}
          className="h-10 pl-9 pr-8 bg-blue-950 border border-white/10 rounded-md text-sm focus:border-[#3ECF8E]/50 focus:ring-1 focus:ring-[#3ECF8E]/50 outline-none appearance-none cursor-pointer hover:bg-blue-900 transition-colors min-w-[120px]"
        >
          <option value="ALL">All Types</option>
          <option value="LOST">Lost</option>
          <option value="FOUND">Found</option>
        </select>
      </div>

      {/* RESET FILTERS BUTTON - only show if filters are active */}
      {(filters.category !== "ALL" ||
        filters.campusZone !== "ALL" ||
        filters.type !== "ALL") && (
        <button
          onClick={() =>
            // Reset all filters back to default "ALL"
            setFilters({ category: "ALL", campusZone: "ALL", type: "ALL" })
          }
          className="text-xs text-[#3ECF8E] hover:underline ml-2"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
