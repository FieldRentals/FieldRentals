import { useState } from 'react';

import Footer from './Footer/Footer';
import Profile from './Profile/Profile';
import HeroSection from './HeroSection/HeroSection';
import './HomePage.css'
import AboutUs from './AboutUs/AboutUs';
import SearchBox from './SearchBox/SearchBox'
import OurServices from './OurServices/OurServices';
import NavBar from './NavBar/NavBar';
// import './App.css';
// import HeroSection from './components/HeroSection.js';
// import NavBar from './components/NavBar.js'
// import Profile from './components/Profile.js';

function HomePage() {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="HomePage">
      <div className='NBHS'>
      <NavBar setShowProfile={setShowProfile}/>
      {showProfile ? <Profile setShowProfile={setShowProfile}/> : null}
      <HeroSection/>
      </div>
      <SearchBox />
      <AboutUs/>
      <OurServices/>
      <Footer/>
    </div>
  );
}

export default HomePage;
