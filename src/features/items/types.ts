// src/features/items/types.ts

export type ItemType = "FOUND" | "LOST";

export type ItemStatus = "UNVERIFIED" | "VERIFIED" | "RETURNED";

/**
 * Base item shape used in admin panel.
 * Private fields are intentionally excluded.
 */
export interface Item {
  id: string;
  type: string; // broadened for mock data flexibility
  status: ItemStatus;
  category: string;
  campus_zone: string;
  found_at: string; // ISO 8601
}

export type MockItem = Item;
