// ============================================================================
// ADMIN LOGIN ROUTE
// ============================================================================
// Route configuration for login page
// Imports and renders the admin login page component

import { createFileRoute } from "@tanstack/react-router";
import AdminLoginPage from "@/pages/admin/login";

/**
 * File-based route configuration for login page
 * Route: /admin/login
 * Protected: No (must be accessible without authentication)
 */
export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});
