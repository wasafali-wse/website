import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current || !logoRef.current || !menuRef.current) return;

    const ctx = gsap.context(() => {
      // Initial navigation animation
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      );

      // Logo animation
      gsap.fromTo(logoRef.current, 
        { scale: 0 },
        { scale: 1, rotation: 0, duration: 1, delay: 0.3, ease: 'back.out(1.7)' }
      );

      // Menu items animation
      gsap.fromTo('.nav-item', 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.5, ease: 'power2.out' }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav ref={navRef} className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div ref={logoRef} className="flex items-center space-x-4">
            <img 
              src="/logo2.png" 
              alt="Waheedsons Engineering" 
              className="h-12 w-auto"
            />
            
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div ref={menuRef} className="ml-10 flex items-baseline space-x-8">
              {['Home', 'About', 'Services', 'Works', 'Reviews', 'FAQ'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="nav-item text-gray-700 hover:text-green-600 px-3 py-2 text-lg font-medium transition-all duration-200 hover:scale-105"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="nav-item bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md rounded-lg mt-2">
              {['Home', 'About', 'Services', 'Works', 'Reviews', 'FAQ'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-700 hover:text-green-600 block px-3 py-2 text-lg font-medium w-full text-left transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-lg font-medium w-full mt-2 transition-colors duration-200"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;