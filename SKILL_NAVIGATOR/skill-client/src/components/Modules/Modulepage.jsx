import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../Navbar'; // Adjust the import path if necessary
import Footer from '../Footer'; // Adjust the import path if necessary

const ModulePage = () => {
  const videoRef = useRef(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    // Set the visibility to true after a short delay for the fade-in effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const toggleModule = (index) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const modules = [
    {
      title: 'Module 1: Introduction to .NET Framework',
      duration: '51 min',
      contents: ['Overview of .NET', 'CLR and BCL', '.NET Architecture', 'Managed and Unmanaged Code']
    },
    {
      title: 'Module 2: C# Programming Basics',
      duration: '51 min',
      contents: ['Variables and Data Types', 'Control Structures', 'OOP in C#', 'Exception Handling']
    },
    {
      title: 'Module 3: ASP.NET Core Web Development',
      duration: '51 min',
      contents: ['MVC Framework', 'Razor Pages', 'Routing and Controllers', 'Data Binding']
    },
    {
      title: 'Module 4: Advanced .NET Features',
      duration: '51 min',
      contents: ['Advanced .NET Features', 'Memory Management', 'Asynchronous Programming', 'Entity Framework']
    }
  ];

  return (
    <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 pr-4">
            <div className="relative video-container mb-4">
              <video controls ref={videoRef} className="w-full rounded-lg">
                <source src="https://cdn.pixabay.com/video/2024/06/30/218833_tiny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button onClick={skipBackward} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg opacity-70 hover:opacity-100">-10s</button>
              <button onClick={skipForward} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg opacity-70 hover:opacity-100">+10s</button>
            </div>
            <h2 className="text-xl font-semibold mb-2">.NET Beginner to Advance</h2>
            <p className="text-gray-500">Last updated January 2024</p>
          </div>

          <div className="w-full md:w-1/3 pl-4">
            <div className="space-y-4">
              {modules.map((module, index) => (
                <div key={index} className="module-item border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold cursor-pointer flex justify-between items-center" onClick={() => toggleModule(index)}>
                    {module.title}
                    <span>{expandedModule === index ? '-' : '+'}</span>
                  </h3>
                  <p className="text-gray-500">{module.duration}</p>
                  <ul className={`mt-2 space-y-2 overflow-hidden transition-all duration-500 ease-in-out ${expandedModule === index ? 'max-h-screen' : 'max-h-0'}`}>
                    {module.contents.map((content, contentIndex) => (
                      <li key={contentIndex} className="text-gray-600 pl-4">- {content}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Course Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Skill level:</strong> Beginner Level</p>
              <p><strong>Languages:</strong> English</p>
              <p><strong>Captions:</strong> Yes</p>
            </div>
            <div>
              <p><strong>Lectures:</strong> 90</p>
              <p><strong>Total Video:</strong> 20 hours</p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold">Certificates</h3>
            <p className="text-gray-600 mb-4">Get a certificate by completing the entire course</p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg transform transition-transform duration-300 hover:scale-105">Certificate</button>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-gray-600">
              The .NET course is designed to provide learners with a comprehensive understanding of
              the .NET framework, its components, and how to develop scalable, secure, and
              high-performance applications using various tools and languages supported by .NET.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ModulePage;
