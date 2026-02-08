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


export type ItemStatus =
  | "UNVERIFIED"
  | "VERIFIED"
  | "AVAILABLE"
  | "CLAIMED"
  | "REJECTED";

export interface AdminItem {
  id: string;
  type: "FOUND";
  status: ItemStatus;
  category: string;
  campus_zone: string;
  found_at: string;
  reported_by: string;
  created_at: string;
}

