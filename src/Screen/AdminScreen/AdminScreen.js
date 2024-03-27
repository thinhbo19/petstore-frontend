import React from "react";
import "./AdminScreen.css";
import Navbar from "./NavbarAdmin/Navbar";
import Species from "./Species/Species";
import Pets from "./Pets/Pets";
import Breeds from "./Breeds/Breeds";
import Users from "./Users/Users";

const AdminScreen = () => {
  return (
    <div className="admincontainer">
      <Navbar />
      <main className="main">
        <Species />
        <Breeds />
        <Pets />
        <Users />
      </main>
    </div>
  );
};

export default AdminScreen;
