import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/layout/Loader';
import Home from './pages/Home';
import ProjectDemo from './pages/ProjectDemo';
import ThankYou from './pages/ThankYou';
import MolecularBackground from './components/layout/MolecularBackground';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-dark-bg text-slate-200 relative">
        {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
        <div className={`transition-opacity duration-1000 ${!isLoaded ? "opacity-0" : "opacity-100"}`}>
          <MolecularBackground />
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDemo />} />
              <Route path="/thank-you" element={<ThankYou />} /> {/* Added Route for ThankYou */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
