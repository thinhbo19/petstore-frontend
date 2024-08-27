import React from "react";
import Box from "@mui/material/Box";

const PopoverPet = ({ handleMouseEnter, handleMouseLeave }) => {
  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="popover-pet"
    ></Box>
  );
};

export default PopoverPet;
