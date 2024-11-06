import React from 'react';
import Navbar from '../Navbar'; // Adjust path based on your folder structure
import Footer from '../Footer'; // Adjust path based on your folder structure

const Completedata = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">
        {/* Header Section */}
        <div className="text-center">
          <img
            src="/src/assets/dataengineer.png" // Replace with your actual image
            alt="Data Engineering"
            className="mx-auto mb-6 w-full max-w-full h-auto object-cover rounded-lg"
          />
          <h1 className="text-4xl font-bold mb-4">Data Engineering</h1>
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
            {/* Course Content Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Python Fundamentals</h3>
                  <p className="text-gray-500">3 Topics</p>
                </div>
                <button className="text-blue-500 font-semibold">Expand</button>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Data Pipelines</h3>
                  <p className="text-gray-500">3 Topics</p>
                </div>
                <button className="text-blue-500 font-semibold">Expand</button>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">ETL Processes</h3>
                  <p className="text-gray-500">3 Topics</p>
                </div>
                <button className="text-blue-500 font-semibold">Expand</button>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz/Start Button */}
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

export default Completedata;
