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
          {currentUser ? (
            <div onClick={() => navigate("/our-services")}>Our Services</div>
          ) : (
            <>
              <a href="#Home">Home</a>
              <a href="#AboutUs">About Us</a>
              <a href="#OurServices">Service</a>
            </>
          )}
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
              Log In
            </StyledButton>
          )}

          {showProfile ? <Profile setShowProfile={setShowProfile} /> : null}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
