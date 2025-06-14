import React, { useEffect, useRef } from 'react';
import { ArrowRight, Phone, MapPin, Clock, Zap } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Title animation with text reveal effect
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      )
      // Subtitle animation
      .fromTo(subtitleRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6'
      )
      // Buttons animation
      .fromTo(buttonsRef.current?.children, 
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.7)' }, '-=0.4'
      )
      // Stats animation
      .fromTo(statsRef.current?.children, 
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.3'
      )
      // Image animation
      .fromTo(imageRef.current, 
        { opacity: 0, scale: 0.8, rotation: 5 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'power2.out' }, '-=1');

      // Floating animation for icons
      gsap.to('.floating-icon', {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });

      // Continuous text animation
      gsap.to('.highlight-text', {
        backgroundPosition: '200% center',
        duration: 3,
        ease: 'none',
        repeat: -1
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="home" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-8">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-lg font-medium">
                ✓ Local Service Center
              </div>
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-lg font-medium">
                ✓ 15+ Years Experience
              </div>
            </div>

            <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Your Trusted
              <span className="highlight-text bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent block bg-[length:200%_100%]">
                Solar & EV Partner
              </span>
            </h1>

            <p ref={subtitleRef} className="text-2xl text-gray-600 mb-12 leading-relaxed">
              Residential solar systems, EV charging solutions, and expert repair services. 
              Professional on-site support and technical consultancy.
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 mb-16">
              <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-xl text-xl font-semibold flex items-center justify-center space-x-3 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Phone className="h-6 w-6" />
                <span>Call Now: +92 300 1234567</span>
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 px-10 py-5 rounded-xl text-xl font-semibold flex items-center justify-center space-x-3 transition-all duration-300 border-2 border-gray-300 hover:border-green-500 hover:scale-105">
                <span>View Services</span>
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>

            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex items-center space-x-4">
                <div className="floating-icon">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-xl text-gray-900">Local Service</div>
                  <div className="text-lg text-gray-600">Same-day repairs</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="floating-icon">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-xl text-gray-900">Quick Response</div>
                  <div className="text-lg text-gray-600">24/7 emergency</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="floating-icon">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-xl text-gray-900">Expert Team</div>
                  <div className="text-lg text-gray-600">Certified engineers</div>
                </div>
              </div>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="bg-gradient-to-br from-green-100 to-gray-100 p-8 rounded-3xl">
              <img 
                src="https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Solar installation technician" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-2xl">
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="text-lg text-gray-600">Solar Installations</div>
            </div>
            <div className="absolute -top-8 -right-8 bg-white p-8 rounded-2xl shadow-2xl">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-lg text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;