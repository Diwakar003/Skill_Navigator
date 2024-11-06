import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onCoursesClick, onAboutClick }) => {
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility
  const [isVisible, setIsVisible] = useState(false); // State for visibility transition
  const navigate = useNavigate(); // Initialize navigate hook

  const handleAccountClick = () => {
    navigate('/sidebarandprofile'); // Navigate to SidebarAndProfile page
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  useEffect(() => {
    setIsVisible(true); // Show navbar when component mounts
  }, []);

  return (
    <nav className={`flex items-center justify-between p-2 shadow-md bg-white transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-[-20px]'}`}>
      <div className="flex items-center">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Hexaware_new_logo.svg/768px-Hexaware_new_logo.svg.png?20201230064751" 
          alt="Logo" 
          className="h-20 w-20"
        />
      </div>
      <div className="flex-grow flex items-center justify-end">
        <ul className="flex space-x-4">
          <li className="relative">
            <Link 
              to="/" 
              className="text-gray-800 hover:text-blue-500 transition-colors transform hover:scale-105 text-lg font-medium"
            >
              Home
            </Link>
          </li>
          <li className="relative">
            <a 
              onClick={onCoursesClick} 
              className="text-gray-800 hover:text-blue-500 transition-colors transform hover:scale-105 text-lg font-medium cursor-pointer"
            >
              Courses
            </a>
          </li>
          <li className="relative">
            {/* Mentor dropdown trigger */}
            <button
              onClick={toggleDropdown}
              className="text-gray-800 hover:text-blue-500 transition-colors transform hover:scale-105 text-lg font-medium cursor-pointer"
            >
              Mentors
            </button>
            {/* Dropdown menu */}
            {showDropdown && (
              <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 transition-all ease-in-out duration-300">
                <li className="px-4 py-2 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">
                  DHAYANITHI
                </li>
                <li className="px-4 py-2 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">
                  ALBERT SIMEON
                </li>
                <li className="px-4 py-2 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">
                  DIWAKAR
                </li>
              </ul>
            )}
          </li>
          <li className="relative">
            <a 
              onClick={onAboutClick} 
              className="text-gray-800 hover:text-blue-500 transition-colors transform hover:scale-105 text-lg font-medium cursor-pointer"
            >
              About
            </a>
          </li>
        </ul>
        <button
          onClick={handleAccountClick}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded ml-4 hover:bg-blue-500 hover:text-white transition-colors text-lg font-medium"
        >
          Account
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
