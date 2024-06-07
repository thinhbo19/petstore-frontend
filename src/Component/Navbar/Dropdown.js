import React from "react";
// import "../Navbar.css";

const Dropdown = ({ items }) => {
  return (
    <div className="drop__main">
      <ul className="dropdown">
        {items.map((item, index) => (
          <a href={item.link} key={index}>
            {item.label}
          </a>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
