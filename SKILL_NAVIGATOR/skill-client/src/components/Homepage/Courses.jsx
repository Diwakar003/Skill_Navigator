import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const courses = [
    {
        title: 'Java Beginner to Advance',
        duration: '5 hrs 10 mins',
        rating: 4.7,
        modules: ['Introduction to Java', 'Java Fundamental', 'Hierarchy'],
        img: 'src/assets/java.png',
        path: '/Courses/Javacoursepage', // Correct path to match route
    },
    {
        title: 'Data Engineering',
        duration: '5 hrs 10 mins',
        rating: 4.7,
        modules: ['Introduction to Data Engineering', 'Data Modelling', 'Database System'],
        img: 'src/assets/dataengineer.png',
        path: '/Courses/Dataengcoursepage',
    },
    {
        title: '.Net Beginner to Advance',
        duration: '5 hrs 10 mins',
        rating: 4.7,
        modules: ['Introduction to .NET', 'Fundamental', 'Hierarchy'],
        img: 'src/assets/net.png',
        path: '/Courses/Dotnetcoursepage',
    },
];

const Courses = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleCourseClick = (path) => {
        // Navigate to the respective course page based on the course path
        navigate(path);
    };

    return (
        <div className="py-8">
            <h2 className="text-center text-3xl font-bold mb-8">Our Popular Courses</h2>
            <div className="space-y-8 px-16">
                {courses.map((course, index) => (
                    <div
                        key={index}
                        className={`flex bg-white p-6 rounded-lg shadow-md cursor-pointer transition-transform transform ${selectedCourse === index ? 'scale-105 shadow-xl' : 'hover:scale-105 hover:shadow-lg'} duration-300 ease-in-out`}
                        onClick={() => handleCourseClick(course.path)} // Navigate to the course path
                    >
                        <img src={course.img} alt={course.title} className="w-1/4 rounded-lg" />
                        <div className="ml-6">
                            <h3 className="text-2xl font-bold">{course.title}</h3>
                            <p>Duration: {course.duration}</p>
                            <p>Rating: {course.rating} ⭐</p>
                            <h4 className="mt-4 font-semibold">Modules:</h4>
                            <ul className="list-disc list-inside">
                                {course.modules.map((module, idx) => (
                                    <li key={idx}>{module}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="ml-auto">
                            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg transition-transform transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                Enroll
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
