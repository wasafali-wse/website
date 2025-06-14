import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Works from '../components/Works';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Works />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;