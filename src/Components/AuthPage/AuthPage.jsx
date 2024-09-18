import React, { useState } from "react";
import "./AuthPage.css";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  styled,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { StyledButton, StyledTextField } from "../../App";
import { signIn, signUp } from "../../Firebase/authFunction";
import { useNavigate } from "react-router-dom";

const ErrorPopup = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      action={
        <button onClick={onClose} style={{ color: "white" }}>
          Close
        </button>
      }
    >
      <Alert onClose={onClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default function AuthPage() {
  const [isSignupActive, setIsSignupActive] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    let flag = 0;

    if (email === "" || password === "" || confirmPassword === "") {
      flag = 1;
      console.log(password);
      setErrorMsg("Please fill all the fields");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg("Email address is invalid");
      flag = 1;
    } else if (password.length < 8) {
      flag = 1;
      setErrorMsg("Password must be at least 8 characters long");
    } else if (password !== confirmPassword) {
      flag = 1;
      setErrorMsg("Passwords do not match");
    }

    if (flag === 0) {
      console.log("Sign up successful");
      await signUp(email, password);
      navigate("/");
    } else {
      console.log("Sign up failed");
      setShowErrorPopup(true);
    }
  };

  const handleLogIn = async () => {
    let flag = 0;

    if (email === "" || password === "") {
      flag = 1;
      setErrorMsg("Please fill all the fields");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg("Email address is invalid");
      flag = 1;
    } else if (password.length < 8) {
      flag = 1;
      setErrorMsg("Password must be at least 8 characters long");
    }

    if (flag === 0) {
      console.log("Log in successful");
      await signIn(email, password);
      navigate("/");
    } else {
      console.log("Log in failed");
      setShowErrorPopup(true);
    }
  };

  const handleCloseError = () => {
    setShowErrorPopup(false);
  };

  return (
    <div className="AuthPageContainer">
      <div
        className={`AuthPageSubContainer ${
          isSignupActive ? "SignUpActive" : ""
        }`}
      >
        <div className="AuthPageSubContainerFormContainer SignUp">
          <form>
            <div>FieldRentals</div>
            <StyledTextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledTextField
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              size="small"
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <StyledTextField
              fullWidth
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              size="small"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <StyledButton
              variant="contained"
              disableElevation
              disableFocusRipple
              disableRipple
              onClick={handleSignUp}
            >
              Sign Up
            </StyledButton>

            <div className="AuthPageSubContainerFormContainerText">
              <div>
                Already a member?{" "}
                <span onClick={() => setIsSignupActive(false)}>
                  Log in here.
                </span>{" "}
                to get started with FieldRentals.
              </div>
            </div>
          </form>
        </div>

        <div className="AuthPageSubContainerToggleContainer">
          <div className="AuthPageSubContainerTogglePanel AuthPageSubContainerToggleSignUp">
            <div className="Title">Welcome!</div>
            <div>
              Join FieldRentals today and gain access to top-quality farming
              equipment and tools for all your agricultural needs. Simply
              complete the form below to start renting and optimizing your farm
              operations!
            </div>
            <div>
              Already a member?{" "}
              <span onClick={() => setIsSignupActive(false)}>Log in here.</span>{" "}
              to get started with FieldRentals.
            </div>
          </div>

          <div className="AuthPageSubContainerTogglePanel AuthPageSubContainerToggleSignIn">
            <div className="Title">Welcome Back!</div>
            <div>
              Log in to your FieldRentals account to access your dashboard,
              manage your rentals, and explore the latest farming equipment and
              tools.
            </div>
            <div>
              Don’t have an account?{" "}
              <span onClick={() => setIsSignupActive(true)}>Sign up here</span>{" "}
              to get started with FieldRentals.
            </div>
          </div>
        </div>

        <div className="AuthPageSubContainerFormContainer SignIn">
          <form>
            <div>FieldRentals</div>
            <StyledTextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledTextField
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              size="small"
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <StyledButton
              variant="contained"
              disableElevation
              disableFocusRipple
              disableRipple
              onClick={handleLogIn}
            >
              Sign In
            </StyledButton>

            <div className="AuthPageSubContainerFormContainerText">
              <div>
                Don’t have an account?{" "}
                <span onClick={() => setIsSignupActive(true)}>
                  Sign up here
                </span>{" "}
                to get started with FieldRentals.
              </div>
            </div>
          </form>
        </div>
        {showErrorPopup && (
          <div>
            <ErrorPopup
              open={true}
              onClose={handleCloseError}
              message={errorMsg}
            />
          </div>
        )}
      </div>
    </div>
  );
}
