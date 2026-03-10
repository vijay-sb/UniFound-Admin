// ============================================================================
// USE ITEM SEARCH HOOK
// ============================================================================
// Manages item filtering and searching across categories, zones, and types
// Provides real-time filtering without server requests

import { useState, useMemo } from "react";
import type { AdminItem } from "@/features/items/types";

/**
 * Filter options for items
 * All filters default to "ALL" to show everything
 */
export interface ItemFilters {
  category: string; // Filter by item category
  campusZone: string; // Filter by campus location
  type: string; // Filter by type (LOST/FOUND)
}

/**
 * Provides search and filtering functionality for items
 * - Text search across multiple fields
 * - Filter by category, campus zone, and type
 * - Extracts available categories and zones from items
 * - All filtering happens on the frontend (no API calls)
 * 
 * @param items - Array of items to search/filter (defaults to empty)
 * @returns Object with:
 *   - searchQuery: Current search text
 *   - setSearchQuery: Update search text
 *   - filters: Current filter selections
 *   - setFilters: Update filters
 *   - filteredItems: Items matching search/filters
 *   - availableCategories: Unique categories from items
 *   - availableZones: Unique campus zones from items
 * 
 * @example
 * const {
 *   searchQuery, setSearchQuery,
 *   filters, setFilters,
 *   filteredItems,
 *   availableCategories, availableZones
 * } = useItemSearch(itemsFromAPI)
 */
export function useItemSearch(items: AdminItem[] = []) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<ItemFilters>({
    category: "ALL",
    campusZone: "ALL",
    type: "ALL",
  });

  // Extract unique categories from items and sort alphabetically
  const uniqueCategories = useMemo(() => {
    const categories = new Set(items.map((i) => i.category));
    return Array.from(categories).sort();
  }, [items]);

  // Extract unique campus zones from items and sort alphabetically
  const uniqueZones = useMemo(() => {
    const zones = new Set(items.map((i) => i.campusZone));
    return Array.from(zones).sort();
  }, [items]);

  // Filter items based on search query and active filters
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. TEXT SEARCH: Match search query against multiple fields
      const lowerQuery = searchQuery.toLowerCase();
      const searchableText = [
        item.category,
        item.campusZone,
        item.type,
        item.status,
        item.reportedBy,
        item.id,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !searchQuery.trim() || searchableText.includes(lowerQuery);

      // 2. CATEGORY FILTER: Match selected category
      const matchesCategory =
        filters.category === "ALL" || item.category === filters.category;

      // 3. ZONE FILTER: Match selected campus zone
      const matchesZone =
        filters.campusZone === "ALL" || item.campusZone === filters.campusZone;

      // 4. TYPE FILTER: Match selected type (LOST/FOUND)
      const matchesType =
        filters.type === "ALL" || item.type === filters.type;

      // Return true only if ALL conditions are met
      return matchesSearch && matchesCategory && matchesZone && matchesType;
    });
  }, [items, searchQuery, filters]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredItems,
    availableCategories: uniqueCategories,
    availableZones: uniqueZones,
  };
}
