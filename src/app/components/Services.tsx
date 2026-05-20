import { Bot, Code, BarChart3, MessageSquare, FileText, ArrowRight } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'AI Automation',
      description: 'Automate repetitive tasks, data entry, and workflows using intelligent AI agents that work 24/7.',
      gradient: 'from-primary to-accent',
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with the latest technologies.',
      gradient: 'from-accent to-primary',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Dashboards & Analytics',
      description: 'Custom dashboards that visualize your data and help you make informed decisions.',
      gradient: 'from-primary to-purple-500',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'AI Chatbots',
      description: 'Intelligent chatbots for customer support, lead generation, and automated conversations.',
      gradient: 'from-purple-500 to-accent',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Student Portfolio & Resume',
      description: 'Professional portfolios and ATS-optimized resumes that help students land their dream jobs.',
      gradient: 'from-accent to-primary',
    },
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-sm text-primary">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions to transform your business with cutting-edge technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-background rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>
              <button className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

