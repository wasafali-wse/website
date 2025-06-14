import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Wrench, Zap, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamOperations } from '../lib/database';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  const values = [
    {
      icon: Wrench,
      title: 'Expert Engineers',
      description: 'Our certified engineers have years of experience with solar systems and EV charging technology.'
    },
    {
      icon: Zap,
      title: 'Quick Installation',
      description: 'Fast, reliable service with most installations completed within 1-2 days.'
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: 'All installations come with comprehensive warranty and satisfaction guarantee.'
    },
    {
      icon: Users,
      title: 'Local Community',
      description: 'Proudly serving our local community with personalized, friendly service.'
    }
  ];

  useEffect(() => {
    // Fetch team members from API
    fetch('http://localhost:5000/api/team')
      .then(res => res.json())
      .then(setTeamMembers)
      .catch(error => {
        console.error('Error loading team members:', error);
        setTeamMembers([]);
      });
  }, []);

  useEffect(() => {
    if (!aboutRef.current) return;

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

      // Content animation
      gsap.fromTo(contentRef.current?.children, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Team cards animation
      gsap.fromTo('.team-card', 
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Values animation
      gsap.fromTo('.value-card', 
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, aboutRef);

    return () => ctx.revert();
  }, [teamMembers]);

  // Find CEO for spotlight section
  const ceo = teamMembers.find(member => member.position.toLowerCase().includes('ceo'));

  return (
    <section ref={aboutRef} id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
            About <span className="text-green-600">Waheedsons Engineering</span>
          </h2>
          <div ref={contentRef}>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              Since 2009, we've been your trusted partner for renewable energy solutions - 
              from residential solar installations to EV charging infrastructure and expert repair services.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div ref={contentRef} className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-900">Our Journey</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              What started as a small electronics repair shop has evolved into a comprehensive 
              renewable energy company. We specialize in residential solar systems, EV charging 
              solutions, and provide expert technical consultancy services.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              Today, we serve residential customers, local businesses, and provide on-site 
              technical services throughout Lahore. Our local service center is equipped with 
              the latest diagnostic tools and genuine parts for all your renewable energy needs.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">15+</div>
                <div className="text-lg text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">500+</div>
                <div className="text-lg text-gray-600">Solar Installations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">24/7</div>
                <div className="text-lg text-gray-600">Technical Support</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-gray-50 p-8 rounded-3xl">
            <img 
              src="https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Solar installation service" 
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* CEO Spotlight */}
        {ceo && (
          <div className="bg-gradient-to-r from-green-50 to-gray-50 rounded-3xl p-12 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Meet Our CEO</h3>
                <h4 className="text-2xl font-semibold text-green-600 mb-4">{ceo.name}</h4>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  {ceo.bio}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="text-sm text-gray-500">Experience</span>
                    <div className="font-semibold text-gray-900">{ceo.experience}</div>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="text-sm text-gray-500">Education</span>
                    <div className="font-semibold text-gray-900">{ceo.education}</div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <img 
                  src={ceo.image} 
                  alt={ceo.name}
                  className="w-80 h-80 object-cover rounded-2xl shadow-2xl mx-auto"
                />
              </div>
            </div>
          </div>
        )}

        {/* Team Section */}
        <div ref={teamRef} className="mb-20">
          <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Expert Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Link 
                key={member.id} 
                to={`/team/${member.id}`}
                className="team-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-green-600 font-semibold mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-3">{member.specialization}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{member.experience}</span>
                    <span className="text-green-600 font-medium text-sm group-hover:text-green-700">View Profile →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="value-card text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <value.icon className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h4>
              <p className="text-lg text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;