import React from "react";
import "./Footer.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <div className="FooterContainer">
      <div className="FooterContainerLogo">FieldRentals</div>
      <div className="FooterContainerLinks">
        <div className="FooterContainerMidText">Terms</div>
        <div className="FooterContainerMidText">Privacy Policy</div>
        <div className="FooterContainerMidText">Legal Notice</div>
        <div className="FooterContainerMidText">Accesibility</div>
      </div>
      <div className="FooterContainerIcons">
        <YouTubeIcon />
        <FacebookIcon />
        <XIcon />
        <InstagramIcon />
        <LinkedInIcon />
      </div>
    </div>
  );
}

export default Footer;
