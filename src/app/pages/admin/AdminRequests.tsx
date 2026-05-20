import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Search, Filter, Trash2, MessageCircle, Mail, ChevronDown,
  X, Phone, Calendar, Tag, FileText, CheckCircle,
} from 'lucide-react';
import { getRequests, updateRequest, deleteRequest } from '../../lib/api';

interface Request {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  adminNote: string;
  userId: string | null;
}

const STATUSES = [
  { value: 'all',         label: 'All' },
  { value: 'pending',     label: 'Pending' },
  { value: 'accepted',    label: 'Accepted' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'delivered',   label: 'Delivered' },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  pending:     { label: 'Pending',     color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  accepted:    { label: 'Accepted',    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  in_progress: { label: 'In Progress', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  delivered:   { label: 'Delivered',   color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
};

export function AdminRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Request | null>(null);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const data = await getRequests(statusFilter, search);
      setRequests(data);
    } catch {
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [statusFilter, search]);

  const openDetail = (req: Request) => {
    setSelected(req);
    setNote(req.adminNote || '');
  };

  const handleStatusChange = async (id: string, status: string) => {
    await updateRequest(id, { status });
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : prev);
  };

  const handleSaveNote = async () => {
    if (!selected) return;
    setSaving(true);
    await updateRequest(selected.id, { adminNote: note });
    setRequests((prev) => prev.map((r) => r.id === selected.id ? { ...r, adminNote: note } : r));
    setSelected((prev) => prev ? { ...prev, adminNote: note } : prev);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this request?')) return;
    await deleteRequest(id);
    setRequests((prev) => prev.filter((r) => r.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Requests</h2>
        <p className="text-muted-foreground text-sm">Manage all incoming client requests.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button key={s.value} onClick={() => setStatusFilter(s.value)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                statusFilter === s.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border border-border text-muted-foreground hover:text-foreground'
              }`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-background rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Filter className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No requests found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Client</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Service</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <button onClick={() => openDetail(req)} className="text-left">
                        <div className="font-medium text-foreground hover:text-primary transition-colors">{req.name}</div>
                        <div className="text-xs text-muted-foreground">{req.email}</div>
                      </button>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                      {req.service || 'General'}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                        className={`px-2 py-1 rounded-lg text-xs font-medium border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 ${statusConfig[req.status]?.color}`}
                      >
                        {STATUSES.filter((s) => s.value !== 'all').map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground text-xs">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <a href={`https://wa.me/${req.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-green-100 hover:text-green-600 text-muted-foreground transition-colors"
                          title="WhatsApp">
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <a href={`mailto:${req.email}`}
                          className="p-1.5 rounded-lg hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
                          title="Email">
                          <Mail className="w-4 h-4" />
                        </a>
                        <button onClick={() => handleDelete(req.id)}
                          className="p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors"
                          title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setSelected(null)} />
          <div className="w-full max-w-md bg-background border-l border-border flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-background">
              <h3 className="font-semibold text-foreground">Request Detail</h3>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1">
              {/* Client info */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Client Information</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {selected.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{selected.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {selected.userId ? '✦ Registered user' : 'Guest submission'}
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-xl divide-y divide-border text-sm">
                  {selected.email && (
                    <div className="flex items-center gap-3 px-4 py-3">
                      <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground break-all">{selected.email}</span>
                    </div>
                  )}
                  {selected.phone && (
                    <div className="flex items-center gap-3 px-4 py-3">
                      <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground">{selected.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Tag className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">{selected.service || 'General Inquiry'}</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">
                      {new Date(selected.createdAt).toLocaleString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Message</h4>
                <div className="bg-secondary rounded-xl p-4 text-sm text-foreground leading-relaxed">
                  {selected.message}
                </div>
              </div>

              {/* Status */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Status</h4>
                <select
                  value={selected.status}
                  onChange={(e) => handleStatusChange(selected.id, e.target.value)}
                  className="w-full px-3 py-2.5 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                >
                  {STATUSES.filter((s) => s.value !== 'all').map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* Admin note */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Internal Note</h4>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={4}
                  placeholder="Add a private note about this request..."
                  className="w-full px-3 py-2.5 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                />
                <button onClick={handleSaveNote} disabled={saving}
                  className="mt-2 w-full py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Note'}
                </button>
              </div>

              {/* Reply actions */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Reply</h4>
                <div className="flex gap-2">
                  {selected.phone && (
                    <a href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition-colors">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                  )}
                  <a href={`mailto:${selected.email}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                    <Mail className="w-4 h-4" /> Email
                  </a>
                </div>
              </div>

              {/* Delete */}
              <button onClick={() => handleDelete(selected.id)}
                className="w-full py-2.5 border border-destructive/30 text-destructive rounded-xl text-sm font-medium hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" /> Delete Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

