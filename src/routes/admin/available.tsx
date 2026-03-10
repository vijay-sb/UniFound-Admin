// ============================================================================
// ADMIN AVAILABLE ITEMS ROUTE
// ============================================================================
// Route configuration for available items dashboard
// Shows items that are currently published and claimable by users

import { createFileRoute } from "@tanstack/react-router";
import AdminAvailablePage from "@/pages/admin/available";

/**
 * File-based route configuration for available items page
 * Route: /admin/available
 * Protected: Yes (requires authentication via AdminGuard component)
 */
export const Route = createFileRoute("/admin/available")({
  component: AdminAvailablePage,
});
