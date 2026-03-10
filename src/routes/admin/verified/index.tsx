// ============================================================================
// ADMIN VERIFIED ITEMS ROUTE
// ============================================================================
// Route configuration for verified items dashboard
// Handles authentication guard and page rendering

import { createFileRoute } from "@tanstack/react-router";
import AdminVerifiedPage from "@/pages/admin/verified";

/**
File-based route configuration for verified items page
Route: /admin/verified
Protected: Yes (requires authentication via AdminGuard component)
*/
export const Route = createFileRoute("/admin/verified/")({
  component: AdminVerifiedPage,
});
