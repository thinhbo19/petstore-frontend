import React from "react";
import "./Pets.css";
import { useLocation } from "react-router-dom";

const Pets = () => {
  const currentPath = useLocation().pathname;
  console.log(currentPath);

  return (
    <div className="petlist__container">
      <div className="petlist__main">ádasádasdsadsad</div>
    </div>
  );
};

export default Pets;
