import React, { useState } from "react";
import Box from "@mui/material/Box";
import PopoverPet from "../Popover/PopoverPet";
import Link from "next/link";

const PagesNav = ({ handleCloseNavMenu }) => {
  const [showPopoverPet, setShowPopoverPet] = useState(false);

  const handleMouseEnter = () => {
    setShowPopoverPet(true);
  };

  const handleMouseLeave = () => {
    setShowPopoverPet(false);
  };

  return (
    <Box
      position="relative"
      sx={{
        flexGrow: 0.3,
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Link href="/home" className="btn__pages" onClick={handleCloseNavMenu}>
        HOME
      </Link>
      <Link
        href="/shop"
        onClick={handleCloseNavMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="btn__pages"
      >
        PETS
        {showPopoverPet && (
          <PopoverPet
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        )}
      </Link>
      <Link href="/home" className="btn__pages" onClick={handleCloseNavMenu}>
        COUPON
      </Link>
      <Link href="/home" className="btn__pages" onClick={handleCloseNavMenu}>
        MORE
      </Link>
    </Box>
  );
};

export default PagesNav;
