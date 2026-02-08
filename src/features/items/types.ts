// src/features/items/types.ts
export interface MockItem {
  id: string;
  type: "FOUND";
  status: "UNVERIFIED" | "VERIFIED" | "AVAILABLE";
  category: string;
  campus_zone: string;
  found_at: string;
  image_key?: string; // needed for preview
}
