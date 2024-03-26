import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Screen/Home/Home";
import LoginSignup from "./Screen/Login/LoginSignup";
import ScrollButton from "./Component/ScrollButton/ScrollButton";
import Footer from "./Component/Footer/Footer";
import AdminScreen from "./Screen/AdminScreen/AdminScreen";

function App() {
  const currentPath = useLocation().pathname;

  return (
    <div className="container">
      {currentPath !== "/login" && currentPath !== "/dashboard" && <Navbar />}{" "}
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<AdminScreen />} />
      </Routes>
      {currentPath !== "/login" && currentPath !== "/dashboard" && <Footer />}
      <ScrollButton />
    </div>
  );
}

export default App;
