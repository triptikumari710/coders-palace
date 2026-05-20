import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Inbox, Clock, CheckCircle, Rocket, Package, ArrowRight } from 'lucide-react';
import { getStats, getRequests } from '../../lib/api';

interface Stats {
  total: number;
  pending: number;
  accepted: number;
  inProgress: number;
  delivered: number;
}

interface Request {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  createdAt: string;
  adminNote: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  pending:     { label: 'Pending',     color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  accepted:    { label: 'Accepted',    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  in_progress: { label: 'In Progress', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  delivered:   { label: 'Delivered',   color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
};

export function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getStats(), getRequests()])
      .then(([s, r]) => {
        setStats(s);
        setRecent(r.slice(0, 5));
      })
      .catch(() => navigate('/admin/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const statCards = [
    { label: 'Total Requests', value: stats?.total ?? 0, icon: <Inbox className="w-6 h-6" />, color: 'from-primary to-accent' },
    { label: 'Pending',        value: stats?.pending ?? 0, icon: <Clock className="w-6 h-6" />, color: 'from-yellow-400 to-orange-400' },
    { label: 'In Progress',    value: stats?.inProgress ?? 0, icon: <Rocket className="w-6 h-6" />, color: 'from-purple-500 to-primary' },
    { label: 'Delivered',      value: stats?.delivered ?? 0, icon: <Package className="w-6 h-6" />, color: 'from-green-500 to-emerald-400' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Overview</h2>
        <p className="text-muted-foreground text-sm">Here's what's happening with your requests.</p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-background rounded-2xl border border-border p-6 flex items-center gap-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
              {card.icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              <div className="text-sm text-muted-foreground">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent requests */}
      <div className="bg-background rounded-2xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Recent Requests</h3>
          <button onClick={() => navigate('/admin/requests')}
            className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {recent.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Inbox className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No requests yet. Share your contact page!</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recent.map((req) => (
              <div key={req.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-secondary/50 transition-colors">
                <div className="min-w-0">
                  <div className="font-medium text-foreground truncate">{req.name}</div>
                  <div className="text-sm text-muted-foreground truncate">{req.service || 'General Inquiry'} · {req.email}</div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[req.status]?.color}`}>
                    {statusConfig[req.status]?.label ?? req.status}
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

