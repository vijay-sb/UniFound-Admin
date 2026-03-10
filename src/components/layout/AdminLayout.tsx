// ============================================================================
// BASIC ADMIN LAYOUT COMPONENT
// ============================================================================
// Simple header-based layout for admin pages
// Provides navigation between Unverified and Verified items

import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode; // Page content to render
}

/**
 * Basic layout wrapper for admin pages
 * Includes:
 * - Header with site title
 * - Navigation links to main sections
 * - Content area
 * 
 * @param children - Page content to render in main area
 * @returns Layout with header, navigation, and content
 * 
 * @example
 * <AdminLayout>
 *   <AdminPageContent />
 * </AdminLayout>
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="border-b px-6 py-4 flex items-center gap-6">
        {/* Site Title */}
        <h1 className="font-semibold text-lg">
          Lost & Found  Admin
        </h1>

        {/* Navigation Links */}
        <nav className="flex gap-4 text-sm">
          <Link to="/admin/unverified">Unverified</Link>
          <Link to="/admin/verified">Verified</Link>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
