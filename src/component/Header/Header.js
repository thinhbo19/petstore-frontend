import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import LogoWeb from "../../../public/logo.svg";
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { handleChangePage } from "@/src/hooks/useChangePage";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdmin,
  selectIsLoggedIn,
  setLogout,
} from "@/src/services/Redux/useSlice";
import { handleLogin, handleLogout } from "@/src/hooks/useLogout";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.common.black}`,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.9),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.black,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const login = useSelector(selectIsLoggedIn);
  const admin = useSelector(selectAdmin);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [leftMenuAnchorEl, setLeftMenuAnchorEl] = React.useState(null);

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLeftMenuOpen = Boolean(leftMenuAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuLeftOpen = (event) => {
    setLeftMenuAnchorEl(event.currentTarget);
  };

  const handleLeftMenuClose = () => {
    setLeftMenuAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
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

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Favorite Lists</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );

  const leftMenuId = "primary-search-left-menu";
  const renderLeftMenu = (
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset;
      if (currentScrollTop > lastScrollTop) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fafafa",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
          color: "black",
          flexGrow: 1,
          position: "fixed",
          top: 0,
          transition: "top 0.3s",
          top: showHeader ? "0" : "-100px",
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ display: { xs: "flex", sm: "none" } }}
              onClick={handleMobileMenuLeftOpen}
            >
              <MenuIcon />
            </IconButton>
            <Image
              src={LogoWeb}
              alt="Logo"
              priority
              style={{ display: { xs: "none", sm: "block" } }}
            />
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                flexGrow: 2,
                gap: 2,
              }}
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
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <ShoppingCartIcon
                    onClick={() => handleChangePage(router, "cart")}
                  />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <FavoriteIcon
                    onClick={() => handleChangePage(router, "favorite")}
                  />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon
                    onClick={() => handleChangePage(router, "notification")}
                  />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar />
              </IconButton>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {renderLeftMenu}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
