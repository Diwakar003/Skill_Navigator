import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../Navbar'; // Adjust path based on your folder structure
import Footer from '../Footer'; // Adjust path based on your folder structure

const Dataengcoursepage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isVisible, setVisible] = useState(false);
  const [isPythonExpanded, setPythonExpanded] = useState(false);
  const [isPipelinesExpanded, setPipelinesExpanded] = useState(false);
  const [isETLExpanded, setETLExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setVisible(true);
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className={`max-w-4xl mx-auto p-8 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header Section */}
        <div className="text-center mb-8">
          <img
            src="/src/assets/dataengineer.png" // Replace with your actual image
            alt="Data Engineering"
            className="mx-auto mb-4 w-2/3 max-w-[400px] h-auto object-cover rounded-lg shadow-lg"
          />
          <h1 className="text-4xl font-bold mb-4">Data Engineering</h1>
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
            Explore the fundamentals of data engineering with our course, designed
            to equip you with the skills to build and manage data pipelines,
            perform ETL (Extract, Transform, Load) operations, and leverage
            cloud-based data platforms. Gain hands-on experience with tools like
            Apache Hadoop, Spark, and SQL, and learn how to process and analyze
            large datasets to drive informed business decisions.
          </p>
          <h3 className="font-bold mb-2">Key concepts covered include:</h3>
          <ul className="list-disc list-inside mb-8">
            <li>Data Pipelines</li>
            <li>ETL Processes</li>
            <li>Big Data Technologies</li>
            <li>Data Warehousing</li>
            <li>Cloud Data Platforms</li>
          </ul>
        </div>

        {/* Course Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Course Content</h2>
          <div className="space-y-4">
            {/* Python Fundamentals Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Python Fundamentals</h3>
                  <p className="text-gray-500">{isPythonExpanded ? 'Hide' : '3 Topics'}</p>
                </div>
                <button
                  className="text-blue-500 font-semibold"
                  onClick={() => setPythonExpanded(!isPythonExpanded)}
                >
                  {isPythonExpanded ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPythonExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="mt-4 text-gray-700">
                  <li>Python Basics</li>
                  <li>Data Types and Structures</li>
                  <li>Libraries for Data Engineering</li>
                </ul>
              </div>
            </div>

            {/* Data Pipelines Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Data Pipelines</h3>
                  <p className="text-gray-500">{isPipelinesExpanded ? 'Hide' : '3 Topics'}</p>
                </div>
                <button
                  className="text-blue-500 font-semibold"
                  onClick={() => setPipelinesExpanded(!isPipelinesExpanded)}
                >
                  {isPipelinesExpanded ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPipelinesExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="mt-4 text-gray-700">
                  <li>Building Data Pipelines</li>
                  <li>Data Ingestion Techniques</li>
                  <li>Monitoring and Logging</li>
                </ul>
              </div>
            </div>

            {/* ETL Processes Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">ETL Processes</h3>
                  <p className="text-gray-500">{isETLExpanded ? 'Hide' : '3 Topics'}</p>
                </div>
                <button
                  className="text-blue-500 font-semibold"
                  onClick={() => setETLExpanded(!isETLExpanded)}
                >
                  {isETLExpanded ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isETLExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="mt-4 text-gray-700">
                  <li>Understanding ETL</li>
                  <li>Tools for ETL</li>
                  <li>Best Practices in ETL</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz/Start Button */}
        <div className="text-center">
          <button
            className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600"
            onClick={() => navigate('/dataengmodulepage')} // Navigate to Dataengmodulepage on click
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

export default Dataengcoursepage;
