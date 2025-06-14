import React from 'react';
import { Zap, MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/colored.png" alt="WS" className="h-8 w-8" />
              <span className="text-xl font-bold">Waheedsons Engineering</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              Your trusted renewable energy partner since 2009. We provide comprehensive 
              solar installations, EV charging solutions, and expert repair services 
              at our local service center.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-green-600 p-3 rounded-lg transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-green-600 p-3 rounded-lg transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-green-600 p-3 rounded-lg transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-400 mt-1" />
                <div>
                  <p className="text-gray-300">123 Tech Street</p>
                  <p className="text-gray-300">Electronics District</p>
                  <p className="text-gray-300">Lahore, Pakistan</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <a href="tel:+923001234567" className="text-gray-300 hover:text-white transition-colors duration-200">
                  +92 300 1234567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <a href="mailto:info@waheedsons.com" className="text-gray-300 hover:text-white transition-colors duration-200">
                  info@waheedsons.com
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Business Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Service Center</span>
              </div>
              <div className="ml-8 space-y-1 text-sm text-gray-300">
                <p>Mon-Fri: 8:00 AM - 7:00 PM</p>
                <p>Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: 12:00 PM - 4:00 PM</p>
              </div>
              <div className="pt-2">
                <p className="text-sm text-green-400 font-medium">24/7 Emergency Service Available</p>
                <p className="text-sm text-gray-400">Call: +92 300 1234567</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-wrap justify-center space-x-8 mb-8">
            {['Home', 'About', 'Services', 'Works', 'Reviews', 'FAQ'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-300 hover:text-white transition-colors duration-200 mb-2"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Waheedsons Engineering. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Warranty</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;