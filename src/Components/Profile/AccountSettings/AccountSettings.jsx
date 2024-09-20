import React, { useState } from "react";
import { signOutUser } from "../../../Firebase/authFunction";
import "./AccountSettings.css";
import { StyledButton } from "../../../App";

export default function AccountSettings({ setShowProfile }) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOutUser(); // Assuming this returns a promise
    setShowProfile(false);
  };

  return (
    <div className="AccountSettings">
      <div className="AccountSettingsTitle">Sign Out :</div>
      <div className="AccountSettingsButton">
        <StyledButton
          variant="contained"
          disableElevation
          disableFocusRipple
          disableRipple
          onClick={handleSignOut}
          disabled={isSigningOut} // Disable button when signing out
        >
          {isSigningOut ? "Signing out..." : "Sign Out"}
        </StyledButton>
      </div>
    </div>
  );
}
