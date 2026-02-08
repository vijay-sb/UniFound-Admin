// src/api/admin.items.api.ts

import { apiRequest } from "./client";

/**
 * Admin Item (matches backend response exactly)
 */
export interface AdminItemDTO {
  id: string;
  type: "FOUND";
  status:
    | "UNVERIFIED"
    | "VERIFIED"
    | "AVAILABLE"
    | "CLAIMED"
    | "REJECTED";

  category: string;
  campus_zone: string;
  found_at: string;

  reported_by: string;
  created_at: string;
}

/**
 * Fetch ALL items for admin dashboard.
 * Admin filters by status on frontend.
 *
 * GET /api/admin/items
 * Auth: ADMIN | STAFF
 */
export function fetchAdminItems() {
  return apiRequest<AdminItemDTO[]>("/admin/items");
}

/**
 * Verify item after physical confirmation.
 * UNVERIFIED → VERIFIED
 *
 * POST /api/admin/items/:id/verify
 */
export interface VerifyItemResponse {
  item_id: string;
  status: "VERIFIED";
}

export function verifyItem(itemId: string) {
  return apiRequest<VerifyItemResponse>(
    `/admin/items/${itemId}/verify`,
    { method: "POST" }
  );
}

/**
 * Publish item for claims.
 * VERIFIED → AVAILABLE
 *
 * POST /api/admin/items/:id/publish
 */
export interface PublishItemResponse {
  item_id: string;
  status: "AVAILABLE";
}

export function publishItem(itemId: string) {
  return apiRequest<PublishItemResponse>(
    `/admin/items/${itemId}/publish`,
    { method: "POST" }
  );
}

/**
 * Secure image preview for admin.
 * Returns short-lived signed URL.
 *
 * GET /api/admin/items/:id/image
 */
export interface ItemImageResponse {
  image_url: string;
}

export function fetchItemImage(itemId: string) {
  return apiRequest<ItemImageResponse>(
    `/admin/items/${itemId}/image`
  );
}
