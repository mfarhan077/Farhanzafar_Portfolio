import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import SocialSidebar from './components/layout/SocialSidebar';
import StarryBackground from './components/layout/StarryBackground';

function App() {
  return (
    <div className="min-h-screen text-slate-200 relative">
      <StarryBackground />
      <Navbar />
      <SocialSidebar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
