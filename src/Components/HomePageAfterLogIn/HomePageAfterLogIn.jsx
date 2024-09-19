import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { StyledButton } from "../../App";
import OurCollection from "../DashBoard/OurCollection/OurCollection";
import AddEquipment from "../DashBoard/AddEuipment/AddEquipment";

export default function HomePageAfterLogIn() {
  const [addEquipment, setAddEquipment] = useState(false);

  return (
    <div>
      <NavBar />
      <div className="DashboardButtonContainer">
        <div className="DashboardButtonSubContainer">
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
      <OurCollection />
    </div>
  );
}
