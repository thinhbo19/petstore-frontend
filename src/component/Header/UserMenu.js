import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  selectAdmin,
  selectIsLoggedIn,
  setLogout,
} from "@/src/services/Redux/useSlice";
import { handleLogin, handleLogout } from "@/src/hooks/useLogout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { handleChangePage } from "@/src/hooks/useChangePage";

const UserMenu = ({ anchorEl, isMenuOpen, handleMenuClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const login = useSelector(selectIsLoggedIn);
  const admin = useSelector(selectAdmin);
  const menuId = "primary-search-account-menu";

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
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
              right: 20,
              width: 25,
              height: 25,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      sx={{ zIndex: "100000" }}
    >
      {login === true ? (
        [
          <MenuItem
            key="profile"
            onClick={() => {
              handleChangePage(router, "profile");
              handleMenuClose;
            }}
          >
            <AccountCircleIcon /> Profile
          </MenuItem>,
          admin === "Admin" && (
            <MenuItem
              key="dashboard"
              onClick={() => {
                handleChangePage(router, "dashboard");
                handleMenuClose;
              }}
            >
              <DashboardIcon />
              Dashboard
            </MenuItem>
          ),
          <MenuItem
            key="order-history"
            onClick={() => {
              handleChangePage(router, "order-history");
              handleMenuClose;
            }}
          >
            <LibraryBooksIcon /> Order History
          </MenuItem>,
          <MenuItem
            key="logout"
            onClick={() => {
              handleLogout(dispatch, router, setLogout);
              handleMenuClose;
            }}
          >
            <LogoutIcon /> Log Out
          </MenuItem>,
        ]
      ) : (
        <MenuItem onClick={() => handleLogin(router)}>Sign In</MenuItem>
      )}
    </Menu>
  );
};

export default UserMenu;
