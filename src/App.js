import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Screen/Home/Home";
import LoginSignup from "./Screen/Login/LoginSignup";
import ScrollButton from "./Component/ScrollButton/ScrollButton";
import Footer from "./Component/Footer/Footer";
import AdminScreen from "./Screen/AdminScreen/AdminScreen";
import EditPetPage from "./Screen/AdminScreen/Pets/EditPet";
import ListOfBreed from "./Screen/Pets/ListOfBreed";
import ActiveLastBreadcrumb from "./Component/Breadcrumb/Breadcrumb";
import ListOfPet from "./Screen/Pets/ListOfPet";
import Filter from "./Component/Filter/Filter";
import { getAllBreeds } from "./services/apiPet";

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
  const [lengthPath, setLengthPath] = useState(0);
  const pid = extractPidFromPathname(currentPath);
  const [namePath, setNamePath] = useState("");
  const [speciesList, setSpeciesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const breedData = await getAllBreeds();
        const species = [
          ...new Set(breedData.map((breed) => breed.petSpecies.nameSpecies)),
        ];
        setSpeciesList(species);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const parts = currentPath.split("/");
    const species = parts[parts.length - 1];
    setLengthPath(parts.length);
    setNamePath(species);
  }, [currentPath]);

  const NohowNavbarAndFooter =
    currentPath !== `/edit/${pid}` &&
    currentPath !== "/login" &&
    currentPath !== "/dashboard/addSpecies" &&
    currentPath !== "/dashboard" &&
    currentPath !== "/dashboard/statistical";

  const noShowBreadcrumb =
    currentPath === "/Home" && currentPath === "/" && currentPath === "login";

  const isSubPageOfHome = currentPath.startsWith("/Home/");

  const showFilter = speciesList.includes(namePath);

  return (
    <div className="container">
      {NohowNavbarAndFooter && <Navbar />}
      {noShowBreadcrumb && <ActiveLastBreadcrumb />}
      {isSubPageOfHome && <ActiveLastBreadcrumb />}
      {showFilter && <Filter namePath={namePath} />}
      {lengthPath === 4 && <Filter namePath={namePath} />}
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Home />} />
        {speciesList.map((species) => (
          <React.Fragment key={species}>
            <Route path={`/Home/${species}`} element={<ListOfBreed />} />
            <Route path={`/Home/${species}/:breed`} element={<ListOfPet />} />
          </React.Fragment>
        ))}
        <Route path="/dashboard" element={<AdminScreen />} />
        <Route path="/edit/:pid" element={<EditPetPage />} />
      </Routes>
      {NohowNavbarAndFooter && <Footer />}
      <ScrollButton />
    </div>
  );
}

export default App;
