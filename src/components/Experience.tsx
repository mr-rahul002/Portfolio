
import { useRef, useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    id: 1,
    company: "XEBIA",
    location: "Jaipur, Rajasthan",
    position: "CONSULTANT",
    period: "October 2025- Present",
    description: [
      "Led and delivered advanced business workflows using Appian and related technologies, driving project success for large-scale enterprise clients.",
      "Managed integration tasks, REST/SOAP APIs, automation design, and optimized database solutions for increased efficiency and scalability.",
      "Collaborated with cross-functional teams to refine requirements, troubleshoot issues, and enhance overall solution quality.", 
      "Demonstrated leadership in guiding junior team members, sharing best practices, and fostering a knowledge-sharing environment.",
      "Maintained strong focus on innovation and continuous improvement throughout project life cycles."
    ]
  },
  {
    id: 2,
    company: "XEBIA",
    location: "Jaipur, Rajasthan",
    position: "JUNIOR CONSULTANT",
    period: "April 2023 - September 2025",
    description: [
      "Designed and implemented complex business workflows using MuleSoft, leveraging DataWeave, Flow Design, API Management, REST/SOAP and database connectivity.",
      "Developed dynamic, user-friendly, and mobile-compatible processes in Appian, utilizing SAIL, Process Models, Records, Reports, Document Generation, Web APIs, and database integrations.",
      "Enhanced user experience by crafting intuitive forms and optimizing datasets with database frameworks, including Views and Stored Procedures, for both MuleSoft and Appian solutions.",
      "Evaluated user stories in design, develop, and unit test application modules, debugging and refining them to ensure seamless integration, alignment with business goals, and improved performance and user satisfaction."
    ]
  },
  {
    id: 3,
    company: "XEBIA",
    location: "Jaipur, Rajasthan",
    position: "SOFTWARE DEVELOPER INTERN",
    period: "October 2022 - March 2023",
    description: [
      "Developed CDTs (Custom Data Types) based on database schema specifications to support efficient data management.",
      "Designed and implemented expression rules, process models, records and constants to enable flexible workflows and process functionality.",
      "Built SAIL interfaces aligned with Figma design prototypes, ensuring user-friendly and visually consistent application designs.",
      "Contributed to multiple Front-End process components, creating interactive opportunities for the customer."
    ]
  },

];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === timelineRef.current) {
              entry.target.classList.add('animate-fade-in');
            } else {
              entry.target.classList.add('animate-slide-in-left');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (timelineRef.current) observer.observe(timelineRef.current);

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      if (timelineRef.current) observer.unobserve(timelineRef.current);

      itemRefs.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="section-title inline-block mb-2 relative">Professional Experience</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>

        <div
          ref={timelineRef}
          className="max-w-5xl mx-auto opacity-0"
        >
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 ml-6 md:ml-8"></div>

            {/* Experience items */}
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className="relative pl-16 md:pl-20 pb-12 opacity-0"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Circle indicator */}
                <div className="absolute left-0 top-0 w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center z-10">
                  <span className="font-mono font-bold">{exp.id}</span>
                </div>

                {/* Content card */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold">{exp.position}</h3>
                    <h4 className="text-lg font-medium text-gray-700">{exp.company}</h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm md:text-base">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
