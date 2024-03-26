// ListIcons.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingBag,
  faBell,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

const ListIcons = () => {
  return (
    <div className="nav__listicon">
      <FontAwesomeIcon className="nav__icon" icon={faHeart} />
      <FontAwesomeIcon className="nav__icon" icon={faShoppingBag} />
      <FontAwesomeIcon className="nav__icon" icon={faBell} />
      <FontAwesomeIcon className="nav__icon" icon={faCircleUser} />
    </div>
  );
};

export default ListIcons;
