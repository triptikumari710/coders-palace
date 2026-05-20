import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Github, ExternalLink, Star, Loader2, FolderOpen } from 'lucide-react';
import { getProjects } from '../lib/api';

interface Project {
  _id: string;
  title: string;
  repoUrl: string;
  liveUrl: string;
  category: string;
  tags: string[];
  analysis: string;
  repoMeta: { name: string; stars: number; url: string };
  featured: boolean;
  createdAt: string;
}

// Strip markdown symbols and render clean text
function cleanMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, '')        // ## headings
    .replace(/\*\*(.+?)\*\*/g, '$1')  // **bold**
    .replace(/\*(.+?)\*/g, '$1')      // *italic*
    .replace(/`(.+?)`/g, '$1')        // `code`
    .replace(/^\s*[-*+]\s+/gm, '• ')  // bullet points → •
    .replace(/\n{3,}/g, '\n\n')       // collapse extra blank lines
    .trim();
}

// Parse cleaned text into sections by headings
function parseSections(raw: string) {
  const lines = raw.split('\n');
  const sections: { heading: string; body: string }[] = [];
  let current: { heading: string; lines: string[] } | null = null;

  for (const line of lines) {
    // Detect lines that look like section headings (short, no punctuation at end)
    const isHeading = line.length > 0 && line.length < 60 &&
      !line.startsWith('•') && !line.endsWith('.') &&
      (line.endsWith(':') || /^[A-Z][^a-z]{2,}/.test(line) ||
       /^(Project Overview|Tech Stack|Key Features|Project Structure|Who Should|Summary)/i.test(line));

    if (isHeading) {
      if (current) sections.push({ heading: current.heading, body: current.lines.join('\n').trim() });
      current = { heading: line.replace(/:$/, ''), lines: [] };
    } else if (current) {
      current.lines.push(line);
    } else {
      current = { heading: '', lines: [line] };
    }
  }
  if (current) sections.push({ heading: current.heading, body: current.lines.join('\n').trim() });
  return sections.filter((s) => s.body.trim());
}

function AnalysisView({ text }: { text: string }) {
  const clean = cleanMarkdown(text);
  const sections = parseSections(clean);

  return (
    <div className="space-y-4">
      {sections.map((section, i) => (
        <div key={i}>
          {section.heading && (
            <h4 className="text-sm font-semibold text-foreground mb-1.5">{section.heading}</h4>
          )}
          <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
            {section.body.split('\n').filter(Boolean).map((line, j) => (
              <p key={j}>{line}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-sm text-primary font-medium">Our work</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Real problems, real solutions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every project here started with a conversation. Here's what we built and what actually happened.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-24">
            <FolderOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-30" />
            <p className="text-muted-foreground">No projects yet. Check back soon.</p>
          </div>
        )}

        {/* Project cards */}
        {!loading && projects.length > 0 && (
          <div className="space-y-8">
            {projects.map((project) => (
              <div key={project._id}
                className="bg-background rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden hover:shadow-lg">
                {/* Top accent bar */}
                <div className="h-1 bg-gradient-to-r from-primary to-accent" />

                <div className="p-8">
                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FolderOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs text-primary font-semibold uppercase tracking-wide mb-0.5">
                          {project.category}
                        </div>
                        <h2 className="text-xl font-bold text-foreground">{project.title}</h2>
                        {project.repoMeta?.name && (
                          <p className="text-sm text-muted-foreground">{project.repoMeta.name}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {project.repoMeta?.stars > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground px-2.5 py-1 bg-secondary rounded-full">
                          <Star className="w-3 h-3" /> {project.repoMeta.stars.toLocaleString()}
                        </span>
                      )}
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.repoUrl && (
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Github className="w-4 h-4" /> View Repository
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>

                  {/* AI Analysis toggle */}
                  {project.analysis && (
                    <div>
                      <button
                        onClick={() => setExpanded(expanded === project._id ? null : project._id)}
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        <ArrowRight className={`w-4 h-4 transition-transform ${expanded === project._id ? 'rotate-90' : ''}`} />
                        {expanded === project._id ? 'Hide details' : 'View project details'}
                      </button>

                      {expanded === project._id && (
                        <div className="mt-4 p-5 bg-secondary rounded-xl border border-border">
                          <AnalysisView text={project.analysis} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {!loading && (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6 text-lg">
              Got a problem that looks like one of these? Or something completely different?
            </p>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium shadow-lg shadow-primary/20">
              Tell us about your situation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
