import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import ResumeButton from './ResumeButton';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking a link
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu visibility
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12",
      scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-black flex items-center justify-center">
            <span className="text-white font-mono text-xs font-bold">RS</span>
          </div>
          <span className={cn(
            "font-medium text-lg transition-all duration-300",
            scrolled ? "text-black" : "text-black"
          )}>
            Rahul Seth
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={cn(
                "relative font-medium text-sm uppercase tracking-wide transition-all duration-300 hover:text-black",
                activeSection === item
                  ? "text-black after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-black after:transition-all after:duration-300"
                  : "text-gray-500"
              )}
            >
              {item}
            </button>
          ))}
          <ResumeButton className="ml-4" />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="w-10 h-10 flex items-center justify-center"
          >
            <span className="sr-only">Open menu</span>
            <div className="space-y-1.5">
              <span className="block w-5 h-0.5 bg-black"></span>
              <span className="block w-5 h-0.5 bg-black"></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm">
            <div className="flex flex-col items-center space-y-4 py-4">
              {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={cn(
                    "font-medium text-sm uppercase tracking-wide transition-all duration-300 hover:text-black",
                    activeSection === item ? "text-black" : "text-gray-500"
                  )}
                >
                  {item}
                </button>
              ))}
              <ResumeButton />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;