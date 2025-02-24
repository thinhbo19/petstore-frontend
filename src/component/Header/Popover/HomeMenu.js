import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { handleChangePage } from "@/src/hooks/useChangePage";
import { useRouter } from "next/navigation";

const HomeMenu = ({
  anchorElHome,
  homeMenuId,
  openHome,
  handleMenuHomeClose,
}) => {
  const router = useRouter();

  return (
    <Menu
      sx={{ zIndex: "100000" }}
      anchorEl={anchorElHome}
      id={homeMenuId}
      keepMounted
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      open={openHome}
      onClose={handleMenuHomeClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: 25,
              width: 25,
              height: 25,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
    >
      <MenuItem
        sx={{ fontWeight: "bold" }}
        onClick={() => {
          handleChangePage(router, "About Us");
          handleMenuHomeClose();
        }}
      >
        About Us
      </MenuItem>
      <MenuItem
        sx={{ fontWeight: "bold" }}
        onClick={() => {
          handleChangePage(router, "Spa&Hotel Services");
          handleMenuHomeClose();
        }}
      >
        Spa&Hotel Services
      </MenuItem>
      <MenuItem
        sx={{ fontWeight: "bold" }}
        onClick={() => {
          handleChangePage(router, "Warranty Policy");
          handleMenuHomeClose();
        }}
      >
        Warranty Policy
      </MenuItem>
      <MenuItem
        sx={{ fontWeight: "bold" }}
        onClick={() => {
          handleChangePage(router, "0% Installment Policy");
          handleMenuHomeClose();
        }}
      >
        0% Installment Policy
      </MenuItem>
      <MenuItem
        sx={{ fontWeight: "bold" }}
        onClick={() => {
          handleChangePage(router, "News");
          handleMenuHomeClose();
        }}
      >
        News
      </MenuItem>
      <MenuItem
        sx={{ fontWeight: "bold" }}
        onClick={() => {
          handleChangePage(router, "Contact");
          handleMenuHomeClose();
        }}
      >
        Contact Us
      </MenuItem>
    </Menu>
  );
};

export default HomeMenu;
