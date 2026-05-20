import { Link } from 'react-router';
import { Heart, Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const quickLinks = [
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' },
];

const services = [
  { label: 'AI Automation', path: '/services' },
  { label: 'Web Development', path: '/services' },
  { label: 'Dashboards', path: '/services' },
  { label: 'AI Chatbots', path: '/services' },
  { label: 'Portfolio & Resume', path: '/services' },
];

export function Footer() {
  const { isDark } = useTheme();
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <img
                src={isDark ? '/src/assets/logo.png' : '/src/assets/logo1.png'}
                alt="Coders Palace"
                className="h-20 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              We help small businesses save time and grow by building practical AI tools and web solutions.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@coderspalace.com"
                className="w-9 h-9 bg-background border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/coderspalace"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">Pages</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">Services</h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>contact@coderspalace.com</span>
              </li>
              <li className="text-sm text-muted-foreground">
                Mon–Sat: 10 AM – 7 PM IST
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Coders Palace. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1.5">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by the Coders Palace team
          </p>
        </div>
      </div>
    </footer>
  );
}

