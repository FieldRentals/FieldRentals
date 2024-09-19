import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../App";
import "./NavBar.css";
import { useAuth } from "../../AuthContext";
// import {Button} from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import Profile from "../Profile/Profile";

function NavBar() {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="NavBarContainer">
      <div className="NavBarHead" onClick={() => navigate("/")}>
        FieldRentals
      </div>
      <div className="NavBarButtonContainer">
        <div className="NavBarLinks">
          <a href="#Home">Home</a>
          <a href="#AboutUs">About Us</a>
          <a href="#OurServices">Service</a>
          {/* <a href="#Collection">Collection</a> */}
          {/* {currentUser ? <a href="/dashboard">Dashboard</a> : null} */}
          {currentUser ? <div onClick={() => navigate("/dashboard")}>Dashboard</div>}
        </div>
        <div className="NavBarSign">
          {currentUser ? (
            <AccountCircleIcon
              fontSize="large"
              onClick={() => setShowProfile(true)}
            />
          ) : (
            <StyledButton
              variant="contained"
              disableElevation
              disableFocusRipple
              disableRipple
              onClick={() => navigate("/login-or-register")}
            >
              Sign Up / Log In
            </StyledButton>
          )}

          {showProfile ? <Profile setShowProfile={setShowProfile} /> : null}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
