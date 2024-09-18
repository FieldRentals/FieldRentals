import React from "react";
import "./OurServices.css";
import SettingImage from "../../../images/Capture-removebg-preview.png";

const Card = ({ title, content }) => {
  return (
    <div className="OurServicesCard">
      <img src={SettingImage} alt="SettingIcon" />
      <div className="OurServicesCardTitle">{title}</div>
      <div className="OurServicesCardContent">{content}</div>
    </div>
  );
};

export default function OurServices() {
  return (
    <div className="OurServices">
      <div className="OurServicesTitle">Our Services.</div>
      <div className="OurServicesRow">
        <Card
          title={"Equipment Rental"}
          content={
            "Access a diverse fleet of high-quality farm machinery for rent, including tractors, combines, plows, and more. Our equipment is well-maintained and ready to handle your agricultural needs."
          }
        />
        <Card
          title={"Custom Rental Solutions"}
          content={
            "Tailored rental solutions to meet your specific needs. Whether you require specialized equipment or a unique rental arrangement, we’re here to accommodate."
          }
        />
        <Card
          title={"Seasonal Promotions"}
          content={
            "Special offers and discounts on equipment rentals during peak seasons or for long-term rentals."
          }
        />
      </div>
      <div className="OurServicesRow">
        <Card
          title={"Rental History"}
          content={
            "Rental history is a record of a tenant's previous rental experiences, including payment habits and references. It's used by landlords to assess the reliability of potential tenants."
          }
        />
        <Card
          title={"Weather Forecast"}
          content={
            "Weather forecasts predict future atmospheric conditions like temperature, precipitation, and wind. They help people plan activities and prepare for changing weather."
          }
        />
        <Card
          title={"Crop Management"}
          content={
            "Crop management involves optimizing planting, irrigation, and pest control to enhance crop growth and yield. It ensures sustainable farming by efficiently using resources and minimizing losses."
          }
        />
      </div>
    </div>
  );
}
