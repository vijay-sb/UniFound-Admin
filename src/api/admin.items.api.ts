// ============================================================================
// ADMIN ITEMS API
// ============================================================================
// API calls for managing lost & found items in the admin dashboard
// Handles fetching, verifying, publishing, and getting images

import type { AdminItem, AdminItemDTO } from "@/features/items/types";
import { apiRequest } from "./client";

// ============================================================================
// FETCH ALL ITEMS
// ============================================================================

/**
 * Fetches all items from the admin dashboard
 * Admin filters by status on the frontend
 * 
 * Endpoint: GET /api/admin/items
 * Auth: ADMIN | STAFF roles required
 * 
 * @returns Array of all items in the system
 */
export async function fetchAdminItems(): Promise<AdminItem[]> {
  // Get raw items from backend (backend returns PascalCase)
  const data = await apiRequest<AdminItemDTO[]>("/admin/items");

  // Transform from backend DTO (PascalCase) to frontend model (camelCase)
  return data.map((item) => ({
    id: item.ID,
    type: item.Type,
    status: item.Status,
    category: item.Category,
    campusZone: item.CampusZone,
    foundAt: {
      time: item.FoundAt.Time,
      valid: item.FoundAt.Valid,
    },
    reportedBy: item.ReportedBy,
    createdAt: item.CreatedAt,
  }));
}

// ============================================================================
// VERIFY ITEM
// ============================================================================

/**
 * Marks an item as verified after admin confirms it's legitimate
 * Transitions item status: UNVERIFIED → VERIFIED
 * 
 * Endpoint: POST /api/admin/items/:id/verify
 * Auth: ADMIN | STAFF roles required
 * 
 * @param itemId - ID of the item to verify
 * @returns Response with updated item status
 */
export interface VerifyItemResponse {
  item_id: string; // Item ID that was verified
  status: "VERIFIED"; // New status after verification
}

export function verifyItem(itemId: string) {
  return apiRequest<VerifyItemResponse>(
    `/admin/items/${itemId}/verify`,
    { method: "POST" }
  );
}

// ============================================================================
// PUBLISH ITEM
// ============================================================================

/**
 * Publishes an item for users to claim
 * Transitions item status: VERIFIED → AVAILABLE
 * Item becomes claimable after publishing
 * 
 * Endpoint: POST /api/admin/items/:id/publish
 * Auth: ADMIN | STAFF roles required
 * 
 * @param itemId - ID of the item to publish
 * @returns Response with updated item status
 */
export interface PublishItemResponse {
  item_id: string; // Item ID that was published
  status: "AVAILABLE"; // New status after publishing
}

export function publishItem(itemId: string) {
  return apiRequest<PublishItemResponse>(
    `/admin/items/${itemId}/publish`,
    { method: "POST" }
  );
}

// ============================================================================
// GET ITEM IMAGE
// ============================================================================

/**
 * Retrieves a secure, signed URL for viewing item image
 * URL is short-lived for security
 * 
 * Endpoint: GET /api/admin/items/:id/image
 * Auth: ADMIN | STAFF roles required
 * 
 * @param itemId - ID of the item
 * @returns Promise with signed image URL/key
 */
export interface ItemImageResponse {
  image_key: string; // Signed URL or image storage key
}

export async function fetchItemImage(itemId: string): Promise<string> {
  const res = await apiRequest<{ image_key: string }>(
    `/admin/items/${itemId}/image`
  );
  return res.image_key;
}
