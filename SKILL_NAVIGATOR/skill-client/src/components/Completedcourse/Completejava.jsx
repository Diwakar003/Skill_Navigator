import React, { useState } from 'react';
import Navbar from '../Navbar'; // Adjust the path as necessary
import Footer from '../Footer'; // Adjust the path as necessary

const Completejava = () => {
  // State to manage the expansion of course sections
  const [isFundamentalsExpanded, setFundamentalsExpanded] = useState(false);
  const [isBasicOOPsExpanded, setBasicOOPsExpanded] = useState(false);
  const [isOOPsImplementationExpanded, setOOPsImplementationExpanded] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">
        {/* Header Section */}
        <div className="text-center">
          <img
            src="/src/assets/javacourse.png" // Make sure this path is correct
            alt="Java Programming"
            className="mx-auto mb-6 w-full max-w-full h-auto object-cover rounded-lg"
          />
          <h1 className="text-4xl font-bold mb-4">Java Programming</h1>

          {/* Progress Bar */}
          <div className="w-full bg-gray-300 rounded-full h-6 mb-2">
            <div
              className="bg-blue-600 h-6 rounded-full"
              style={{ width: '76%' }} // Update this percentage dynamically as per progress
            />
          </div>
          <div className="text-center">
            <span className="text-black text-lg font-bold block">76% completed</span>
            <hr className="border-t-2 border-gray-400 mt-2" />
          </div>
        </div>

        {/* Course Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Course Description</h2>
          <p className="text-gray-700 mb-4">
            Unlock the power of Java with our comprehensive course, designed to teach
            you core programming concepts, object-oriented principles, and advanced
            techniques. Gain hands-on experience with real-world projects to build robust,
            scalable applications and enhance your software development skills.
          </p>
          <h3 className="font-bold mb-2">Key concepts covered include:</h3>
          <ul className="list-disc list-inside mb-8">
            <li>Object-Oriented Programming (OOP)</li>
            <li>Exception Handling</li>
            <li>Data Structures and Algorithms</li>
            <li>Java Collections Framework</li>
            <li>Concurrency</li>
          </ul>
        </div>

        {/* Course Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Course Content</h2>
          <div className="space-y-4">
            {/* Fundamentals Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Fundamentals</h3>
                  <p className="text-gray-500">{isFundamentalsExpanded ? 'Hide' : '3 Topics'}</p>
                </div>
                <button
                  className="text-blue-500 font-semibold transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => setFundamentalsExpanded(!isFundamentalsExpanded)}
                >
                  {isFundamentalsExpanded ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isFundamentalsExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <ul className="mt-4 text-gray-700">
                  <li>Java Syntax</li>
                  <li>Variables and Data Types</li>
                  <li>Control Structures</li>
                </ul>
              </div>
            </div>

            {/* Basic OOPs Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Basic OOPs</h3>
                  <p className="text-gray-500">{isBasicOOPsExpanded ? 'Hide' : '2 Topics'}</p>
                </div>
                <button
                  className="text-blue-500 font-semibold transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => setBasicOOPsExpanded(!isBasicOOPsExpanded)}
                >
                  {isBasicOOPsExpanded ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isBasicOOPsExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <ul className="mt-4 text-gray-700">
                  <li>Classes and Objects</li>
                  <li>Inheritance</li>
                </ul>
              </div>
            </div>

            {/* OOPs Implementation Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">OOPs Implementation</h3>
                  <p className="text-gray-500">{isOOPsImplementationExpanded ? 'Hide' : '1 Topic'}</p>
                </div>
                <button
                  className="text-blue-500 font-semibold transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => setOOPsImplementationExpanded(!isOOPsImplementationExpanded)}
                >
                  {isOOPsImplementationExpanded ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOOPsImplementationExpanded ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <ul className="mt-4 text-gray-700">
                  <li>Polymorphism</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz/Start Button */}
        <div className="text-center">
          <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition duration-300 ease-in-out">
            Start Quiz
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Completejava;
