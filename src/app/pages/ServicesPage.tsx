import { Link } from 'react-router';
import { Bot, Code, BarChart3, MessageSquare, FileText, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Bot className="w-8 h-8" />,
    title: 'AI Automation',
    tagline: 'Stop doing the same thing twice',
    description:
      'We map out the repetitive tasks eating your time — data entry, follow-up emails, report generation — and build automations that handle them while you sleep. No off-the-shelf tools, just something built around how you actually work.',
    examples: ['Auto-reply to customer inquiries', 'Data extraction from documents', 'Scheduled report generation'],
    gradient: 'from-primary to-accent',
    startingFrom: '₹15,000',
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: 'Web Development',
    tagline: 'A website that works as hard as you do',
    description:
      'Fast, mobile-friendly websites and web apps built with modern tech. We focus on what matters: clear messaging, easy navigation, and pages that actually convert visitors into customers.',
    examples: ['Business websites', 'Online stores', 'Booking & appointment systems'],
    gradient: 'from-accent to-primary',
    startingFrom: '₹10,000',
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Dashboards & Analytics',
    tagline: 'See your business clearly',
    description:
      'Custom dashboards that pull your data together in one place. Sales, inventory, leads, performance — all visible at a glance so you can make decisions based on facts, not gut feeling.',
    examples: ['Sales & revenue tracking', 'Inventory management', 'Team performance views'],
    gradient: 'from-primary to-orange-400',
    startingFrom: '₹20,000',
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: 'AI Chatbots',
    tagline: 'Answer questions even when you\'re offline',
    description:
      'Chatbots that actually understand your customers and give useful answers — not just "please hold." Great for handling FAQs, qualifying leads, and booking appointments without you lifting a finger.',
    examples: ['Customer support bots', 'Lead qualification', 'Appointment booking'],
    gradient: 'from-orange-400 to-accent',
    startingFrom: '₹15,000',
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: 'Student Portfolio & Resume',
    tagline: 'Land that first opportunity',
    description:
      "A clean portfolio site and an ATS-friendly resume that shows off your skills the right way. We've helped students land internships and first jobs at companies they actually wanted to work at.",
    examples: ['Personal portfolio websites', 'ATS-optimized resumes', 'LinkedIn profile review'],
    gradient: 'from-accent to-primary',
    startingFrom: '₹3,000',
  },
];

export function ServicesPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-sm text-primary font-medium">What we do</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Services built for real businesses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We don't do one-size-fits-all. Every project starts with understanding your specific situation.
          </p>
        </div>

        {/* Service cards */}
        <div className="space-y-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden hover:shadow-lg"
            >
              <div className="grid md:grid-cols-3 gap-0">
                {/* Icon + title panel */}
                <div className={`bg-gradient-to-br ${service.gradient} p-8 flex flex-col justify-between`}>
                  <div>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white mb-4">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">{service.title}</h2>
                    <p className="text-white/80 text-sm">{service.tagline}</p>
                  </div>
                  <div className="mt-6">
                    <div className="text-white/70 text-xs uppercase tracking-wide mb-1">Starting from</div>
                    <div className="text-white text-2xl font-bold">{service.startingFrom}</div>
                  </div>
                </div>

                {/* Description + examples */}
                <div className="md:col-span-2 p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-3">Common examples:</p>
                      <ul className="space-y-2">
                        {service.examples.map((ex, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      Talk about this service
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-10 border border-primary/20 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">Not sure which service fits?</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Just tell us what's slowing you down. We'll figure out the right approach together — no commitment needed.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium shadow-lg shadow-primary/20"
          >
            Start the conversation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}


