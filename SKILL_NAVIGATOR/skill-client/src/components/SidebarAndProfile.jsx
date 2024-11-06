import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios
import { useNavigate } from 'react-router-dom';

const SidebarAndProfile = () => {
  const [certifications, setCertifications] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    degree: '',
    specialization: '',
    phone: '',
    email: '',
    linkedIn: '',
    gitHub: '',
  });
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [customLanguage, setCustomLanguage] = useState('');
  const [errors, setErrors] = useState({});
  const [isAlertVisible, setIsAlertVisible] = useState(false); // For the alert
  const [alertMessage, setAlertMessage] = useState(''); // Custom alert message

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setCertifications((prevCertifications) => [
      ...prevCertifications,
      ...files.map((file) => file.name),
    ]);
  };

  const handleRemoveFile = (fileName) => {
    setCertifications(certifications.filter((cert) => cert !== fileName));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error message on change
  };

  const handleLanguageSelect = (e) => {
    const { value } = e.target;
    if (value && !selectedLanguages.includes(value)) {
      setSelectedLanguages([...selectedLanguages, value]);
    }
  };

  const handleRemoveLanguage = (language) => {
    setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    const newErrors = {};

    // Check if formData fields are empty
    const isEmptyField = Object.values(formData).some((value) => value === '');
    if (isEmptyField) {
      newErrors.form = 'Please fill in all the fields.';
    }

    // Check for certifications and selected languages
    if (certifications.length === 0) {
      newErrors.certifications = 'Please upload at least one certification.';
    }

    if (selectedLanguages.length === 0) {
      newErrors.languages = 'Please select at least one language.';
    }

    // If there are validation errors, set them and stop the submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/updateProfile', {
        ...formData,
        certifications,
        languages: selectedLanguages.includes("Custom") ? [...selectedLanguages.filter(lang => lang !== "Custom"), customLanguage] : selectedLanguages,
      });

      setAlertMessage('Profile updated successfully!');  // Set success message
      setIsAlertVisible(true);         // Show the alert
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage('Failed to submit form. Please try again.');
      setIsAlertVisible(true);         // Show the alert in case of error
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    setAlertMessage('Logged out successfully!');
    setIsAlertVisible(true); // Show the alert
    navigate('/');
  };

  const closeModal = () => {
    setIsAlertVisible(false);
    if (alertMessage === 'Profile updated successfully!') {
      setAlertMessage('');  // Clear the message after navigation
      navigate('/home'); // Redirect only if the success message was shown
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md h-screen flex flex-col">
        <div className="flex flex-col items-center py-10">
          {/* Profile Image */}
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover"
              />
            ) : (
              <div className="bg-blue-200 w-28 h-28 rounded-full flex items-center justify-center">
                <span className="text-4xl text-blue-500">👤</span>
              </div>
            )}
          </div>

          <div className="mt-4 text-lg font-medium">YOUR INFO</div>

          {/* Edit Profile Image Button */}
          <label className="mt-4 text-blue-500 cursor-pointer flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
            <span className="material-icons">edit</span> Edit your profile image
          </label>
        </div>
        
        {/* Links */}
        <div className="flex flex-col mt-10 mb-auto">
          <a href="/home" className="px-6 py-4 hover:bg-blue-100 w-full text-left block text-blue-600">
            Home
          </a>
          <a href="/home" className="px-6 py-4 hover:bg-blue-100 w-full text-left block text-blue-600">
            Courses
          </a>
          <a href="/home" className="px-6 py-4 hover:bg-blue-100 w-full text-left block text-blue-600">
            Activity
          </a>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white mx-4 mb-4 py-2 rounded-md shadow hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Profile Form */}
      <div className="flex-1 bg-blue-50 p-8 rounded-lg">
        <div className="bg-white p-8 rounded-md shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Degree</label>
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Degree</option>
                  <option>B.E</option>
                  <option>B.Tech</option>
                  <option>B.Sc</option>
                  <option>M.E</option>
                  <option>M.Tech</option>
                  <option>M.Sc</option>
                </select>
                {errors.degree && <p className="text-red-500 text-sm">{errors.degree}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  placeholder="Enter Specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.specialization && <p className="text-red-500 text-sm">{errors.specialization}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">+91</span>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your mobile number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">LinkedIn Profile</label>
                <input
                  type="text"
                  name="linkedIn"
                  placeholder="LinkedIn URL"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.linkedIn && <p className="text-red-500 text-sm">{errors.linkedIn}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">GitHub Profile</label>
                <input
                  type="text"
                  name="gitHub"
                  placeholder="GitHub URL"
                  value={formData.gitHub}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.gitHub && <p className="text-red-500 text-sm">{errors.gitHub}</p>}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Upload Certifications</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {certifications.length > 0 && (
                <ul className="list-disc pl-5">
                  {certifications.map((cert) => (
                    <li key={cert} className="flex justify-between items-center">
                      {cert}
                      <button type="button" onClick={() => handleRemoveFile(cert)} className="text-red-500 ml-2">Remove</button>
                    </li>
                  ))}
                </ul>
              )}
              {errors.certifications && <p className="text-red-500 text-sm">{errors.certifications}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Select Languages</label>
              <select onChange={handleLanguageSelect} className="mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Select Language</option>
  <option value="JavaScript">JavaScript</option>
  <option value="Python">Python</option>
  <option value="Java">Java</option>
  <option value="C++">C++</option>
  <option value="C#">C#</option>
  <option value="PHP">PHP</option>
  <option value="Ruby">Ruby</option>
  <option value="Swift">Swift</option>
  <option value="Kotlin">Kotlin</option>
  <option value="Go">Go</option>
  <option value="Rust">Rust</option>
  <option value="TypeScript">TypeScript</option>
  <option value="Custom">Custom</option>
              </select>
              {selectedLanguages.includes("Custom") && (
                <input
                  type="text"
                  value={customLanguage}
                  onChange={(e) => setCustomLanguage(e.target.value)}
                  placeholder="Enter your custom language"
                  className="mb-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
              <ul className="list-disc pl-5">
                {selectedLanguages.map((lang) => (
                  <li key={lang} className="flex justify-between items-center">
                    {lang}
                    <button type="button" onClick={() => handleRemoveLanguage(lang)} className="text-red-500 ml-2">Remove</button>
                  </li>
                ))}
              </ul>
              {errors.languages && <p className="text-red-500 text-sm">{errors.languages}</p>}
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700">
              Submit
            </button>

            {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}
          </form>

          {isAlertVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-lg font-medium text-gray-800">{alertMessage}</h2>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarAndProfile;