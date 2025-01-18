// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SharkDashboard from "./pages/SharkDashboard";
import PitcherDashboard from "./pages/PitcherDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shark" element={<SharkDashboard />} />
        <Route path="/pitcher" element={<PitcherDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;