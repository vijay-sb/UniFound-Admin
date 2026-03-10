// ============================================================================
// ADMIN UNVERIFIED ITEMS ROUTE
// ============================================================================
// Route configuration for unverified items dashboard
// Handles authentication guard and page rendering

import { createFileRoute } from "@tanstack/react-router";
import AdminUnverifiedPage from "@/pages/admin/unverified";

/**
File-based route configuration for unverified items page
Route: /admin/unverified
Protected: Yes (requires authentication via AdminGuard component)
*/
export const Route = createFileRoute("/admin/unverified")({
  component: AdminUnverifiedPage,
});
