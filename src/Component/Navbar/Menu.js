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
import DropdownForPet from "./DropdownForPet";

const Menu = ({ breedList }) => {
  const homeItems = [
    { label: "About Us", link: "/about-us" },
    { label: "Spa Services", link: "/spa" },
    { label: "Warranty Policy", link: "/spa" },
    { label: "Installment Policy", link: "/spa" },
    { label: "Contact", link: "/spa" },
    { label: "Contact", link: "/spa" },
  ];

  const speciesMap = breedList.reduce((acc, breed) => {
    const speciesName = breed.petSpecies.nameSpecies;
    if (!acc[speciesName]) {
      acc[speciesName] = [];
    }
    acc[speciesName].push({
      label: breed.nameBreed,
      link: `/Home/${speciesName}/${breed.nameBreed}`,
    });
    return acc;
  }, {});

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
        <Link className="nav__link" to="#">
          PETS <FontAwesomeIcon className="nav__icon__down" icon={faDog} />
        </Link>
        <DropdownForPet speciesMap={speciesMap} />{" "}
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
