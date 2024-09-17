import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AuthPage from './Components/AuthPage/AuthPage';
import HomePage from './Components/HomePage/HomePage';
import { styled , Button } from '@mui/material';

export const StyledButton = styled(Button)(() => ({
  textTransform: 'none',
  backgroundColor: '#323232',
  borderRadius: '5px',
  fontWeight: 600,
  fontSize: '14px',
  fontFamily: 'Poppins'
}));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login-or-register" element={<AuthPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
