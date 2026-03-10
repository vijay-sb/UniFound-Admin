// ============================================================================
// ADMIN GUARD COMPONENT
// ============================================================================
// Protects routes by checking authentication
// Redirects unauthenticated users to login page

import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { isAuthenticated } from "@/lib/auth";

interface AdminGuardProps {
  children: ReactNode; // Protected content to render if authenticated
}

/**
 * Route guard that ensures user is authenticated before rendering content
 * If user is not authenticated, redirects to login page
 * 
 * @param children - Content to display if user is authenticated
 * @returns Either the protected content or redirect to login
 * 
 * @example
 * <AdminGuard>
 *   <AdminDashboard />
 * </AdminGuard>
 */
export default function AdminGuard({ children }: AdminGuardProps) {
  // Check if user has valid authentication token
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" />;
  }

  // Render protected content if authenticated
  return <>{children}</>;
}
