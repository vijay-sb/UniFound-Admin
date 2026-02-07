import { Link, useLocation } from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import { LogOut, LayoutDashboard, ShieldCheck, ListTodo, Menu, X } from "lucide-react";

interface ModernAdminLayoutProps {
  children: ReactNode;
}

export default function ModernAdminLayout({ children }: ModernAdminLayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

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
        /* Ensure the entire document background is dark to prevent white bars on scroll */
        :root, html, body { 
            background-color: #0a0a0a !important; 
            color: white !important;
            min-height: 100vh !important;
            overscroll-behavior-y: none; /* Prevent elastic bounce showing white/gray default background */
        }

        /* Hide strict global header based on its specific styling in Header.tsx */
        body > div > header.bg-gray-800.text-white.shadow-lg { display: none !important; }
        /* Also hide the aside menu if it exists directly */
        body > div > aside.fixed.top-0.left-0.bg-gray-900 { display: none !important; }
        /* Fallback: Hide any header that is NOT inside our layout */
        body > div > header:not(.admin-header) { display: none !important; }
        
        /* Hide TanStack Devtools Floating Button */
        .TanStackRouterDevtools,
        .tsqd-parent-container,
        button[aria-label="Open TanStack Router Devtools"],
        button[aria-label="Open React Query Devtools"],
        div[class*="TanStackDevtools"],
        div[class*="tanstack-query-devtools"],
        .tsqd-open-btn,
        #tanstack-query-devtools-button,
        [aria-label="Open TanStack Query Devtools"] { 
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            z-index: -9999 !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Aggressive JS removal of the devtools container
    const intervalId = setInterval(() => {
        const devtoolsElements = document.querySelectorAll(
            '.TanStackRouterDevtools, .tsqd-parent-container, [class*="TanStackDevtools"], [class*="tanstack-query-devtools"]'
        );
        devtoolsElements.forEach(el => el.remove());

        const buttons = document.querySelectorAll('button[aria-label*="Devtools"], button[aria-label*="TanStack"]');
        buttons.forEach(btn => btn.remove());
        
        const allDivs = document.querySelectorAll('body > div');
        allDivs.forEach(div => {
             const style = window.getComputedStyle(div);
             if (style.position === 'fixed' && style.bottom === '0px' && style.right === '0px' && parseInt(style.zIndex) > 50) {
                 if (div.innerHTML.includes('TanStack') || div.innerHTML.includes('svg')) {
                     (div as HTMLElement).style.display = 'none';
                 }
             }
        });

    }, 100);

    return () => {
      const style = document.getElementById(styleId);
      if (style) style.remove();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans selection:bg-emerald-500/30 flex flex-col md:flex-row">
        
        {/* Mobile Header */}
        <div className="md:hidden h-16 border-b border-white/5 flex items-center justify-between px-4 bg-[#0a0a0a] sticky top-0 z-50">
             <div className="flex items-center gap-2 text-emerald-400">
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-bold tracking-wider text-white">ADMIN<span className="text-emerald-500">PANEL</span></span>
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

        {/* Sidebar Navigation */}
        <aside 
            className={`
                fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:static md:h-screen md:border-r
            `}
        >
            {/* Logo Area (Desktop) */}
            <div className="h-16 hidden md:flex items-center px-6 border-b border-white/5">
                 <div className="flex items-center gap-2 text-emerald-400">
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="font-bold tracking-wider text-white">ADMIN<span className="text-emerald-500">PANEL</span></span>
                 </div>
            </div>

            {/* Navigation Linsk */}
            <nav className="flex-1 p-4 space-y-1 mt-4 md:mt-0">
                <Link 
                    to="/admin/unverified"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                        isActive('/admin/unverified') 
                        ? 'bg-[#3ECF8E]/10 text-[#3ECF8E]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <ListTodo className="w-4 h-4" />
                    Pending Items
                </Link>

                <Link 
                    to="/admin/verified"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                        isActive('/admin/verified') 
                        ? 'bg-[#3ECF8E]/10 text-[#3ECF8E]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <ShieldCheck className="w-4 h-4" />
                    Verified DB
                </Link>
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-white/5">
                <button 
                  onClick={() => {
                     // Mock logout
                     window.location.href = "/admin/login";
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 md:h-screen md:overflow-y-auto">
             {/* Top Bar (Desktop only mostly, but can be shared) */}
             <header className="admin-header h-16 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
                <div className="text-sm text-gray-500 hidden md:block">
                    System Status: <span className="text-emerald-500 font-mono">ONLINE</span>
                </div>
                {/* Mobile placeholder for alignment if needed, or just hide status on mobile */}
                <div className="md:hidden"></div>

                 <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs text-emerald-500 font-bold">
                    A
                </div>
             </header>

             {/* Page Content */}
             <div className="p-0">
                {children}
             </div>
        </main>
    </div>
  );
}
