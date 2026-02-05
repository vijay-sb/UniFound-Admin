import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 py-4 flex items-center gap-6">
        <h1 className="font-semibold text-lg">
          Lost & Found  Admin
        </h1>

        <nav className="flex gap-4 text-sm">
          <Link to="/admin/unverified">Unverified</Link>
          <Link to="/admin/verified">Verified</Link>
        </nav>
      </header>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
