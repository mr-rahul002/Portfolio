import { useRef, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Link } from "react-scroll";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center bg-gray-50 py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="section-title inline-block mb-2 relative">About Me</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>

        <div
          ref={contentRef}
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center opacity-0"
        >
          <div>
            <div className="relative">
              <div className="aspect-ratio-square w-full h-[360px] bg-gray-200 rounded-lg overflow-hidden">

                <img
                  src='/Portfolio/profile.JPG'

                  alt="Rahul Seth Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-black"></div>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-4">
              <a href="https://github.com/mr-rahul002" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/rahul-s-84473219a/" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:02rahulseth@gmail.com" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-3">Rahul Seth</h3>
              <p className="text-gray-500">Software Engineer</p>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Dynamic Software Development Professional with over 2 years of experience designing and delivering innovative, user-centric solutions for government and enterprise applications. Skilled in low-code development (Appian) and integrations, proficient in workflow automation, REST/SOAP API development, and database design and integration. Experienced in developing mobile and web applications using Flutter, enhancing cross-platform functionality and user experience.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="font-medium">Phone:</p>
                <p className="text-gray-700">8003161221</p>
              </div>
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-gray-700">02rahulseth@gmail.com</p>
              </div>
              <div>
                <p className="font-medium">Location:</p>
                <p className="text-gray-700">Jaipur, Rajasthan</p>
              </div>
              <div>
                <p className="font-medium">Education:</p>
                <p className="text-gray-700">Master of Computer Applications</p>
              </div>
            </div>

            <Link
              to="contact"
              className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 ease-in-out"
            >
              Let's Work Together
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;