import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import Footer from '../components/layout/Footer';
import SocialSidebar from '../components/layout/SocialSidebar';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.targetId) {
            const element = document.getElementById(location.state.targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <>
            <Navbar />
            <SocialSidebar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </>
    );
};

export default Home;
