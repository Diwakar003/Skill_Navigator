import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [isVisible, setIsVisible] = useState(false); // State for visibility

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Set visibility to true after a delay
    }, 100); // Adjust delay as needed

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-cover bg-center transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: 'url(https://gseii.org/site/wp-content/uploads/2014/05/Blue-Gradient-Background-HD-Wallpaper-1024x576.jpg)'
      }}
    >
      <div className="relative bg-white rounded-lg shadow-lg flex w-3/4">
        
        {/* Logo in the top left */}
        <div className="absolute top-4 left-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Hexaware_new_logo.svg/768px-Hexaware_new_logo.svg.png?20201230064751" // Replace with the actual logo or a local image path
            alt="Logo"
            className="w-24 h-24"
          />
        </div>

        {/* Left Section */}
        <div className="w-1/2 flex flex-col items-center justify-center p-10">
          <h1 className="text-4xl font-bold text-center">Welcome To</h1>
          <h2 className="text-6xl font-extrabold text-center text-blue-500 mt-4">
            Skill Navigator
          </h2>
          <p className="mt-4 text-gray-600">By HexaWare</p>

          <div className="mt-8 space-y-4 w-full">
            {/* Sign Up Button with hover transition */}
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-full w-full transform transition-transform duration-300 ease-in-out hover:bg-blue-700 hover:scale-105"
              onClick={() => navigate('/signup')} // Navigate to the Signup page
            >
              Sign Up
            </button>
            
            <div className="text-center text-gray-500">Or</div>

            {/* Log In Button with hover transition */}
            <button
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full w-full transform transition-transform duration-300 ease-in-out hover:bg-gray-200 hover:scale-105"
              onClick={() => navigate('/login')} // Navigate to the Login page
            >
              Log In
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex items-center justify-center p-10 bg-gray-100 rounded-r-lg">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-neuroeducation-illustration_23-2150945405.jpg?t=st=1726938246~exp=1726941846~hmac=7c4c194bb050978391064f394adac043e9dbaf19df8faaa88e61f915fe7d85cb&w=740"
            alt="Illustration"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
