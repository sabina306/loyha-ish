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
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';


function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-primary selection:text-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:courseId" element={<LessonView />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/about" element={<About />} />
              <Route path="/ai-chat" element={<AIChatPage />} />
              <Route path="/certificate" element={<CertificatePage />} />
            </Routes>
          </div>
        </Router>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
