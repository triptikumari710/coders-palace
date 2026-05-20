import { useState } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock, Phone } from 'lucide-react';
import { userLogin, userSignup } from '../lib/api';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
  defaultTab?: 'login' | 'signup';
}

export function AuthModal({ onClose, onSuccess, defaultTab = 'signup' }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (tab === 'signup' && form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (tab === 'signup' && form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      if (tab === 'signup') {
        await userSignup(form.name, form.email, form.password, form.phone);
      } else {
        await userLogin(form.email, form.password);
      }
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (t: 'login' | 'signup') => {
    setTab(t);
    setError('');
    setForm({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:4000/api/auth/google';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-background rounded-2xl border border-border shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground z-10">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-bold text-foreground mb-1">
            {tab === 'signup' ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {tab === 'signup'
              ? 'Sign up to send your project details and track progress.'
              : 'Log in to send a message and view your requests.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mx-6 mb-5 bg-secondary rounded-xl p-1">
          {(['signup', 'login'] as const).map((t) => (
            <button key={t} type="button" onClick={() => switchTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}>
              {t === 'signup' ? 'Sign Up' : 'Log In'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {/* Google button */}
          <button type="button" onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 bg-background border border-border rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          {tab === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="name" type="text" value={form.name} onChange={handleChange} required
                  placeholder="Rajesh Kumar"
                  className="w-full pl-9 pr-4 py-3 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input name="email" type="email" value={form.email} onChange={handleChange} required
                placeholder="rajesh@example.com"
                className="w-full pl-9 pr-4 py-3 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
            </div>
          </div>

          {tab === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Phone <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-4 py-3 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input name="password" type={showPass ? 'text' : 'password'} value={form.password}
                onChange={handleChange} required placeholder="••••••••" minLength={6}
                className="w-full pl-9 pr-10 py-3 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm password — signup only */}
          {tab === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="confirmPassword" type={showConfirmPass ? 'text' : 'password'}
                  value={form.confirmPassword} onChange={handleChange} required placeholder="••••••••"
                  className={`w-full pl-9 pr-10 py-3 bg-background dark:bg-muted/30 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                    form.confirmPassword && form.password !== form.confirmPassword
                      ? 'border-destructive'
                      : 'border-border'
                  }`} />
                <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-xs text-destructive mt-1">Passwords do not match</p>
              )}
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">{error}</p>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 shadow-sm">
            {loading ? 'Please wait...' : tab === 'signup' ? 'Create Account' : 'Log In'}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            {tab === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
            <button type="button" onClick={() => switchTab(tab === 'signup' ? 'login' : 'signup')}
              className="text-primary hover:underline font-medium">
              {tab === 'signup' ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
