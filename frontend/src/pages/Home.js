import React from 'react';
import HeroSection from '../components/home/HeroSection';
import Slider from '../components/home/Slider';
import Testimonials from '../components/home/Testimonials';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <HeroSection />
      <Slider />
      <Testimonials />
    </div>
  );
};

export default Home;