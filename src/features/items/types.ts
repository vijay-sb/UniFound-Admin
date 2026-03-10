// ============================================================================
// ITEM TYPES AND INTERFACES
// ============================================================================
// Defines TypeScript types for lost & found items in the application

/**
 * Possible states of an item in the system
 * - UNVERIFIED: Admin hasn't verified the item yet
 * - VERIFIED: Admin verified the item is legitimate
 * - AVAILABLE: Published for users to claim
 * - CLAIMED: User has claimed the item
 * - REJECTED: Admin rejected the item
 */
export type ItemStatus =
  | "UNVERIFIED"
  | "VERIFIED"
  | "AVAILABLE"
  | "CLAIMED"
  | "REJECTED";

/**
 * Frontend model for Admin items
 * Uses camelCase naming convention
 * Transformed from backend's PascalCase format
 */
export type AdminItem = {
  id: string; // Unique item identifier
  type: "FOUND" | "LOST"; // Whether item was found or lost
  status: ItemStatus; // Current state of the item
  category: string; // Item category (e.g., 'Laptop', 'Keys')
  campusZone: string; // Campus location where found/lost
  foundAt: {
    time: string; // ISO timestamp when item was found/lost
    valid: boolean; // Whether the timestamp is valid
  };
  reportedBy: string; // Admin or user who reported the item
  createdAt: string; // ISO timestamp when report was created
};

/**
 * Backend Data Transfer Object (DTO) for items
 * Uses PascalCase naming convention matching Go backend
 * Directly maps from backend API responses
 */
export type AdminItemDTO = {
  ID: string;
  Type: "FOUND" | "LOST";
  Status: ItemStatus;
  Category: string;
  CampusZone: string;
  FoundAt: {
    Time: string;
    Valid: boolean;
  };
  ReportedBy: string;
  CreatedAt: string;
};

