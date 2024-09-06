import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { handleChangePage } from "@/src/hooks/useChangePage";

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
        horizontal: "left",
      }}
      id={leftMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isLeftMenuOpen}
      onClose={handleLeftMenuClose}
    >
      <MenuItem
        onClick={() => handleChangePage(router, "home")}
        sx={{ fontWeight: "bold" }}
      >
        HOME
      </MenuItem>
      <MenuItem
        onClick={() => handleChangePage(router, "pets")}
        sx={{ fontWeight: "bold" }}
      >
        PETS
      </MenuItem>
      <MenuItem
        onClick={() => handleChangePage(router, "voucher")}
        sx={{ fontWeight: "bold" }}
      >
        VOUCHER
      </MenuItem>
      <MenuItem
        onClick={() => handleChangePage(router, "more")}
        sx={{ fontWeight: "bold" }}
      >
        MORE
      </MenuItem>
    </Menu>
  );
};

export default LeftMenu;
