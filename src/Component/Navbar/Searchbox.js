// Searchbox.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Searchbox = () => {
  return (
    <div className="nav__searchbox">
      <input type="text" placeholder="Search..." />
      <FontAwesomeIcon icon={faSearch} />
    </div>
  );
};

export default Searchbox;
