import React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";

const PageItem = ({ anchorElNav, handleOpenNavMenu, handleCloseNavMenu }) => {
  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
        sx={{ color: "black" }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button className="btn__pages" onClick={handleCloseNavMenu}>
            HOME
          </button>
          <button className="btn__pages" onClick={handleCloseNavMenu}>
            PETS
          </button>
          <button className="btn__pages" onClick={handleCloseNavMenu}>
            COUPON
          </button>
          <button className="btn__pages" onClick={handleCloseNavMenu}>
            MORE
          </button>
        </div>
      </Menu>
    </Box>
  );
};

export default PageItem;
