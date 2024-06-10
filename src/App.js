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
import { getAllPets } from "./services/apiPet";

function extractPidFromPathname(pathname) {
  const parts = pathname.split("/");
  const pidIndex = parts.findIndex((part) => part === "edit");
  if (pidIndex !== -1 && pidIndex < parts.length - 1) {
    return parts[pidIndex + 1];
  }
  return null;
}

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const pid = extractPidFromPathname(currentPath);
  const [speciesList, setSpeciesList] = useState([]);
  const [breedList, setBreedList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const petData = await getAllPets();
        const species = [
          ...new Set(petData.map((pet) => pet.petBreed.nameSpecies)),
        ];
        const breeds = [
          ...new Set(petData.map((pet) => pet.petBreed.nameBreed)),
        ];
        setSpeciesList(species);
        setBreedList(breeds);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const NohowNavbarAndFooter =
    currentPath !== `/edit/${pid}` &&
    currentPath !== "/login" &&
    currentPath !== "/dashboard/addSpecies" &&
    currentPath !== "/dashboard" &&
    currentPath !== "/dashboard/statistical";

  const noShowBreadcrumb =
    currentPath === "/Home" && currentPath === "/" && currentPath === "login";

  const isSubPageOfHome = currentPath.startsWith("/Home/");
  return (
    <div className="container">
      {NohowNavbarAndFooter && <Navbar />}
      {noShowBreadcrumb && <ActiveLastBreadcrumb />}
      {isSubPageOfHome && <ActiveLastBreadcrumb />}
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Home />} />
        {speciesList.map((species) => (
          <Route
            key={species}
            path={`/Home/${species}`}
            element={<ListOfBreed />}
          />
        ))}

        {speciesList.map((species) =>
          breedList.map((breed) => (
            <Route
              key={`${species}-${breed}`}
              path={`/Home/${species}/${breed}`}
              element={<ListOfPet />}
            />
          ))
        )}
        <Route path="/dashboard" element={<AdminScreen />} />
        <Route path="/edit/:pid" element={<EditPetPage />} />
      </Routes>
      {NohowNavbarAndFooter && <Footer />}
      <ScrollButton />
    </div>
  );
}

export default App;
