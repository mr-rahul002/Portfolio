
import { useRef, useEffect } from 'react';
import { Code, Database, Server, Layers, GitBranch } from 'lucide-react';

const skills = [
  {
    id: 1,
    category: "Programming Languages",
    icon: <Code className="w-6 h-6" />,
    items: [
      { name: "Java", level: 75 },
      { name: "Flutter", level: 65 },
     
    ]
  },
  {
    id: 2,
    category: "Database Management",
    icon: <Database className="w-6 h-6" />,
    items: [
      { name: "SQL Server", level: 85 },
      { name: "Oracle", level: 70 },
    ]
  },
  {
    id: 3,
    category: "Integration & API Development",
    icon: <Server className="w-6 h-6" />,
    items: [
      { name: "MuleSoft", level: 90 },
      { name: "DataWeave", level: 85 },
      { name: "RAML", level: 80 },
      { name: "REST/SOAP APIs", level: 85 },
      { name: "Anypoint Platform", level: 80 },
    ]
  },
  {
    id: 4,
    category: "Low-Code Platforms",
    icon: <Layers className="w-6 h-6" />,
    items: [
      { name: "Appian", level: 95 },
      { name: "SAIL", level: 90 },
      { name: "Process Models", level: 85 },
      { name: "CDTs", level: 90 },
    ]
  },
  {
    id: 5,
    category: "Version Control & Tools",
    icon: <GitBranch className="w-6 h-6" />,
    items: [
      { name: "Git", level: 80 },
      { name: "Jira", level: 75 },
      { name: "Postman", level: 85 },
    ]
  }
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headingRef.current || entry.target === skillsRef.current) {
              entry.target.classList.add('animate-fade-in');
            } else {
              // It's a progress bar
              entry.target.closest('.progress-bar')?.classList.add('progress-animate');
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (headingRef.current) observer.observe(headingRef.current);
    if (skillsRef.current) observer.observe(skillsRef.current);
    
    Object.values(progressRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (skillsRef.current) observer.unobserve(skillsRef.current);
      
      Object.values(progressRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={headingRef}
          className="mb-12 text-center opacity-0"
        >
          <h2 className="section-title inline-block mb-2 relative">Technical Skills</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600">A comprehensive overview of my technical expertise and proficiencies.</p>
        </div>
        
        <div 
          ref={skillsRef}
          className="max-w-5xl mx-auto opacity-0"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((category) => (
              <div 
                key={category.id}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-black text-white rounded-lg">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{category.category}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.items.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          ref={(el) => (progressRefs.current[`${category.id}-${index}`] = el)}
                          className="progress-value"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
