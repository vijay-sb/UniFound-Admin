// src/api/admin.items.api.ts

import { apiRequest } from "./client";

export interface VerifyItemResponse {
  item_id: string;
  status: "VERIFIED";
}

/**
 * Verifies a found item after physical confirmation.
 * Moves item from UNVERIFIED → VERIFIED.
 *
 * Auth: ADMIN | STAFF
 */
export function verifyItem(itemId: string) {
  return apiRequest<VerifyItemResponse>(
    `/admin/items/verify/${itemId}`,
    {
      method: "POST",
    }
  );
}
