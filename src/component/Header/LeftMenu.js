import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { handleChangePage } from "@/src/hooks/useChangePage";

const options = [
  "Home",
  "About Us",
  "Spa&Hotel Services",
  "Warranty Policy",
  "News",
  "Pets",
  "Voucher",
  "Product",
];
const ITEM_HEIGHT = 48;

const LeftMenu = ({
  leftMenuAnchorEl,
  isLeftMenuOpen,
  handleLeftMenuClose,
}) => {
  const router = useRouter();
  const leftMenuId = "primary-search-left-menu";

  return (
    <Menu
      anchorEl={leftMenuAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      id={leftMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isLeftMenuOpen}
      onClose={handleLeftMenuClose}
      slotProps={{
        paper: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "25ch",
          },
        },
      }}
    >
      {options.map((option) => (
        <MenuItem
          sx={{ fontWeight: "bold" }}
          key={option}
          selected={option === "Pyxis"}
          onClick={() => handleChangePage(router, option)}
        >
          {option}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default LeftMenu;