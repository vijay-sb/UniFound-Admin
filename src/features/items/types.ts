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

