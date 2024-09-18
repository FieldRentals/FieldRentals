import { useState } from "react";

import Footer from "./Footer/Footer";
import Profile from "../Profile/Profile";
import HeroSection from "./HeroSection/HeroSection";
import "./HomePage.css";
import AboutUs from "./AboutUs/AboutUs";
import SearchBox from "./SearchBox/SearchBox";
import OurServices from "./OurServices/OurServices";
import NavBar from "../NavBar/NavBar";

function HomePage() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="HomePage">
      <div className="NBHS">
        {/* <NavBar setShowProfile={setShowProfile}/>
      {showProfile ? <Profile setShowProfile={setShowProfile}/> : null} */}
        <NavBar />
        <section id="Home">
          <HeroSection />
        </section>
      </div>
      {/* <SearchBox /> */}
      <section id="AboutUs">
        <AboutUs />
      </section>
      <section id="OurServices">
        <OurServices />
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
