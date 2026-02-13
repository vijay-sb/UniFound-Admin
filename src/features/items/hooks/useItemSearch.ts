import { useState, useMemo } from "react";
import type { AdminItem } from "@/features/items/types";

export interface ItemFilters {
  category: string;
  campusZone: string;
  type: string;
}

export function useItemSearch(items: AdminItem[] = []) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<ItemFilters>({
    category: "ALL",
    campusZone: "ALL",
    type: "ALL",
  });

  // Extract unique values for filters
  const uniqueCategories = useMemo(() => {
    const categories = new Set(items.map((i) => i.category));
    return Array.from(categories).sort();
  }, [items]);

  const uniqueZones = useMemo(() => {
    const zones = new Set(items.map((i) => i.campusZone));
    return Array.from(zones).sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Text Search
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

      // 2. Category Filter
      const matchesCategory =
        filters.category === "ALL" || item.category === filters.category;

      // 3. Zone Filter
      const matchesZone =
        filters.campusZone === "ALL" || item.campusZone === filters.campusZone;

      // 4. Type Filter
      const matchesType =
        filters.type === "ALL" || item.type === filters.type;

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
