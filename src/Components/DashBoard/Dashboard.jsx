import React from "react";
import Weather from "./Weather/Weather";
import NavBar from "../NavBar/NavBar";
import CropManagement from "./CropManagement/CropManagement";
import OurCollection from "./OurCollection/OurCollection";

export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <Weather />
      <CropManagement />
      <OurCollection/>
    </div>
  );
}
