import React, { useEffect, useRef } from 'react';
import { Sun, Zap, Battery, Wrench, Home, Settings } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Sun,
      title: 'Residential Solar Systems',
      description: 'Complete solar power solutions for homes with professional installation and maintenance.',
      features: ['Rooftop Solar Panels', 'Grid-tie Inverters', 'Battery Storage', 'Net Metering Setup'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'EV Charging Solutions',
      description: 'Electric vehicle charging stations for residential and commercial use.',
      features: ['Home EV Chargers', 'Fast Charging Stations', 'Smart Charging', 'Installation Service'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Battery,
      title: 'Battery Chargers',
      description: 'General purpose battery chargers for various applications and battery types.',
      features: ['Car Battery Chargers', 'UPS Battery Chargers', 'Industrial Chargers', 'Smart Charging'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Home,
      title: 'On-Site Services',
      description: 'Professional installation and maintenance services at your location.',
      features: ['System Installation', 'Maintenance Service', 'System Upgrades', 'Emergency Repairs'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Wrench,
      title: 'Repair Services',
      description: 'Expert repair services for solar inverters and charging equipment.',
      features: ['Inverter Repair', 'Charger Repair', 'System Diagnostics', 'Component Replacement'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Settings,
      title: 'Technical Consultancy',
      description: 'Professional consultation for renewable energy projects and system design.',
      features: ['System Design', 'Feasibility Studies', 'Energy Audits', 'Project Management'],
      color: 'from-green-500 to-green-600'
    }
  ];

  useEffect(() => {
    if (!servicesRef.current) return;

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

      // Service cards animation
      gsap.fromTo('.service-card', 
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Icon floating animation
      gsap.to('.service-icon', {
        y: -5,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.2
      });

    }, servicesRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={servicesRef} id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
            Our <span className="text-green-600">Services</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
            Comprehensive renewable energy services from residential solar installations 
            to EV charging solutions and expert technical consultancy.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="service-card bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 group">
              <div className={`service-icon bg-gradient-to-br ${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-lg text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="mt-8 text-green-600 hover:text-green-700 font-semibold text-lg group-hover:translate-x-2 transition-transform duration-200">
                Learn More →
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-20 bg-green-600 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-6">Emergency Technical Support</h3>
          <p className="text-xl text-green-100 mb-8">Need urgent repairs? We offer 24/7 emergency service for critical systems.</p>
          <button className="bg-white text-green-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
            Call Emergency Line: +92 300 1234567
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;