import { Link, Outlet } from "@tanstack/react-router";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b px-6 py-4 flex items-center gap-6">
        <h1 className="font-semibold text-lg">
          Lost & Found – Admin
        </h1>

        <nav className="flex gap-4 text-sm">
          <Link
            to="/admin/unverified"
            className="[&.active]:font-semibold"
          >
            Unverified
          </Link>

          <Link
            to="/admin/verified"
            className="[&.active]:font-semibold"
          >
            Verified
          </Link>
        </nav>
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
