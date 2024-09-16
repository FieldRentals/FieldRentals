import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AuthPage from './Components/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div><Link to="/login-or-register">Login Or Register</Link></div>}/>
        <Route path="/login-or-register" element={<AuthPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
