import React from "react";
import { Link } from "react-router-dom";
import "./DropdownForPet.css";

const DropdownForPet = ({ speciesMap }) => {
  return (
    <div className="drop__main">
      <div className="dropdown-for-pet">
        {Object.keys(speciesMap).map((species) => (
          <div className="dropdown-section" key={species}>
            <Link to={`/Home/${species}`} className="h4">
              {species}
            </Link>
            <ul>
              {speciesMap[species].map((item) => (
                <li key={item.link}>
                  <Link to={item.link}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownForPet;
