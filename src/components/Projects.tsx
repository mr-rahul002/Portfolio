import { useRef, useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Veri-Gov",
    description: "Developed a platform enabling citizens and non-citizens to access government services in health, care, shelter, and finance, improving service delivery and efficiency.",
    technologies: ["Flutter","Dart"],
    image: "/Portfolio/veri-gov.png",
    // linkDemo: "#",
    // linkGithub: "#",
  },
  {
    id: 2,
    title: "Government Portal (Licensing Platform)",
    description: "Developed an online platform enabling individuals to apply for permits and licenses to operate businesses in Saudi Arabia cities, enhancing accessibility and efficiency.",
    technologies: ["MuleSoft", "Appian","Dataweave","RAML", "SQL SERVER"],
    image: "/Portfolio/LicenseAndPermits.jpg",
    // linkDemo: "#",
    // linkGithub: "#",
  },
  {
    id: 3,
    title: "Government Portal (Disability Service for Public Domain Saudi)",
    description: "Developed a platform for social workers to manage license needs, from application to approval, improving accessibility for disability services in Saudi Arabia.",
    technologies: ["MuleSoft", "Appian","Dataweave","RAML", "SQL SERVER"],
    image: "/Portfolio/Social.png",
    // linkDemo: "#",
    // linkGithub: "#",
  },
  {
    id: 4,
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
  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    let animationFrame: number;
    let scrollAmount = 0.5; // px per frame
    function autoScroll() {
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
        // Stop scrolling at the end
        return;
      } else {
        container.scrollLeft += scrollAmount;
        animationFrame = requestAnimationFrame(autoScroll);
      }
    }
    animationFrame = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gray-50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={headingRef}
          className="mb-12 text-center opacity-0"
        >
          <h2 className="section-title inline-block mb-2 relative">Featured Projects</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600">A showcase of my most significant professional projects and contributions.</p>
        </div>
        
        <div
          className="relative"
        >
          <div
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
            ref={scrollContainerRef}
          >
            {projects.map((project, index) => (
              <div 
                key={project.id}
                ref={el => (projectRefs.current[index] = el)}
                className="min-w-[340px] max-w-[360px] w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 opacity-0 group flex-shrink-0"
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 md:h-full object-contain transition-transform duration-700 group-hover:scale-105 bg-white rounded-t-lg"
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
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-black transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
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
