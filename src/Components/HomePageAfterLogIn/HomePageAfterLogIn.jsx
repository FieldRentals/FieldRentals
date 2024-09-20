import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { StyledButton } from "../../App";
import OurCollection from "../DashBoard/OurCollection/OurCollection";
import AddEquipment from "../DashBoard/AddEuipment/AddEquipment";
import "./HomePageAfterLogin.css";
import Footer from "../HomePage/Footer/Footer";

export default function HomePageAfterLogIn() {
  const [addEquipment, setAddEquipment] = useState(false);

  return (
    <div>
      <NavBar />
      <OurCollection />
      <div className="HomePageAfterLoginButtonContainer">
        <div className="HomePageAfterLoginButtonSubContainer">
          <div>
            Ready to earn extra income? Click here to add your equipment for
            rent!
          </div>
          {addEquipment && <AddEquipment setAddEquipment={setAddEquipment} />}
          <StyledButton
            variant="contained"
            disableElevation
            disableFocusRipple
            disableRipple
            onClick={() => setAddEquipment(true)}
          >
            Add Equipment
          </StyledButton>
        </div>
      </div>
      <Footer />
    </div>
  );
}
