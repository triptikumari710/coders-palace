import { useState } from 'react';
import { Mail, Phone, Linkedin, MessageCircle, Clock, Send, CheckCircle, User } from 'lucide-react';

const services = [
  'AI Automation',
  'Web Development',
  'Dashboards & Analytics',
  'AI Chatbot',
  'Student Portfolio & Resume',
  'General Inquiry',
];

export function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Please enter your name'); return; }
    if (!form.phone.trim() && !form.email.trim()) {
      setError('Please enter at least a phone number or email'); return;
    }
    setLoading(true);
    setError('');
    try {
      const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/api';
      const res = await fetch(`${apiBase}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try WhatsApp or email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-sm text-primary font-medium">Get in touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Let's talk about your project
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Fill in your details and we'll call you back. No pressure, just a friendly conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — contact cards */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Or reach us directly</h2>
            <div className="space-y-4">
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 bg-background rounded-2xl border border-border hover:border-primary/40 transition-all group hover:shadow-md">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-0.5">WhatsApp</div>
                  <div className="text-muted-foreground text-sm">+91 98765 43210</div>
                  <div className="text-xs text-primary mt-1 font-medium">Fastest response — click to chat</div>
                </div>
              </a>

              <a href="mailto:contact@coderspalace.com"
                className="flex items-start gap-4 p-5 bg-background rounded-2xl border border-border hover:border-primary/40 transition-all group hover:shadow-md">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-0.5">Email</div>
                  <div className="text-muted-foreground text-sm">contact@coderspalace.com</div>
                  <div className="text-xs text-primary mt-1 font-medium">We reply within 24 hours</div>
                </div>
              </a>

              <a href="tel:+919876543210"
                className="flex items-start gap-4 p-5 bg-background rounded-2xl border border-border hover:border-primary/40 transition-all group hover:shadow-md">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-0.5">Phone</div>
                  <div className="text-muted-foreground text-sm">+91 98765 43210</div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Mon–Sat, 10 AM – 7 PM IST
                  </div>
                </div>
              </a>

              <a href="https://linkedin.com/company/coderspalace" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 bg-background rounded-2xl border border-border hover:border-primary/40 transition-all group hover:shadow-md">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-0.5">LinkedIn</div>
                  <div className="text-muted-foreground text-sm">Connect professionally</div>
                  <div className="text-xs text-primary mt-1 font-medium">Follow for updates & case studies</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right — simple form */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Request a callback</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Leave your details and we'll reach out to you within a few hours.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-background rounded-2xl border border-border">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Got it!</h3>
                <p className="text-muted-foreground mb-4">
                  We've received your message and will call you back shortly.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }}
                  className="text-sm text-primary hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Your name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" name="name" value={form.name} onChange={handleChange} required
                      placeholder="Rajesh Kumar"
                      className="w-full pl-9 pr-4 py-3 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
                  </div>
                </div>

                {/* Phone + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-4 py-3 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="rajesh@example.com"
                        className="w-full pl-9 pr-4 py-3 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground -mt-2">At least one of phone or email is required</p>

                {/* Service */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">What do you need?</label>
                  <select name="service" value={form.service} onChange={handleChange}
                    className="w-full px-4 py-3 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors">
                    <option value="">Select a service (optional)</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Your message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                    placeholder="Tell us briefly what you're looking for..."
                    className="w-full px-4 py-3 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none" />
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">{error}</p>
                )}

                <button type="submit" disabled={loading}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 font-medium disabled:opacity-60">
                  {loading ? 'Sending...' : 'Send — we\'ll call you back'}
                  <Send className="w-5 h-5" />
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  We typically respond within a few hours on working days.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
