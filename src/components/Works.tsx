import React, { useEffect, useRef, useState } from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectOperations } from '../lib/database';

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const worksRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    // Fetch projects from API
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(dbProjects => setProjects(
        dbProjects.map((project: any) => ({
          ...project,
          details: project.details ? project.details.split(',').map((d: string) => d.trim()) : []
        }))
      ))
      .catch(error => {
        console.error('Error loading projects:', error);
        setProjects([]);
      });
  }, []);

  useEffect(() => {
    if (!worksRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Project cards animation
      gsap.fromTo('.project-card', 
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, worksRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={worksRef} id="works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
            Recent <span className="text-green-600">Projects</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
            Explore our recent work showcasing our expertise in solar installations, 
            EV charging solutions, and technical services across Lahore.
          </p>
        </div>

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div key={project.id} className="project-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">{project.status}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Clock className="h-5 w-5" />
                    <span className="text-lg">{project.duration}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 text-lg">Project Highlights:</h4>
                  <ul className="space-y-2">
                    {project.details.map((detail: string, detailIndex: number) => (
                      <li key={detailIndex} className="flex items-center text-lg text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-green-50 to-gray-50 p-12 rounded-3xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Project?</h3>
            <p className="text-xl text-gray-600 mb-8">
              Whether you need solar installation, EV charging setup, or technical consultancy, 
              we're here to help with your renewable energy needs.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-bold text-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;