import React from "react";
import "./ListMyEquipments.css";
import { Name } from "ajv";

export default function ListMyEquipments() {
  return (
    <div className="LMEContainer">
      <div className="LMECbackground"></div>
      <div className="LMESubcontainer">
        Product Name: <br />
        <input className="productname" placeholder="Product Name" /> <br />
        <br />
        Location: <br />
        <input className="Location" placeholder="Location" /> <br />
        <br />
        Distance Traveled: <br />
        <input className="Distance" placeholder="Miles/Kilometer" /> <br />
        <br />
        Price: <br />
        <input className="Price" placeholder="Price Per Day" /> <br />
        <br />
        <div>
          <input className="ImageInput" type="file" accept="image/*"></input>
        </div>
      </div>
    </div>
  );
}
