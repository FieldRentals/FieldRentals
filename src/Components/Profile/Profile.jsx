import React, { useState } from "react";
import "./Profile.css";
import { signOutUser } from "../../Firebase/authFunction";
import { useAuth } from "../../AuthContext";
import PersonalInformation from "./PersonalInformation/PersonalInformation";

export default function Profile({ setShowProfile }) {
  const { currentUser, loading } = useAuth();

  const [mainContent, setMainContent] = useState("Personal Information");

  return (
    <div className="ProfileContainer">
      <div
        className="ProfileBackground"
        onClick={() => setShowProfile(false)}
      />
      <div className="ProfileSubContainer">
        <div className="ProfileSubContainerSideBar">
          <div className="ProfileSubContainerSideBarTitle">Profile</div>
          <button
            className={mainContent === "Personal Information" ? "active" : null}
            onClick={() => setMainContent("Personal Information")}
          >
            Personal Information
          </button>
          <button
            className={mainContent === "Rental History" ? "active" : null}
            onClick={() => setMainContent("Rental History")}
          >
            Rental History
          </button>
          <button
            className={mainContent === "Payment Information" ? "active" : null}
            onClick={() => setMainContent("Payment Information")}
          >
            Payment Information
          </button>
          <button
            className={mainContent === "Equipment Inventory" ? "active" : null}
            onClick={() => setMainContent("Equipment Inventory")}
          >
            Equipment Inventory
          </button>
          <button
            className={mainContent === "Review and Ratings" ? "active" : null}
            onClick={() => setMainContent("Review and Ratings")}
          >
            Review and Ratings
          </button>
          <button
            className={mainContent === "Account Settings" ? "active" : null}
            onClick={() => setMainContent("Account Settings")}
          >
            Account Settings
          </button>
          <button
            className={mainContent === "Support and Help" ? "active" : null}
            onClick={() => setMainContent("Support and Help")}
          >
            Support and Help
          </button>
          <button
            className={mainContent === "Logout" ? "active" : null}
            onClick={() => setMainContent("Logout")}
          >
            Logout
          </button>
        </div>
        <div className="ProfileSubConatinerMainInfo">
          <div className="ProfileSubConatinerMainInfoTitle">{mainContent}</div>
          {mainContent === "Personal Information" ? (
            <PersonalInformation />
          ) : null}
          {mainContent === "Logout" ? (
            <button
              onClick={() => {
                signOutUser();
                setShowProfile(false);
              }}
            >
              Sign Out
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
