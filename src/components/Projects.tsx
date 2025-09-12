import { useRef, useEffect, useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
   {
    id: 1,
    title: "NOVARTIS (User Role Profile Fabric)",
    description: "Developed the User Role Profile Fabric (URPF), a role-based access management framework that streamlined and secured user access across global research, manufacturing, and administrative systems. I integrated Appian with enterprise IAM, Active Directory, and SAML SSO to enable single sign-on, role provisioning, and seamless access control. By unifying HR, security, and compliance data with row-level security and least-privilege principles, I ensured controlled, site-specific access to sensitive information. I also automated critical workflows such as onboarding, role transitions, and access requests, which reduced approval cycle times and improved efficiency. Additionally, I built governance features including RBAC policies, audit trails, and real-time compliance monitoring, strengthening both security and regulatory alignment.",
    technologies: ["Appian","SQL MariaDB"],
    image: "/Portfolio/novartis.jpg",
    // linkDemo: "#",
    // linkGithub: "#",
  },
  {
    id: 2,
    title: "Veri-Gov",
    description: "Developed a platform enabling citizens and non-citizens to access government services in health, care, shelter, and finance, improving service delivery and efficiency.",
    technologies: ["Flutter","Dart"],
    image: "/Portfolio/veri-gov.png",
    // linkDemo: "#",
    // linkGithub: "#",
  },
  {
    id: 3,
    title: "Government Portal (Licensing Platform)",
    description: "Developed an online platform enabling individuals to apply for permits and licenses to operate businesses in Saudi Arabia cities, enhancing accessibility and efficiency.",
    technologies: ["MuleSoft", "Appian","Dataweave","RAML", "SQL SERVER"],
    image: "/Portfolio/LicenseAndPermits.jpg",
    // linkDemo: "#",
    // linkGithub: "#",
  },
  {
    id: 4,
    title: "Government Portal (Disability Service for Public Domain Saudi)",
    description: "Developed a platform for social workers to manage license needs, from application to approval, improving accessibility for disability services in Saudi Arabia.",
    technologies: ["MuleSoft", "Appian","Dataweave","RAML", "SQL SERVER"],
    image: "/Portfolio/Social.png",
    // linkDemo: "#",
    // linkGithub: "#",
  },
  {
    id: 5,
    title: "Government Health & Services Portal",
    description: "Developed a platform enabling citizens and non-citizens to access government services in health, care, shelter, and finance, improving service delivery and efficiency.",
    technologies: ["Appian","SQL"],
    image: "/Portfolio/DisabilityAndHealth.png",
    // linkDemo: "#",
    // linkGithub: "#",
  },
  
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const toggleProjectDescription = (projectId: number) => {
    setExpandedProjectId(prev => (prev === projectId ? null : projectId));
    requestAnimationFrame(() => {
      const container = scrollContainerRef.current;
      const target = container?.querySelector(`[data-project-id="${projectId}"]`) as HTMLElement | null;
      if (container && target) {
        try {
          target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } catch {
          // Fallback: manually center the card
          const targetLeft = target.offsetLeft;
          const targetWidth = target.offsetWidth;
          const center = targetLeft - (container.clientWidth - targetWidth) / 2;
          container.scrollTo({ left: center, behavior: 'smooth' as ScrollBehavior });
        }
        requestAnimationFrame(updateScrollButtonsState);
      }
    });
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const firstCard = container.querySelector('[data-project-card]') as HTMLDivElement | null;
    const styles = window.getComputedStyle(container);
    const gapStr = (styles as any).columnGap || (styles as any).gap || '0';
    const gap = parseFloat(gapStr) || 0;
    const step = (firstCard?.offsetWidth || Math.floor(container.clientWidth * 0.9)) + gap;
    const delta = direction === 'left' ? -step : step;
    // Interrupt any ongoing smooth scroll so user clicks take effect immediately
    try {
      container.scrollTo({ left: container.scrollLeft, behavior: 'auto' });
    } catch {}
    // Apply the new scroll intent
    try {
      container.scrollBy({ left: delta, behavior: 'smooth' });
    } catch {
      container.scrollLeft = container.scrollLeft + delta;
    }
    // schedule state update after scroll changes
    requestAnimationFrame(updateScrollButtonsState);
  };

  const updateScrollButtonsState = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScrollLeft = scrollWidth - clientWidth;
    const epsilon = 2; // account for rounding
    setCanScrollLeft(scrollLeft > epsilon);
    setCanScrollRight(scrollLeft < maxScrollLeft - epsilon);
  };

  useEffect(() => {
    updateScrollButtonsState();
    const container = scrollContainerRef.current;
    if (!container) return;
    const onScroll = () => updateScrollButtonsState();
    container.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => updateScrollButtonsState();
    window.addEventListener('resize', onResize);
    return () => {
      container.removeEventListener('scroll', onScroll as EventListener);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Ensure the carousel starts at the first item on mount
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft = 0;
      updateScrollButtonsState();
    }
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headingRef.current) {
              entry.target.classList.add('animate-fade-in');
            } else {
              entry.target.classList.add('animate-scale-in');
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (headingRef.current) observer.observe(headingRef.current);
    
    projectRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });
    
    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      
      projectRefs.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);
  
  // Removed auto-scroll to prevent unexpected movement when interacting with cards
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gray-50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={headingRef}
          className="mb-12 text-center"
        >
          <h2 className="section-title inline-block mb-2 relative">Featured Projects</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600">A showcase of my most significant professional projects and contributions.</p>
        </div>
        
        <div
          className="relative"
        >
          {/* Left/Right controls */}
          <button
            type="button"
            aria-label="Scroll projects left"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className={`flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border ${canScrollLeft ? 'bg-white shadow-sm border-gray-200 hover:bg-gray-50' : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'}`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Scroll projects right"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className={`flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border ${canScrollRight ? 'bg-white shadow-sm border-gray-200 hover:bg-gray-50' : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'}`}
          >
            <ChevronRight size={18} />
          </button>

          <div
            className={`flex items-start gap-8 overflow-x-auto scrollbar-hide scroll-smooth ${expandedProjectId ? 'snap-x' : 'snap-x snap-mandatory'}`}
            style={{ WebkitOverflowScrolling: 'touch' }}
            ref={scrollContainerRef}
          >
            {projects.map((project, index) => (
              <div 
                key={project.id}
                ref={el => (projectRefs.current[index] = el)}
                className={`min-w-[340px] max-w-[360px] w-full ${expandedProjectId === project.id ? 'h-auto min-h-[480px]' : 'h-[480px]'} bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 focus-within:-translate-y-1 transition-transform duration-300 group flex-shrink-0 snap-start flex flex-col`}
                data-project-card
                data-project-id={project.id}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="relative h-48 md:h-56 bg-gray-100 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 bg-white rounded-t-lg"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <div className="flex gap-3">
                      {project.linkDemo && (
                        <a href={project.linkDemo} className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      )}
                      {project.linkGithub && (
                        <a href={project.linkGithub} className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors">
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div> */}
                  
                  <div className="absolute top-4 right-4">
                    <span className="bg-black text-white text-xs px-2 py-1 rounded-full font-mono">
                      #{project.id.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-black transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p id={`project-desc-${project.id}`} className={`text-gray-600 text-sm mb-2 text-justify ${expandedProjectId === project.id ? '' : 'line-clamp-3'}`}>
                    {project.description}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggleProjectDescription(project.id); }}
                    className="text-xs font-medium underline underline-offset-4 text-gray-700 hover:text-black mb-4"
                    aria-expanded={expandedProjectId === project.id}
                    aria-controls={`project-desc-${project.id}`}
                  >
                    {expandedProjectId === project.id ? 'Show less' : 'Read more'}
                  </button>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
