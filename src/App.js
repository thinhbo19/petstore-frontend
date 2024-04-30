import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Screen/Home/Home";
import LoginSignup from "./Screen/Login/LoginSignup";
import ScrollButton from "./Component/ScrollButton/ScrollButton";
import Footer from "./Component/Footer/Footer";
import AdminScreen from "./Screen/AdminScreen/AdminScreen";
import EditPetPage from "./Screen/AdminScreen/Pets/EditPet";

function extractPidFromPathname(pathname) {
  const parts = pathname.split("/");
  const pidIndex = parts.findIndex((part) => part === "edit");
  if (pidIndex !== -1 && pidIndex < parts.length - 1) {
    return parts[pidIndex + 1];
  }
  return null;
}

function App() {
  const currentPath = useLocation().pathname;
  const pid = extractPidFromPathname(currentPath);
  return (
    <div className="container">
      {currentPath !== `/edit/${pid}` &&
        currentPath !== "/login" &&
        currentPath !== "/dashboard/addSpecies" &&
        currentPath !== "/dashboard" && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<AdminScreen />} />
        <Route path="/edit/:pid" element={<EditPetPage />} />
      </Routes>
      {currentPath !== `/edit/${pid}` &&
        currentPath !== "/login" &&
        currentPath !== "/dashboard/addSpecies" &&
        currentPath !== "/dashboard" && <Footer />}
      <ScrollButton />
    </div>
  );
}

export default App;
