import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Navbar from '../Navbar'; // Adjust the path according to your folder structure
import Footer from '../Footer'; // Adjust the path according to your folder structure

const Dotnetcoursepage = () => {
  const [isBasicsExpanded, setBasicsExpanded] = useState(false);
  const [isFundamentalsExpanded, setFundamentalsExpanded] = useState(false);
  const [isDatabaseIntegrationExpanded, setDatabaseIntegrationExpanded] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    window.scrollTo(0, 0);
    setVisible(true);
  }, []);

  // Function to handle "Start" button click
  const handleStart = () => {
    navigate('/modulepage'); // Navigate to ModulePage route
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className={`max-w-4xl mx-auto p-8 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header Section */}
        <div className="text-center">
          <img
            src="/src/assets/net.png" // Replace with your actual image path
            alt=".NET Programming"
            className="mx-auto mb-4 w-2/3 max-w-[400px] h-auto object-cover rounded-lg shadow-lg"
          />
          <h1 className="text-4xl font-bold mb-4">.NET Programming</h1>
          <div className="flex justify-center space-x-12 mb-6">
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded-full">
              Not Enrolled
            </div>
            <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full">
              Price: FREE
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600">
              Login to Enroll
            </button>
          </div>
          <p className="text-gray-600 mb-8">
            You are not yet enrolled in this course.
          </p>
        </div>

        {/* Course Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Course Description</h2>
          <p className="text-gray-700 mb-4">
            Dive into the world of .NET with this comprehensive course, covering everything from fundamentals to advanced programming techniques. Learn how to build scalable, secure web applications using the .NET framework, C#, and ASP.NET.
          </p>
          <h3 className="font-bold mb-2">Key concepts covered include:</h3>
          <ul className="list-disc list-inside mb-8">
            <li>Object-Oriented Programming (OOP)</li>
            <li>ASP.NET Framework</li>
            <li>Database Integration (Entity Framework)</li>
            <li>Web API Development</li>
            <li>Cloud Integration</li>
          </ul>
        </div>

        {/* Course Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Course Content</h2>
          <div className="space-y-4">
            {/* C# Basics Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">C# Basics</h3>
                  <p className="text-gray-500">{isBasicsExpanded ? 'Hide' : '4 Topics'}</p>
                </div>
                <button
                  className="text-blue-500 font-semibold transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => setBasicsExpanded(!isBasicsExpanded)}
                >
                  {isBasicsExpanded ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isBasicsExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <ul className="mt-4 text-gray-700">
                  <li>Introduction to C#</li>
                  <li>Data Types and Variables</li>
                  <li>Control Structures</li>
                  <li>Exception Handling</li>
                </ul>
              </div>
            </div>

            {/* ASP.NET Fundamentals Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">ASP.NET Fundamentals</h3>
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
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isFundamentalsExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <ul className="mt-4 text-gray-700">
                  <li>ASP.NET MVC Architecture</li>
                  <li>Routing in ASP.NET</li>
                  <li>Model-View-Controller Design Pattern</li>
                </ul>
              </div>
            </div>

            {/* Database Integration Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Database Integration</h3>
                  <p className="text-gray-500">{isDatabaseIntegrationExpanded ? 'Hide' : '3 Topics'}</p>
                </div>
                <button
                  className="text-blue-500 font-semibold transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => setDatabaseIntegrationExpanded(!isDatabaseIntegrationExpanded)}
                >
                  {isDatabaseIntegrationExpanded ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isDatabaseIntegrationExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <ul className="mt-4 text-gray-700">
                  <li>Entity Framework</li>
                  <li>Database First Approach</li>
                  <li>Code First Approach</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button 
            className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={handleStart} // Navigate on button click
          >
            Start
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dotnetcoursepage;
