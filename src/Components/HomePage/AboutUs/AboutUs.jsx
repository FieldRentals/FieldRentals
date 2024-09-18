import React from "react";
import "./AboutUs.css";
import AboutUsImage from "../../../images/trac1.jpeg";

export default function AboutUs() {
  return (
    <div className="AboutUsContainer">
      <div className="AboutUsSubContainer">
        <div className="AboutUsSubContainerImageContainer">
          <img src={AboutUsImage} alt="About Us" />
        </div>
        <div className="AboutUsSubContainerTextContainer">
          <div className="AboutUsSubContainerTextTitle">About Us.</div>
          <div>
            Welcome to FieldRentals, your go-to destination for reliable and
            high-quality farm equipment rentals. With a deep-rooted passion for
            agriculture and a commitment to supporting local farmers, we provide
            a wide range of well-maintained machinery to help you get the job
            done efficiently. From tractors and plows to harvesters and more,
            our equipment is designed to meet the diverse needs of modern
            farming.
          </div>
          <div>
            Our mission is simple: to offer top-notch equipment at competitive
            prices, backed by exceptional customer service. Whether you’re a
            seasoned farmer or a weekend hobbyist, our easy-to-use rental
            platform ensures a seamless experience from booking to delivery.
            Trust FieldRentals to equip you with the tools you need for success,
            and let us help you cultivate excellence on your farm.
          </div>
        </div>
      </div>
    </div>
  );
}
