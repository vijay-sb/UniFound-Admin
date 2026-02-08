import { Link, useLocation,useNavigate } from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import {
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  ListTodo,
  Menu,
  X,
  CheckCircle,
} from "lucide-react";

interface ModernAdminLayoutProps {
  children: ReactNode;
}

export default function ModernAdminLayout({ children }: ModernAdminLayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

const handleLogout = () => {
  // Clear auth data
  localStorage.removeItem("access_token");
  localStorage.removeItem("token_expires_in");

  // Redirect to login
  navigate({
    to: "/admin/login",
    replace: true, // prevents back navigation
  });
};


  /**
   * IMPORTANT:
   * Use startsWith so parent routes stay active
   * e.g. /admin/verified/123 → /admin/verified stays highlighted
   */
  const isActive = (path: string) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  // Close sidebar on route change (mobile UX)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // HACK: Hide the global header defined in __root.tsx
  useEffect(() => {
    const styleId = "hide-global-header";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        :root, html, body { 
          background-color: #0a0a0a !important; 
          color: white !important;
          min-height: 100vh !important;
          overscroll-behavior-y: none;
        }

        body > div > header.bg-gray-800.text-white.shadow-lg { display: none !important; }
        body > div > aside.fixed.top-0.left-0.bg-gray-900 { display: none !important; }
        body > div > header:not(.admin-header) { display: none !important; }

        .TanStackRouterDevtools,
        .tsqd-parent-container,
        button[aria-label*="Devtools"],
        div[class*="TanStackDevtools"],
        div[class*="tanstack-query-devtools"] { 
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleId);
      if (style) style.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans selection:bg-emerald-500/30 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden h-16 border-b border-white/5 flex items-center justify-between px-4 bg-[#0a0a0a] sticky top-0 z-50">
        <div className="flex items-center gap-2 text-emerald-400">
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-bold tracking-wider text-white">
            ADMIN<span className="text-emerald-500">PANEL</span>
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-[#0a0a0a]
          flex flex-col transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:h-screen
        `}
      >
        {/* Logo */}
        <div className="h-16 hidden md:flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-2 text-emerald-400">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-bold tracking-wider text-white">
              ADMIN<span className="text-emerald-500">PANEL</span>
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 mt-4 md:mt-0">
          <Link
            to="/admin/unverified"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              isActive("/admin/unverified")
                ? "bg-[#3ECF8E]/10 text-[#3ECF8E]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ListTodo className="w-4 h-4" />
            Pending Items
          </Link>

          <Link
            to="/admin/verified"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              isActive("/admin/verified")
                ? "bg-[#3ECF8E]/10 text-[#3ECF8E]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Verified Items
          </Link>

          <Link
            to="/admin/available"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              isActive("/admin/available")
                ? "bg-[#3ECF8E]/10 text-[#3ECF8E]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            Available Items
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
           onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 md:h-screen md:overflow-y-auto">
        <header className="admin-header h-16 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
          <div className="text-sm text-gray-500 hidden md:block">
            System Status:{" "}
            <span className="text-emerald-500 font-mono">ONLINE</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs text-emerald-500 font-bold">
            A
          </div>
        </header>

        <div className="p-0">{children}</div>
      </main>
    </div>
  );
}
