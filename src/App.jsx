
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage.jsx"
import "./App.css"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
// App.jsx
import React from "react";
import AdminLanding from "./components/AdminLanding";
import SeniorLanding from "./components/SeniorLanding";

function App() {
  return (
    <div>
      <AdminLanding/>
    </div>
  );
}

export default App;


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
