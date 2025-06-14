import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Award, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamOperations } from '../lib/database';

gsap.registerPlugin(ScrollTrigger);

const TeamMember = () => {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch team member from API
    if (id) {
      fetch(`http://localhost:5000/api/team`)
        .then(res => res.json())
        .then((team: any[]) => {
          const dbMember = team.find(m => m.id === parseInt(id));
          if (dbMember) {
            const certifications = dbMember.certifications
              ? dbMember.certifications.split(',').map((c: string) => c.trim())
              : [];
            setMember({ ...dbMember, certifications });
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading team member:', error);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (!containerRef.current || !member) return;

    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo('.hero-content', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );

      gsap.fromTo('.hero-image', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: 'power2.out' }
      );

      // Bio section animation
      gsap.fromTo('.bio-section', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: '.bio-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Projects animation
      gsap.fromTo('.project-card', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Contact info animation
      gsap.fromTo('.contact-item', 
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [member]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading team member...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Team Member Not Found</h1>
          <Link to="/" className="text-green-600 hover:text-green-700 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium text-lg">Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="hero-content">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {member.name}
              </h1>
              <p className="text-2xl text-green-600 font-semibold mb-4">
                {member.position}
              </p>
              <p className="text-xl text-gray-600 mb-8">
                {member.specialization}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-sm text-gray-500">Experience</span>
                  <div className="font-semibold text-gray-900">{member.experience}</div>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-sm text-gray-500">Education</span>
                  <div className="font-semibold text-gray-900">{member.education}</div>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bio-section">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">About {member.name.split(' ')[1] || member.name}</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              {member.bio}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Certifications</h3>
                <div className="space-y-3">
                  {member.certifications.map((cert: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="text-lg text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="contact-section">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="contact-item flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <a href={`mailto:${member.email}`} className="text-lg text-gray-700 hover:text-green-600">
                      {member.email}
                    </a>
                  </div>
                  <div className="contact-item flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <a href={`tel:${member.phone}`} className="text-lg text-gray-700 hover:text-green-600">
                      {member.phone}
                    </a>
                  </div>
                  <div className="contact-item flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span className="text-lg text-gray-700">{member.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      {member.projects && member.projects.length > 0 && (
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="projects-section">
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {member.projects.map((project: any, index: number) => (
                  <div key={project.id} className="project-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-8">
                      <div className="flex items-center space-x-2 mb-4">
                        <Calendar className="h-5 w-5 text-green-600" />
                        <span className="text-green-600 font-semibold text-lg">{project.year}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMember;