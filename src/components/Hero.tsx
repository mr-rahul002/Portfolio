
import { useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Link } from "react-scroll";


const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) observer.observe(headingRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.03)_0,_rgba(0,0,0,0)_70%)] z-0"></div>

      <div className="container mx-auto px-4 md:px-6 text-center z-10">
        <div className="max-w-3xl mx-auto">
          <h1
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="inline-block">Rahul</span>{' '}
            <span className="inline-block">Seth</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl font-light mb-8 text-gray-700 max-w-2xl mx-auto opacity-0"
            style={{ animationDelay: '0.4s' }}
          >
            Crafting Digital Experiences That Matter
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col md:flex-row gap-4 items-center justify-center opacity-0"
            style={{ animationDelay: '0.6s' }}
          >
            <a
              href="mailto:02rahulseth@gmail.com"
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 ease-in-out"
            >
              Get in Touch
            </a>
            <Link
              to="projects"
              smooth={true}
              duration={500}
              offset={-80}  // Adjusts for fixed navbar
              className="px-6 py-3 rounded-full border border-black hover:bg-black hover:text-white transition-all cursor-pointer"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 w-full flex justify-center motion-safe:animate-bounce">
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="mb-2">Scroll Down</span>
          <ArrowDown size={20} />
        </button>
      </div>

      {/* Background patterns */}
      <div className="absolute top-1/4 left-10 w-24 h-24 border border-black/20 rounded-full mix-blend-multiply blur-sm opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-black/20 rounded-full mix-blend-multiply blur-sm opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default Hero;
