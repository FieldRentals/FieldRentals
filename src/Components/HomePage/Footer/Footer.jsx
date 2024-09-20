import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
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
        <div className="FooterContainerMidText">
          <Link className="FooterLinkText" to="/terms">
            Terms
          </Link>
        </div>
        <div className="FooterContainerMidText">
          <Link className="FooterLinkText" to="/PrivacyPolicy">
            Privacy Policy
          </Link>
        </div>
        <div className="FooterContainerMidText">
          <Link className="FooterLinkText" to="/LegalNotice">
            Legal Notice
          </Link>
        </div>
        <div className="FooterContainerMidText">
          <Link className="FooterLinkText" to="/Accesibility">
            Accesibility
          </Link>
        </div>
      </div>
      <div className="FooterContainerIcons">
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <YouTubeIcon />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon />
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <XIcon />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </a>
      </div>
    </div>
  );
}

export default Footer;
