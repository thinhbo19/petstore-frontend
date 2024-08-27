// ListIcons.js
import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, setLogout } from "@/src/services/Redux/useSlice";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ListIcons = ({
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const HandleLogout = () => {
    dispatch(setLogout());
    router.push("/login");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleOrder = () => {
    router.push("/profile/order-history");
  };

  return (
    <Box
      sx={{
        flexGrow: 0.2,
        display: { md: "flex" },
        alignItems: "right",
        justifyContent: "flex-end",
      }}
    >
      <Tooltip title="Open settings">
        <IconButton sx={{ p: 1 }}>
          <NotificationsIcon />
        </IconButton>
        <IconButton sx={{ p: 1 }}>
          <ShoppingCartIcon />
        </IconButton>
        <IconButton sx={{ p: 1 }}>
          <NotificationsIcon />
        </IconButton>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
          <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography onClick={handleProfile} textAlign="center">
            Profile
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography onClick={handleOrder} textAlign="center">
            Order
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography onClick={HandleLogout} textAlign="center">
            Log Out
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ListIcons;
