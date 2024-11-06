import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        {/* Logo and Social Media */}
        <div className="flex flex-col items-center space-y-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Hexaware_new_logo.svg/768px-Hexaware_new_logo.svg.png?20201230064751" alt="Hexaware Logo" className="h-24 w-24" />
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-black">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <i className="fab fa-pinterest"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
          <p className="text-sm">Copyright © 2024 Hexaware Technologies</p>
        </div>

        {/* Popular Courses */}
        <div className="flex flex-col space-y-2 text-center">
          <h4 className="text-lg font-semibold">Popular Courses</h4>
          <p>Digital Technologies</p>
          <p>Enterprise Applications</p>
          <p>Software Development and Engineering</p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col space-y-2 text-center">
          <h4 className="text-lg font-semibold">Contact Info</h4>
          <p>Address: Maharashtra, India</p>
          <p>Phone: 1234567890</p>
          <p>Email: corporate_enquiry@hexaware.com</p>
        </div>
      </div>
      <div className="text-center text-sm mt-4">
        Powered by Hexaware
      </div>
    </footer>
  );
};

export default Footer;