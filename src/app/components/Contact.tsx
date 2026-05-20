import { Mail, Phone, Linkedin, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hi! I'm ${formData.name}. ${formData.message}`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-sm text-primary">Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Let's Start Your Project
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your business with AI and automation? We're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">WhatsApp</div>
                  <div className="text-muted-foreground">+91 98765 43210</div>
                  <div className="text-sm text-primary mt-1">Click to chat instantly</div>
                </div>
              </a>

              <a
                href="mailto:contact@coderspalace.com"
                className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Email</div>
                  <div className="text-muted-foreground">contact@coderspalace.com</div>
                  <div className="text-sm text-primary mt-1">We reply within 24 hours</div>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Phone</div>
                  <div className="text-muted-foreground">+91 98765 43210</div>
                  <div className="text-sm text-primary mt-1">Mon-Sat, 10 AM - 7 PM</div>
                </div>
              </a>

              <a
                href="https://linkedin.com/company/coderspalace"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">LinkedIn</div>
                  <div className="text-muted-foreground">Connect with us professionally</div>
                  <div className="text-sm text-primary mt-1">Follow for updates</div>
                </div>
              </a>
            </div>
          </div>

          
              
                
          </div>
        </div>
      
    </section>
  );
}

