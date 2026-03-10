// ============================================================================
// ADMIN VERIFIED ITEM DETAIL ROUTE
// ============================================================================
// Route configuration for individual verified item page
// Allows admin to prepare items for user claims

import { createFileRoute } from "@tanstack/react-router";
import AdminVerifiedItemPage from "@/pages/admin/verified-item";

/**
File-based route configuration for item detail page
Route: /admin/verified/:itemId (dynamic route)
Parameters:
- itemId: ID of the verified item being prepared
Protected: Yes (requires authentication via AdminGuard component)
*/
export const Route = createFileRoute("/admin/verified/$itemId")
(
{
  component: AdminVerifiedItemPage,
});
