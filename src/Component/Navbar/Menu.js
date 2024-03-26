// Menu.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Menu = () => {
  return (
    <ul className="nav__menu">
      <li className="nav__list">
        <Link className="nav__link" to="/">
          PETS{" "}
          <FontAwesomeIcon className="nav__icon__down" icon={faChevronDown} />
        </Link>
        <Link className="nav__link" to="/">
          FOOD{" "}
          <FontAwesomeIcon className="nav__icon__down" icon={faChevronDown} />
        </Link>
        <Link className="nav__link" to="/">
          VOUCHER{" "}
          <FontAwesomeIcon className="nav__icon__down" icon={faChevronDown} />
        </Link>
        <Link className="nav__link" to="/more">
          MORE{" "}
          <FontAwesomeIcon className="nav__icon__down" icon={faChevronDown} />
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
