import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios'; // Import axios for API/database calls

const Javamodulepage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const videoRef = useRef(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoSrc, setVideoSrc] = useState(''); // State to track the current video source
  const [watchedVideos, setWatchedVideos] = useState([]); // Track watched videos
  const [isCertificateUnlocked, setIsCertificateUnlocked] = useState(false); // Track if certificate is unlocked

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Fetch watched videos from the server
    axios.get('/api/watched-videos')
      .then(response => {
        setWatchedVideos(response.data);
        checkCertificateUnlock(response.data);
      })
      .catch(error => console.error('Error fetching watched videos:', error));

    return () => clearTimeout(timer);
  }, []);

  const toggleModule = (index) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const handleWatchClick = (videoUrl, contentTitle) => {
    setVideoSrc(videoUrl); // Set the selected video source
    if (videoRef.current) {
      videoRef.current.pause(); // Pause the video before changing the source
      videoRef.current.load();  // Reload the video with the new source
      videoRef.current.play().catch(error => {
        console.log("Auto-play was prevented:", error); // Catch any errors related to auto-play restrictions
      });
    }

    // Mark video as watched after 90% completion
    videoRef.current.addEventListener('timeupdate', () => {
      if (videoRef.current.currentTime >= videoRef.current.duration * 0.9 && !watchedVideos.includes(contentTitle)) {
        markVideoAsWatched(contentTitle);
      }
    });
  };

  const markVideoAsWatched = (contentTitle) => {
    axios.post('/api/mark-watched', { videoTitle: contentTitle })
      .then(response => {
        setWatchedVideos([...watchedVideos, contentTitle]);
        checkCertificateUnlock([...watchedVideos, contentTitle]);
      })
      .catch(error => console.error('Error marking video as watched:', error));
  };

  const checkCertificateUnlock = (updatedWatchedVideos) => {
    const allVideos = modules.flatMap(module => module.contents.map(content => content.title));
    const allWatched = allVideos.every(videoTitle => updatedWatchedVideos.includes(videoTitle));

    setIsCertificateUnlocked(allWatched);
  };

  const handleDownloadCertificate = () => {
    if (isCertificateUnlocked) {
      navigate('/certificate'); // Navigate to the Certificates page
    }
  };

  const modules = [
    {
      title: 'Module 1: Introduction to Java',
      duration: '45 min',
      contents: [
        { title: 'Setting up Java Environment', videoUrl: 'src/assets/Javaenvironment.mp4' },
        { title: 'How Java works?', videoUrl: 'src/assets/Howjavaworks.mp4' },
        { title: 'Data Types', videoUrl: 'src/assets/Datatypes.mp4' },
        { title: 'How to get user input?', videoUrl: 'src/assets/Userinput.mp4' },
      ],
    },
    {
      title: 'Module 2: Advanced Java Programming',
      duration: '55 min',
      contents: [
        { title: 'Java Collections', videoUrl: 'https://example.com/java-collections.mp4' },
        { title: 'Generics', videoUrl: 'https://example.com/generics.mp4' },
        { title: 'Streams API', videoUrl: 'https://example.com/streams-api.mp4' },
        { title: 'Lambda Expressions', videoUrl: 'https://example.com/lambda-expressions.mp4' },
      ],
    },
    {
      title: 'Module 3: Java for Web Development',
      duration: '50 min',
      contents: [
        { title: 'Servlets', videoUrl: 'https://example.com/servlets.mp4' },
        { title: 'JSP', videoUrl: 'https://example.com/jsp.mp4' },
        { title: 'Spring Framework', videoUrl: 'https://example.com/spring-framework.mp4' },
        { title: 'Spring Boot', videoUrl: 'https://example.com/spring-boot.mp4' },
      ],
    },
    {
      title: 'Module 4: Java and Cloud Integration',
      duration: '40 min',
      contents: [
        { title: 'Deploying Java Applications on Cloud', videoUrl: 'https://example.com/deploying-java.mp4' },
        { title: 'Java with AWS', videoUrl: 'https://example.com/java-aws.mp4' },
        { title: 'CI/CD Integration', videoUrl: 'https://example.com/ci-cd-integration.mp4' },
      ],
    },
  ];

  return (
    <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 pr-4">
            <div className="relative video-container mb-4">
              <video controls ref={videoRef} className="w-full rounded-lg" key={videoSrc}>
                <source src={videoSrc || "src/assets/Javaenvironment.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button onClick={skipBackward} className="absolute left-4 top-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg opacity-70 hover:opacity-100">-10s</button>
              <button onClick={skipForward} className="absolute right-4 top-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg opacity-70 hover:opacity-100">+10s</button>
            </div>
            <h2 className="text-xl font-semibold mb-2">Java Programming - Beginner to Advance</h2>
            <p className="text-gray-500">Last updated January 2024</p>
          </div>
          <div className="w-full md:w-1/3 pl-4">
            <div className="space-y-4">
              {modules.map((module, index) => (
                <div key={index} className="module-item border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold cursor-pointer flex justify-between items-center" onClick={() => toggleModule(index)}>
                    {module.title}
                    <span>{expandedModule === index ? '-' : '+'}</span>
                  </h3>
                  <p className="text-gray-500">{module.duration}</p>
                  <ul className={`mt-2 space-y-2 overflow-hidden transition-all duration-500 ease-in-out ${expandedModule === index ? 'max-h-screen' : 'max-h-0'}`}>
                    {module.contents.map((content, contentIndex) => (
                      <li key={contentIndex} className="flex justify-between items-center text-gray-600 pl-4">
                        <span>- {content.title}</span>
                        <button 
                          onClick={() => handleWatchClick(content.videoUrl, content.title)} 
                          className="bg-blue-500 text-white px-4 py-1 rounded-lg ml-2 transform transition-transform duration-300 hover:scale-105"
                        >
                          Watch
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Course Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Skill level:</strong> Intermediate</p>
              <p><strong>Languages:</strong> English</p>
            </div>
            <div>
              <p><strong>Lectures:</strong> 80</p>
              <p><strong>Total Video:</strong> 18 hours</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button 
            onClick={handleDownloadCertificate} 
            className={`bg-green-500 text-white px-4 py-2 rounded-lg ${isCertificateUnlocked ? '' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!isCertificateUnlocked}
          >
            Download Certificate
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Javamodulepage;
