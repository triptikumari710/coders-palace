import { Routes, Route } from 'react-router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminRequests } from './pages/admin/AdminRequests';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminProjects } from './pages/admin/AdminProjects';

export default function App() {
  return (
    <Routes>
      {/* Admin routes — no public navbar/footer */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="requests" element={<AdminRequests />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Public routes */}
      <Route path="/*" element={
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      } />
    </Routes>
  );
}

