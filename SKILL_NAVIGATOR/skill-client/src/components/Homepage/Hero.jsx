import React from 'react';

const Hero = ({ onGetStartedClick }) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between text-center md:text-left py-16 bg-gray-50">
      <div className="flex-1 md:pr-8">
        <h1 className="pl-7 text-7xl font-bold">
          Getting <span className="text-blue-500">Quality Education</span> Is Now
          More <span className="text-blue-500">Easy</span>
        </h1>
        <p className="pl-7 mt-4 text-lg">
          Provides you with the latest learning system and up-to-date courses.
        </p>
        <button
          className="ml-7 mt-6 px-8 py-3 bg-blue-500 text-white rounded-full transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105"
          onClick={onGetStartedClick}
        >
          Get Started
        </button>
      </div>

      <div className="flex-1 mt-8 md:mt-0">
        <img src="src/assets/main_home.png" alt="Quality Education" className="w-full h-auto object-cover" />
      </div>
    </section>
  );
};

export default Hero;
