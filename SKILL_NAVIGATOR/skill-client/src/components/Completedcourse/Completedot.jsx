import React from 'react';
import Navbar from '../Navbar'; // Adjust the path according to your folder structure
import Footer from '../Footer'; // Adjust the path according to your folder structure

const Completedot = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Header Section */}
        <div className="text-center">
          <img
            src="/src/assets/net.png" // Replace with your actual image path
            alt=".NET Programming"
            className="mx-auto mb-6 w-full max-w-full h-auto object-cover rounded-lg"
          />
          <h1 className="text-4xl font-bold mb-4">.NET Programming</h1>
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
            Dive into the world of .NET with this comprehensive course, which covers everything from the fundamentals to advanced programming techniques. Learn how to build scalable, secure web applications using the .NET framework, C#, and ASP.NET. This course also offers hands-on experience with database integration and cloud deployment.
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
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">C# Basics</h3>
                  <p className="text-gray-500">4 Topics</p>
                </div>
                <button className="text-blue-500 font-semibold">Expand</button>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">ASP.NET Fundamentals</h3>
                  <p className="text-gray-500">3 Topics</p>
                </div>
                <button className="text-blue-500 font-semibold">Expand</button>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Database Integration</h3>
                  <p className="text-gray-500">3 Topics</p>
                </div>
                <button className="text-blue-500 font-semibold">Expand</button>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600">
            Start Quiz
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Completedot;
