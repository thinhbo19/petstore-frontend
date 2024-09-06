import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";
import { selectAdmin, selectIsLoggedIn } from "@/src/services/Redux/useSlice";
import SearchBar from "./SearchBar";
import MenuItems from "./MenuItems";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import LeftMenu from "./LeftMenu";
import { handleChangePage } from "@/src/hooks/useChangePage";
import { useRouter } from "next/navigation";
import LogoWeb from "../../../public/logo.svg";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [leftMenuAnchorEl, setLeftMenuAnchorEl] = React.useState(null);

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLeftMenuOpen = Boolean(leftMenuAnchorEl);

  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuLeftOpen = (event) => {
    setLeftMenuAnchorEl(event.currentTarget);
  };

  const handleLeftMenuClose = () => {
    setLeftMenuAnchorEl(null);
  };

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
            <MenuItems />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SearchBar />

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
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar src="/static/images/avatar/1.jpg" />
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
      <MobileMenu
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
      />
      <UserMenu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
      />
      <LeftMenu
        leftMenuAnchorEl={leftMenuAnchorEl}
        isLeftMenuOpen={isLeftMenuOpen}
        handleLeftMenuClose={handleLeftMenuClose}
      />
    </Box>
  );
};

export default Header;
