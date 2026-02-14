import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/layout/Loader';
import Home from './pages/Home';
import ProjectDemo from './pages/ProjectDemo';
import StarryBackground from './components/layout/StarryBackground';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Router>
      <div className="min-h-screen text-slate-200 relative bg-dark-bg">
        {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}
        <div className={`transition-opacity duration-700 ${!isLoaded ? "opacity-0" : "opacity-100"}`}>
          <StarryBackground />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDemo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
