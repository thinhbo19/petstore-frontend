import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCat,
  faChevronDown,
  faDog,
  faHome,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import Dropdown from "./Dropdown";

const Menu = ({ breedList }) => {
  const homeItems = [
    { label: "About Us", link: "/about-us" },
    { label: "Spa Services", link: "/spa" },
    { label: "Warranty Policy", link: "/spa" },
    { label: "Installment Policy", link: "/spa" },
    { label: "Contact", link: "/spa" },
    { label: "Contact", link: "/spa" },
  ];

  const dogItems = breedList
    .filter((breed) => breed.petSpecies.nameSpecies === "Dog")
    .map((breed) => ({
      label: breed.nameBreed,
      link: `/Home/Dogs/${breed._id}`,
    }));
  const catItems = breedList
    .filter((breed) => breed.petSpecies.nameSpecies === "Cat")
    .map((breed) => ({
      label: breed.nameBreed,
      link: `/Home/Cats/${breed._id}`,
    }));

  const voucherItems = [];

  const moreItems = [];

  return (
    <ul className="nav__menu">
      <li className="nav__list">
        <Link className="nav__link" to="/Home">
          HOME <FontAwesomeIcon className="nav__icon__down" icon={faHome} />
        </Link>
        <Dropdown items={homeItems} />
      </li>
      <li className="nav__list">
        <Link className="nav__link" to="Home/Dogs">
          DOGS <FontAwesomeIcon className="nav__icon__down" icon={faDog} />
        </Link>
        <Dropdown items={dogItems} />
      </li>
      <li className="nav__list">
        <Link className="nav__link" to="Home/Cats">
          CATS <FontAwesomeIcon className="nav__icon__down" icon={faCat} />
        </Link>
        <Dropdown items={catItems} />
      </li>
      <li className="nav__list">
        <Link className="nav__link" to="/">
          VOUCHER{" "}
          <FontAwesomeIcon className="nav__icon__down" icon={faTicket} />
        </Link>
      </li>
      <li className="nav__list">
        <Link className="nav__link" to="/more">
          MORE{" "}
          <FontAwesomeIcon className="nav__icon__down" icon={faChevronDown} />
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
