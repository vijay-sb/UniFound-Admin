import { apiRequest } from './client';

// Backend response shape for admin claims
export interface AdminClaimDTO {
  ID: string;
  ItemID: string;
  UserID: string;
  Status: string;
  ConfidenceScore: { Int32: number; Valid: boolean };
  CreatedAt: string;
  Category: string;
  CampusZone: string;
}

export interface AdminClaim {
  id: string;
  itemId: string;
  userId: string;
  status: string;
  confidenceScore: number | null;
  createdAt: string;
  category: string;
  campusZone: string;
}

function mapClaimDTO(dto: AdminClaimDTO): AdminClaim {
  return {
    id: dto.ID,
    itemId: dto.ItemID,
    userId: dto.UserID,
    status: dto.Status,
    confidenceScore: dto.ConfidenceScore?.Valid ? dto.ConfidenceScore.Int32 : null,
    createdAt: dto.CreatedAt,
    category: dto.Category,
    campusZone: dto.CampusZone,
  };
}

export async function fetchAdminClaims(status?: string): Promise<AdminClaim[]> {
  const endpoint = status
    ? `/admin/claims?status=${status}`
    : '/admin/claims';
  const dtos = await apiRequest<AdminClaimDTO[]>(endpoint);
  return (dtos || []).map(mapClaimDTO);
}

export async function approveClaim(claimId: string) {
  return apiRequest<{ claim_id: string; status: string; message: string }>(
    `/admin/claims/${claimId}/approve`,
    { method: 'POST' }
  );
}
