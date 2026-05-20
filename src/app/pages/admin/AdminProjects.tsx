import { useEffect, useState } from 'react';
import {
  Plus, Github, Sparkles, Trash2, Edit2, X, Check,
  ExternalLink, Star, Loader2, ChevronDown, ChevronUp, Tag,
} from 'lucide-react';
import {
  getProjects, createProject, updateProject,
  deleteProject, analyzeRepo,
} from '../../lib/api';

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

const CATEGORIES = [
  'AI Automation', 'Web Development', 'Dashboard', 'AI Tool',
  'Mobile App', 'Other',
];

const emptyForm = {
  title: '', repoUrl: '', liveUrl: '', category: 'Web Development',
  tags: '', analysis: '', featured: true,
};

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState('');
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditId(null);
    setForm(emptyForm);
    setAnalyzeError('');
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditId(p._id);
    setForm({
      title: p.title,
      repoUrl: p.repoUrl,
      liveUrl: p.liveUrl,
      category: p.category,
      tags: p.tags.join(', '),
      analysis: p.analysis,
      featured: p.featured,
    });
    setAnalyzeError('');
    setShowForm(true);
  };

  const handleAnalyze = async () => {
    if (!form.repoUrl.trim()) {
      setAnalyzeError('Please enter a GitHub repo URL first');
      return;
    }
    setAnalyzing(true);
    setAnalyzeError('');
    try {
      const data = await analyzeRepo(form.repoUrl.trim());
      setForm((f) => ({
        ...f,
        analysis: data.analysis,
        title: f.title || data.metadata?.name || '',
      }));
    } catch (err: unknown) {
      setAnalyzeError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };
      if (editId) {
        const updated = await updateProject(editId, payload);
        setProjects((prev) => prev.map((p) => p._id === editId ? updated : p));
      } else {
        const created = await createProject(payload);
        setProjects((prev) => [created, ...prev]);
      }
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Projects</h2>
          <p className="text-muted-foreground text-sm">
            Manage portfolio projects. Paste a GitHub URL and let AI write the description.
          </p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Project list */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-background rounded-2xl border border-border">
          <Github className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-30" />
          <p className="text-muted-foreground mb-4">No projects yet.</p>
          <button onClick={openNew}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
            Add your first project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div key={p._id} className="bg-background rounded-2xl border border-border overflow-hidden">
              <div className="flex items-start justify-between gap-4 p-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-foreground">{p.title}</h3>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">{p.category}</span>
                    {p.repoMeta?.stars > 0 && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3" /> {p.repoMeta.stars.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {p.repoUrl && (
                      <a href={p.repoUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Github className="w-3 h-3" /> Repo
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary transition-colors">
                        <ExternalLink className="w-3 h-3" /> Live
                      </a>
                    )}
                  </div>
                  {p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => setExpandedId(expandedId === p._id ? null : p._id)}
                    className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
                    title="View AI analysis">
                    {expandedId === p._id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <button onClick={() => openEdit(p)}
                    className="p-1.5 rounded-lg hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(p._id)}
                    className="p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expanded AI analysis */}
              {expandedId === p._id && p.analysis && (
                <div className="px-5 pb-5 border-t border-border pt-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> AI Analysis
                  </p>
                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto bg-secondary rounded-xl p-4">
                    {p.analysis}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Slide-in form panel */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setShowForm(false)} />
          <div className="w-full max-w-lg bg-background border-l border-border flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-semibold text-foreground">
                {editId ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={() => setShowForm(false)}
                className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* GitHub URL + Analyze */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  GitHub Repository URL
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="url"
                      value={form.repoUrl}
                      onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                      placeholder="https://github.com/username/repo"
                      className="w-full pl-9 pr-4 py-2.5 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 flex-shrink-0"
                  >
                    {analyzing ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> AI Analyze</>
                    )}
                  </button>
                </div>
                {analyzeError && (
                  <p className="text-xs text-destructive mt-1.5">{analyzeError}</p>
                )}
                {analyzing && (
                  <p className="text-xs text-primary mt-1.5 flex items-center gap-1.5">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    RepoExplain AI is analyzing your repository...
                  </p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Project Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="My Awesome Project"
                  className="w-full px-4 py-2.5 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                />
              </div>

              {/* Category + Live URL */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Live URL</label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="url"
                      value={form.liveUrl}
                      onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full pl-9 pr-4 py-2.5 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> Tags
                  <span className="text-muted-foreground font-normal">(comma separated)</span>
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="React, Node.js, AI, MongoDB"
                  className="w-full px-4 py-2.5 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                />
              </div>

              {/* AI Analysis */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> AI Analysis
                  </label>
                  {form.analysis && (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Generated
                    </span>
                  )}
                </div>
                <textarea
                  value={form.analysis}
                  onChange={(e) => setForm({ ...form, analysis: e.target.value })}
                  rows={8}
                  placeholder="Click 'AI Analyze' to auto-generate, or write manually..."
                  className="w-full px-4 py-3 bg-background dark:bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                <div>
                  <p className="text-sm font-medium text-foreground">Show on public site</p>
                  <p className="text-xs text-muted-foreground">Display this project in the Projects page</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    form.featured ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    form.featured ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border flex gap-3">
              <button onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving || !form.title.trim()}
                className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Check className="w-4 h-4" /> {editId ? 'Update' : 'Save'} Project</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
