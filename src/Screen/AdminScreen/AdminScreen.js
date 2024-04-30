import React from "react";
import "./AdminScreen.css";
import Navbar from "./NavbarAdmin/Navbar";
import Species from "./Species/Species";
import Pets from "./Pets/Pets";
import Breeds from "./Breeds/Breeds";
import Users from "./Users/Users";
import Brands from "./Brand/Brands";
import Food from "./Category/Category";
import Product from "./Product/Product";

const AdminScreen = () => {
  return (
    <div className="admincontainer">
      <Navbar />
      <main className="main">
        <Species />
        <Breeds />
        <Pets />
        <Food />
        <Brands />
        <Product />
        <Users />
      </main>
    </div>
  );
};

export default AdminScreen;
