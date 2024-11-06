import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import SidebarAndProfile from './components/SidebarAndProfile';
import Login from './components/Login';
import Home from './components/Homepage/Home';
import Maincourse from './components/Courses/Maincourse'; // Import Maincourse
import Javacoursepage from './components/Courses/Javacoursepage'; // Import Java course page
import Dotnetcoursepage from './components/Courses/Dotnetcoursepage'; // Import .NET course page
import Dataengcoursepage from './components/Courses/Dataengcoursepage'; // Import Data Eng. course page
import Completejava from './components/Completedcourse/Completejava';
import Completedot from './components/Completedcourse/Completedot';
import Completedata from './components/Completedcourse/Completedata';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/Landingpage';
import ModulePage from './components/Modules/Modulepage';
import Dataengmodulepage from './components/Modules/Dataengmodulepage';
import Javamodulepage from './components/Modules/Javamodulepage';
import Certificate from './components/Certificate';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<SidebarAndProfile />} />
        <Route path="/sidebarandprofile" element={<SidebarAndProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/maincourse" element={<Maincourse />} /> {/* Route for Maincourse */}
        <Route path="/Courses/Javacoursepage" element={<Javacoursepage />} /> {/* Route for Java course */}
        <Route path="/Courses/Dotnetcoursepage" element={<Dotnetcoursepage />} /> {/* Route for .NET course */}
        <Route path="/Courses/Dataengcoursepage" element={<Dataengcoursepage />} /> {/* Route for Data Eng. course */}
        <Route path="/Completedcourse/Completejava" element={<Completejava />} /> 
        <Route path="/Completedcourse/Completedot" element={<Completedot />} /> 
        <Route path="/Completedcourse/Completedata" element={<Completedata />} /> 
        <Route path="/Module/Modulepage" element={<ModulePage />} /> 
        <Route path="/Modulepage" element={<ModulePage />} /> 
        <Route path="/dataengmodulepage" element={<Dataengmodulepage />} /> 
        <Route path="/javamodulepage" element={<Javamodulepage />} /> 
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/Certificate" element={<Certificate />} />
      </Routes>
    </Router>
  );
}

export default App;
