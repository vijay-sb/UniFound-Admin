// src/api/admin.items.api.ts

import type { AdminItem, AdminItemDTO } from "@/features/items/types";
import { apiRequest } from "./client";

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


/**
 * Prepare item with questions and pickup location.
 * VERIFIED → AVAILABLE
 *
 * POST /api/admin/items/:id/prepare
 */
export interface PrepareItemRequest {
  questions: {
    question: string;
    options: string[];
    correct_option: string;
    is_negative: boolean;
  }[];
  pickup_location: string;
}

export interface PrepareItemResponse {
  item_id: string;
  status: "AVAILABLE";
  prepared_at: string;
}

export function prepareItem(itemId: string, body: PrepareItemRequest) {
  return apiRequest<PrepareItemResponse>(
    `/admin/items/${itemId}/prepare`,
    { method: "POST", body }
  );
}


/**
 * Generate AI questions for an item.
 *
 * POST /api/admin/items/:id/generate-questions
 */
export function generateItemQuestions(itemId: string) {
  return apiRequest<{
    item_id: string;
    ai_metadata: Record<string, unknown>;
    questions: {
      question: string;
      options: string[];
      correct_option: string;
      is_negative: boolean;
    }[];
  }>(`/admin/items/${itemId}/generate-questions`, { method: "POST" });
}


/**
 * Verify a QR code (pickup token).
 *
 * POST /api/admin/claims/verify-qr
 */
export interface VerifyQrResponse {
  valid: boolean;
  token_id: string;
  claim_id: string;
  item_id: string;
  user_id: string;
  category: string;
  campus_zone: string;
  pickup_location: string;
  confidence_score: number;
  expires_at: string;
}

export function verifyQrCode(tokenId: string) {
  return apiRequest<VerifyQrResponse>(
    "/admin/claims/verify-qr",
    { method: "POST", body: { token_id: tokenId } }
  );
}


/**
 * Hand over an item after QR verification.
 * Sets item status to CLAIMED.
 *
 * POST /api/admin/claims/:id/handover
 */
export interface HandoverResponse {
  claim_id: string;
  item_id: string;
  item_status: "CLAIMED";
  message: string;
}

export function handoverItem(claimId: string) {
  return apiRequest<HandoverResponse>(
    `/admin/claims/${claimId}/handover`,
    { method: "POST" }
  );
}
