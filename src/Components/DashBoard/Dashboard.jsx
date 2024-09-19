import React, { useState } from "react";
import Weather from "./Weather/Weather";
import NavBar from "../NavBar/NavBar";
import CropManagement from "./CropManagement/CropManagement";
import OurCollection from "./OurCollection/OurCollection";
import { StyledButton } from "../../App";
import AddEuipment from "./AddEuipment/AddEquipment";
import "./Dashboard.css";

export default function Dashboard() {
  const [addEquipment, setAddEquipment] = useState(false);

  return (
    <div>
      <NavBar />
      {addEquipment && <AddEuipment setAddEquipment={setAddEquipment} />}
      <Weather />
      <CropManagement />
      <div className="DashboardButtonContainer">
        <div className="DashboardButtonSubContainer">
          <div>
            Ready to earn extra income? Click here to add your equipment for
            rent!
          </div>
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
