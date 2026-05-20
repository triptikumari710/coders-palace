import { ExternalLink, Bot, BarChart, Globe, FileText } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: 'AI Chatbot for Coaching Institute',
      description: 'Intelligent chatbot that handles student inquiries, course information, and enrollment automation 24/7.',
      category: 'AI Automation',
      icon: <Bot className="w-6 h-6" />,
      gradient: 'from-primary to-accent',
      tags: ['AI', 'Chatbot', 'Education'],
    },
    {
      title: 'Inventory Management Dashboard',
      description: 'Real-time dashboard for tracking inventory, sales analytics, and automated reorder alerts.',
      category: 'Dashboard',
      icon: <BarChart className="w-6 h-6" />,
      gradient: 'from-accent to-purple-500',
      tags: ['Analytics', 'Real-time', 'Business'],
    },
    {
      title: 'Restaurant Management Website',
      description: 'Complete web solution with online ordering, table reservations, and menu management system.',
      category: 'Web Development',
      icon: <Globe className="w-6 h-6" />,
      gradient: 'from-purple-500 to-primary',
      tags: ['Web', 'E-commerce', 'Restaurant'],
    },
    {
      title: 'AI Resume Analyzer Tool',
      description: 'Smart tool that analyzes resumes, provides ATS optimization suggestions, and keyword matching.',
      category: 'AI Tool',
      icon: <FileText className="w-6 h-6" />,
      gradient: 'from-primary to-accent',
      tags: ['AI', 'Career', 'Automation'],
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-sm text-primary">Our Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real solutions we've built for real businesses
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-background rounded-xl border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-primary/10"
            >
              <div className={`h-48 bg-gradient-to-br ${project.gradient} p-8 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                <div className="relative w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  {project.icon}
                </div>
              </div>

              <div className="p-6">
                <div className="text-xs text-primary font-semibold mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  View case study
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

