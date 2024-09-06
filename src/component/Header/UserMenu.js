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
        vertical: "top",
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
    >
      {login === true ? (
        [
          <MenuItem key="profile" onClick={handleMenuClose}>
            Profile
          </MenuItem>,
          admin === "Admin" && (
            <MenuItem key="dashboard" onClick={handleMenuClose}>
              Dashboard
            </MenuItem>
          ),
          <MenuItem key="order-history" onClick={handleMenuClose}>
            Order History
          </MenuItem>,
          <MenuItem
            key="logout"
            onClick={() => handleLogout(dispatch, router, setLogout)}
          >
            Log Out
          </MenuItem>,
        ]
      ) : (
        <MenuItem onClick={() => handleLogin(router)}>Sign In</MenuItem>
      )}
    </Menu>
  );
};

export default UserMenu;
