
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [customCursor, setCustomCursor] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Hide loader after page is fully loaded
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    // Custom cursor effect
    const handleMouseMove = (e: MouseEvent) => {
      setCustomCursor({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <div 
        className="custom-cursor hidden md:block"
        style={{ 
          left: `${customCursor.x}px`, 
          top: `${customCursor.y}px` 
        }}
      ></div>
      
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
