import React, { useState } from "react";
import "./HeroSection.css";
import { StyledButton } from "../../../App";

function HeroSection() {
  const [activeButton, setActiveButton] = useState("Popular");
  // const [activeLine,setActiveLine] = useState('')
  return (
    <div className="HeroSectionContainer" id="Home">
      <div className="HSTitle">
        Maximize Your Farm's Potential with Easy FieldRentals
      </div>
      <div className="HSSubtitle">
        Discover, book, and manage top-quality equipment and land with just a
        few clicks. <br />
      </div>
      <StyledButton
        variant="contained"
        disableElevation
        disableFocusRipple
        disableRipple
      >
        See all Equipments
      </StyledButton>
    </div>

    // <div>
    //   <div className="OurCollection">
    //     <div className="OurCollectionTitle">Our Collection</div>
    //     <div className="OurCollectionTitleBar">
    //       <button
    //         className={activeButton === "Popular" ? "active" : null}
    //         onClick={() => setActiveButton("Popular")}
    //       >
    //         Popular
    //       </button>
    //       <button
    //         className={activeButton === "New Arrivals" ? "active" : null}
    //         onClick={() => setActiveButton("New Arrivals")}
    //       >
    //         New Arrivals
    //       </button>
    //       <button
    //         className={activeButton === "Seasonal Arrivals" ? "active" : null}
    //         onClick={() => setActiveButton("Seasonal Arrivals")}
    //       >
    //         Seasonal Arrivals
    //       </button>
    //       <button
    //         className={
    //           activeButton === "Budget-Friendly Options" ? "active" : null
    //         }
    //         onClick={() => setActiveButton("Budget-Friendly Options")}
    //       >
    //         Budget-Friendly Options
    //       </button>
    //     </div>
    //     <div className="OurCollectionLineBar"></div>
    //     <div></div>
    //     <div></div>
    //   </div>
    // </div>
  );
}

export default HeroSection;
