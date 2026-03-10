// ============================================================================
// ADMIN PAGE HEADER COMPONENT
// ============================================================================
// Consistent page header for admin dashboard sections
// Displays title, description, optional icon, and decorative line

import type { LucideIcon } from "lucide-react";

interface AdminPageHeaderProps {
  title: string; // Main page title
  description: string; // Subtitle or descriptive text
  icon?: LucideIcon; // Optional icon from lucide-react
}

/**
 * Displays a professional page header with title, description, and icon
 * Used at the top of each admin dashboard page
 * 
 * @param title - Main page title/heading
 * @param description - Descriptive text about the page
 * @param icon - Optional Lucide icon component to display beside title
 * @returns Header section with title, description, and decorative accents
 * 
 * @example
 * <AdminPageHeader
 *   title="Unverified Items"
 *   description="Items awaiting physical verification."
 *   icon={AlertCircle}
 * />
 */
export default function AdminPageHeader({ title, description, icon: Icon }: AdminPageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        {/* Optional icon */}
        {Icon && <Icon className="w-6 h-6 text-[#3ECF8E]" />}
        {/* Page title */}
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {title}
        </h1>
      </div>
      {/* Description text */}
      <p className="text-gray-400 text-sm max-w-2xl">
        {description}
      </p>
      {/* Decorative gradient line */}
      <div className="mt-6 h-px w-full bg-gradient-to-r from-[#3ECF8E]/20 to-transparent" />
    </div>
  );
}
