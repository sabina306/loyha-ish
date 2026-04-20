// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Courses from './pages/Courses';
import LessonView from './pages/LessonView';
import Playground from './pages/Playground';
import About from './pages/About';
import AIChatPage from './pages/AIChatPage';
import CertificatePage from './pages/CertificatePage';
import QuizPage from './pages/QuizPage';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { SidebarProvider, useSidebar } from './context/SidebarContext';


function AppContent() {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f8faff] via-white to-[#eef2ff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
      {/* Decorative blurred background shapes */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      
      <Navbar />
      <div className={`${collapsed ? 'md:ml-[70px]' : 'md:ml-[220px]'} pt-14 md:pt-0 transition-all duration-300`}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<LessonView />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/about" element={<About />} />
          <Route path="/ai-chat" element={<AIChatPage />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="/quiz/:moduleId" element={<QuizPage />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <SidebarProvider>
          <Router>
            <ScrollToTop />
            <AppContent />
          </Router>
        </SidebarProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
