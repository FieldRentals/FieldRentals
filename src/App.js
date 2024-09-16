import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AuthPage from './Components/AuthPage/AuthPage';
import HomePage from './Components/HomePage/HomePage';

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
