import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Logo from "../../assets/logo.svg";
import Menu from "./Menu";
import Searchbox from "./Searchbox";
import ListIcons from "./ListIcons";
import { getAllBreeds } from "../../services/apiPet";

const Navbar = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [breedList, setBreedList] = useState([]);

  const fetchData = async () => {
    try {
      const breedData = await getAllBreeds();
      setBreedList(breedData.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`nav__main ${scrollDirection === "down" ? "hide" : "show"}`}
    >
      <div className="nav__container">
        <div className="nav__logo">
          <img src={Logo} alt="" className="nav__img" />
          <div className="flip-animation">
            <span>P</span>
            <span>E</span>
            <span>T</span>
            <span>S</span>
            <span>H</span>
            <span>O</span>
            <span>P</span>
            <span>.</span>
          </div>
        </div>

        <Menu breedList={breedList} />
        <Searchbox />
        <ListIcons />
      </div>
    </div>
  );
};

export default Navbar;
