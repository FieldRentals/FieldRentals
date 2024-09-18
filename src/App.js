import "./App.css";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import AuthPage from "./Components/AuthPage/AuthPage";
import HomePage from "./Components/HomePage/HomePage";
import { styled, Button, TextField } from "@mui/material";
import { AuthProvider, useAuth } from "./AuthContext";
import { useContext } from "react";
import { signOutUser } from "./Firebase/authFunction";

export const StyledButton = styled(Button)(() => ({
  textTransform: "none",
  backgroundColor: "#323232",
  borderRadius: "5px",
  fontWeight: 600,
  fontSize: "14px",
  fontFamily: "Poppins",
}));

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "5px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#323232",
    },
    "& input": {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: "14px",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#323232",
  },
}));

function PrivateRouteWithSignIn({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser ? children : <Navigate to="/login-or-register" />;
}

function PrivateRouteWithoutSignIn({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser ? <Navigate to="/" /> : children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login-or-register"
            element={
              <PrivateRouteWithoutSignIn>
                <AuthPage />
              </PrivateRouteWithoutSignIn>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRouteWithSignIn>
                <div>
                  Temp <button onClick={() => signOutUser()}>Sign Out</button>
                </div>
              </PrivateRouteWithSignIn>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
