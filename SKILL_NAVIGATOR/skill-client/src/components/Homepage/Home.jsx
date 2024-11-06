import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Hero from './Hero';
import Stats from './Stats';
import Categories from './Categories';
import Courses from './Courses';
import Footer from '../Footer';

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const coursesRef = useRef(null); // Create a ref for the Courses section
  const footerRef = useRef(null); // Create a ref for the Footer section

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100); // Adjust the delay if needed
    return () => clearTimeout(timer);
  }, []);

  const scrollToCourses = () => {
    if (coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      <Navbar 
        onCoursesClick={scrollToCourses} 
        onHomeClick={scrollToTop} 
        onAboutClick={scrollToFooter} 
      />

      <div
        className={`transition-opacity duration-1000 ease-in-out ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
        <Hero onGetStartedClick={scrollToCourses} /> {/* Pass the function here */}
        <Stats />
        <Categories />
        
        <div ref={coursesRef}>
          <Courses />
        </div>

        <div ref={footerRef}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
