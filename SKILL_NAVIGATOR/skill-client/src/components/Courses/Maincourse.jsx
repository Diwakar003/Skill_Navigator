import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Import Link for navigation
import Javacoursepage from './Javacoursepage';
import Dotnetcoursepage from './Dotnetcoursepage';
import Dataengcoursepage from './Dataengcoursepage';

const Maincourse = () => {
  return (
    <div className="main-course-container">
      <h2 className="text-center text-3xl font-bold mb-8">Course Selection</h2>

      {/* Navigation Links to Different Course Pages */}
      <div className="course-links flex justify-around">
        <Link to="/Courses/Javacoursepage">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg transition-transform hover:bg-blue-600">
            Java Course
          </button>
        </Link>
        <Link to="/Courses/Dataengcoursepage">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg transition-transform hover:bg-blue-600">
            Data Engineering Course
          </button>
        </Link>
        <Link to="/Courses/Dotnetcoursepage">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg transition-transform hover:bg-blue-600">
            .NET Course
          </button>
        </Link>
      </div>

      {/* Routes for Different Courses */}
      <div className="course-content mt-8">
        <Routes>
          <Route path="java-course" element={<Javacoursepage />} />
          <Route path="data-engineering-course" element={<Dataengcoursepage />} />
          <Route path="dotnet-course" element={<Dotnetcoursepage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Maincourse;
