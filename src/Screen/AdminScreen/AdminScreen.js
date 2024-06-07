import React, { useState, useEffect } from "react";
import "./AdminScreen.css";
import Navbar from "./NavbarAdmin/Navbar";
import Species from "./Species/Species";
import Pets from "./Pets/Pets";
import Breeds from "./Breeds/Breeds";
import Users from "./Users/Users";
import Brands from "./Brand/Brands";
import Food from "./Category/Category";
import Product from "./Product/Product";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../services/useSlice";
import { getAllSpecies } from "../../services/apiPet";
import { getAllBreeds } from "../../services/apiPet";
import { getAllPets } from "../../services/apiPet";
import { getAllUsers } from "../../services/appiUser";
const AdminScreen = () => {
  const accessToken = useSelector(selectAccessToken);
  const [speciesList, setSpeciesList] = useState([]);
  const [breedList, setBreedList] = useState([]);
  const [pettList, setPetList] = useState([]);
  const [userList, setUserList] = useState([]);

  const fetchData = async () => {
    try {
      //species
      const data = await getAllSpecies(accessToken);
      setSpeciesList(data.reverse());
      //breed
      const breedData = await getAllBreeds(accessToken);
      setBreedList(breedData.reverse());
      //pets
      const petData = await getAllPets();
      setPetList(petData.reverse());
      //
      //user
      const userData = await getAllUsers(accessToken);
      setUserList(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  return (
    <div className="admincontainer">
      <Navbar />
      <main className="main">
        <Species speciesList={speciesList} fetchData={fetchData} />
        <Breeds
          speciesList={speciesList}
          breedList={breedList}
          fetchData={fetchData}
        />
        <Pets breedList={breedList} pettList={pettList} fetchData={fetchData} />
        <Food />
        <Brands />
        <Product />
        <Users
          userList={userList}
          setUserList={setUserList}
          fetchData={fetchData}
        />
      </main>
    </div>
  );
};

export default AdminScreen;
