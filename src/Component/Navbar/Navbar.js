import React, { useEffect } from "react";
import "./Navbar.css";
import Logo from "../../assets/logo.svg";
import Menu from "./Menu";
import Searchbox from "./Searchbox";
import ListIcons from "./ListIcons";

const Navbar = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".nav__main");
      if (navbar && window.scrollY > 0) {
        navbar.classList.add("hidden");
      } else if (navbar) {
        navbar.classList.remove("hidden");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="nav__main">
      <div className="nav__container">
        <div className="nav__logo">
          <img src={Logo} alt="" className="nav__img" />
          <span>PETSTORE</span>
        </div>

        <Menu />
        <Searchbox />
        <ListIcons />
      </div>
    </div>
  );
};

export default Navbar;
