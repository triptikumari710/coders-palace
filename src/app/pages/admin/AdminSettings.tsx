import { useState } from 'react';
import { Lock, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { changePassword } from '../../lib/api';

export function AdminSettings() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [show, setShow] = useState({ current: false, next: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.next !== form.confirm) {
      setError('New passwords do not match');
      return;
    }
    if (form.next.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await changePassword(form.current, form.next);
      setSuccess(true);
      setForm({ current: '', next: '', confirm: '' });
    } catch {
      setError('Current password is incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-lg">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Settings</h2>
        <p className="text-muted-foreground text-sm">Manage your admin account.</p>
      </div>

      <div className="bg-background rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Change Password</h3>
            <p className="text-sm text-muted-foreground">Update your admin login password</p>
          </div>
        </div>

        {success && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-xl mb-4 text-sm">
            <CheckCircle className="w-4 h-4" /> Password updated successfully
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: 'current', label: 'Current Password', showKey: 'current' as const },
            { key: 'next',    label: 'New Password',     showKey: 'next' as const },
            { key: 'confirm', label: 'Confirm New Password', showKey: 'next' as const },
          ].map(({ key, label, showKey }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
              <div className="relative">
                <input
                  type={show[showKey] ? 'text' : 'password'}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required
                  className="w-full px-4 pr-10 py-3 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  placeholder="••••••••"
                />
                {(key === 'current' || key === 'next') && (
                  <button type="button"
                    onClick={() => setShow((s) => ({ ...s, [showKey]: !s[showKey] }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {show[showKey] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          ))}

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">{error}</p>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-60">
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Info card */}
      <div className="bg-background rounded-2xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">Admin Info</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Username</span>
            <span className="font-medium text-foreground">admin</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">API Server</span>
            <span className="font-medium text-foreground">localhost:4000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Session</span>
            <span className="font-medium text-green-600">Active (8h)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

