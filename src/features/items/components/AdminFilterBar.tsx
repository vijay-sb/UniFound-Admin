import { Filter, MapPin, Tag, Box } from "lucide-react";
import type { ItemFilters } from "@/features/items/hooks/useItemSearch";

interface AdminFilterBarProps {
  filters: ItemFilters;
  setFilters: (filters: ItemFilters) => void;
  categories: string[];
  zones: string[];
}

export default function AdminFilterBar({
  filters,
  setFilters,
  categories,
  zones,
}: AdminFilterBarProps) {
  const updateFilter = (key: keyof ItemFilters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2 text-sm text-gray-400 mr-2">
        <Filter className="w-4 h-4" />
        <span>Filters:</span>
      </div>

      {/* Category Filter */}
      <div className="relative">
        <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <select
          value={filters.category}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="h-10 pl-9 pr-8 bg-background/50 border border-white/10 rounded-md text-sm focus:border-[#3ECF8E]/50 focus:ring-1 focus:ring-[#3ECF8E]/50 outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors min-w-[140px]"
        >
          <option value="ALL">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Zone Filter */}
      <div className="relative">
        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <select
          value={filters.campusZone}
          onChange={(e) => updateFilter("campusZone", e.target.value)}
          className="h-10 pl-9 pr-8 bg-background/50 border border-white/10 rounded-md text-sm focus:border-[#3ECF8E]/50 focus:ring-1 focus:ring-[#3ECF8E]/50 outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors min-w-[140px]"
        >
          <option value="ALL">All Zones</option>
          {zones.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>

      {/* Type Filter */}
      <div className="relative">
        <Box className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <select
          value={filters.type}
          onChange={(e) => updateFilter("type", e.target.value)}
          className="h-10 pl-9 pr-8 bg-background/50 border border-white/10 rounded-md text-sm focus:border-[#3ECF8E]/50 focus:ring-1 focus:ring-[#3ECF8E]/50 outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors min-w-[120px]"
        >
          <option value="ALL">All Types</option>
          <option value="LOST">Lost</option>
          <option value="FOUND">Found</option>
        </select>
      </div>

      {/* Reset Button (only show if logic requires, but simple is better for now) */}
      {(filters.category !== "ALL" ||
        filters.campusZone !== "ALL" ||
        filters.type !== "ALL") && (
        <button
          onClick={() =>
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
