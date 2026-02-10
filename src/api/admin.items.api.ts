// src/api/admin.items.api.ts

import type { AdminItem, AdminItemDTO } from "@/features/items/types";
import { apiRequest } from "./client";

/**
 * Admin Item (matches backend response exactly)
 */

/**
 * Fetch ALL items for admin dashboard.
 * Admin filters by status on frontend.
 *
 * GET /api/admin/items
 * Auth: ADMIN | STAFF
 */
export async function fetchAdminItems(): Promise<AdminItem[]> {
  const data = await apiRequest<AdminItemDTO[]>("/admin/items");

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

export async function fetchItemImage(itemId: string): Promise<string> {
  const res = await apiRequest<{ image_key: string }>(
    `/admin/items/${itemId}/image`
  );
  return res.image_key;
}
