import { useState } from 'react';
import NavBar from '../NavBar/NavBar';
// import './App.css';
// import HeroSection from './components/HeroSection.js';
// import NavBar from './components/NavBar.js'
// import Profile from './components/Profile.js';

function HomePage() {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="HomePage">
      <NavBar setShowProfile={setShowProfile}/>
      {/* {showProfile ? <Profile setShowProfile={setShowProfile}/> : null} */}
      {/* <HeroSection/> */}
    hello
    </div>
  );
}

export default HomePage;
