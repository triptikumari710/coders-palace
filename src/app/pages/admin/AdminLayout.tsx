import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { LayoutDashboard, Inbox, LogOut, Settings, Menu, X, FolderOpen, Sun, Moon } from 'lucide-react';
import { adminLogout, isLoggedIn } from '../../lib/api';
import { useTheme } from '../../hooks/useTheme';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Requests',  path: '/admin/requests',  icon: <Inbox className="w-5 h-5" /> },
  { label: 'Projects',  path: '/admin/projects',  icon: <FolderOpen className="w-5 h-5" /> },
  { label: 'Settings',  path: '/admin/settings',  icon: <Settings className="w-5 h-5" /> },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    if (!isLoggedIn()) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>

        {/* Brand */}
        <div className="h-24 flex items-center gap-3 px-4 border-b border-border">
          <img
            src={isDark ? '/src/assets/logo.png' : '/src/assets/logo1.png'}
            alt="Coders Palace"
            className="h-16 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              (e.currentTarget.nextElementSibling as HTMLElement)?.classList.remove('hidden');
            }}
          />
          <div className="hidden w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">CP</span>
          </div>
          <div className="text-xs text-muted-foreground">Admin Panel</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-border space-y-1">
          <button
            onClick={toggle}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-24 bg-background border-b border-border flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block">
            <h1 className="text-sm font-semibold text-foreground">
              {navItems.find((n) => n.path === location.pathname)?.label ?? 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="text-sm text-muted-foreground hidden sm:block">admin</div>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
