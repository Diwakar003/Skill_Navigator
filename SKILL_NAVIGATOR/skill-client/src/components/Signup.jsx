import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios'; 
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        firstName,
        lastName,
        email,
        password,
      });
      
      // Store the session token in local storage
      localStorage.setItem('sessionToken', response.data.token);
      console.log(response.data); // Handle success response
      navigate("/login"); // Redirect to login after successful signup
    } catch (err) {
      console.error(err);
      setError("An error occurred during signup. Please try again."); // Set error message
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:5000/api/google-login', {
        token: credentialResponse.credential,
      });
      
      // Store the session token in local storage
      localStorage.setItem('sessionToken', response.data.token);
      console.log(response.data); // Handle the response from your backend
      navigate("/sidebarandprofile"); // Redirect user to the SidebarAndProfile page
    } catch (err) {
      console.error(err);
      setError("Google authentication failed. Please try again.");
    }
  };
  
  const handleGoogleError = () => {
    setError("Google authentication failed. Please try again.");
  };

  const inputVariant = {
    hover: {
      scale: 1.05,
      borderColor: "#3b82f6",
      boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.3 },
    },
    focus: {
      scale: 1.1,
      borderColor: "#2563eb",
      boxShadow: "0px 0px 12px rgba(37, 99, 235, 0.8)",
      transition: { duration: 0.3 },
    },
  };

  const buttonVariant = {
    hover: {
      scale: 1.05,
      backgroundColor: "#2563eb",
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      backgroundColor: "#1d4ed8",
      transition: { duration: 0.1 },
    },
  };

  const placeholderVariant = {
    initial: { opacity: 1, y: 0, scale: 1 },
    hover: { opacity: 0.8, y: -5, scale: 0.95, transition: { duration: 0.3 } },
    focus: { opacity: 0.7, y: -10, scale: 0.9, transition: { duration: 0.3 } },
  };

  return (
    <GoogleOAuthProvider clientId="1049144010345-a0aiaccvdrrci7na7h0nnvlvsjmvepfe.apps.googleusercontent.com">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-screen bg-white pt-9"
      >
        <div className="absolute top-4 left-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Hexaware_new_logo.svg/768px-Hexaware_new_logo.svg.png?20201230064751"
            alt="Logo"
            className="w-24 h-auto"
          />
        </div>

        <motion.div
          className="flex flex-col md:flex-row bg-white w-fit h-fit mt-1"
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div
            className="hidden md:flex md:w-1/2 bg-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img
              src="src/assets/login_img.png"
              alt="Illustration"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center h-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <h2 className="text-4xl font-semibold text-gray-800">Create an account</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
            <form className="mt-6 flex flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <motion.div className="relative w-full md:w-1/2">
                  <motion.input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-white placeholder-transparent text-black focus:outline-none"
                    variants={inputVariant}
                    whileHover="hover"
                    whileFocus="focus"
                  />
                  {firstName.length === 0 && (
                    <motion.label
                      htmlFor="firstName"
                      className="absolute left-4 top-2 text-gray-400 pointer-events-none"
                      variants={placeholderVariant}
                    >
                      First Name
                    </motion.label>
                  )}
                </motion.div>

                <motion.div className="relative w-full md:w-1/2">
                  <motion.input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-white placeholder-transparent text-black focus:outline-none"
                    variants={inputVariant}
                    whileHover="hover"
                    whileFocus="focus"
                  />
                  {lastName.length === 0 && (
                    <motion.label
                      htmlFor="lastName"
                      className="absolute left-4 top-2 text-gray-400 pointer-events-none"
                      variants={placeholderVariant}
                    >
                      Last Name
                    </motion.label>
                  )}
                </motion.div>
              </div>

              <motion.div className="relative mt-4">
                <motion.input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-white placeholder-transparent text-black focus:outline-none"
                  variants={inputVariant}
                  whileHover="hover"
                  whileFocus="focus"
                />
                {email.length === 0 && (
                  <motion.label
                    htmlFor="email"
                    className="absolute left-4 top-2 text-gray-400 pointer-events-none"
                    variants={placeholderVariant}
                  >
                    E-mail
                  </motion.label>
                )}
              </motion.div>

              <motion.div className="relative mt-4">
                <motion.input
                  type={password ? "password" : "text"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-white placeholder-transparent text-black focus:outline-none"
                  variants={inputVariant}
                  whileHover="hover"
                  whileFocus="focus"
                />
                {password.length === 0 && (
                  <motion.label
                    htmlFor="password"
                    className="absolute left-4 top-2 text-gray-400 pointer-events-none"
                    variants={placeholderVariant}
                  >
                    Password
                  </motion.label>
                )}
              </motion.div>

              <motion.button
                type="submit"
                className="mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                variants={buttonVariant}
                whileHover="hover"
                whileTap="tap"
              >
                Sign Up
              </motion.button>
            </form>
            <div className="flex items-center mt-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-600">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              className="mt-4"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </GoogleOAuthProvider>
  );
};

export default SignUp;
