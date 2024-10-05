"use client";
import React, { useEffect, useState } from "react";
import "../../styles/Header.css";
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
import SearchBar from "./SearchBar";
import MenuItems from "./MenuItems";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import LeftMenu from "./LeftMenu";
import LogoWeb from "../../../public/logo.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import { getCurrentUser } from "@/src/services/apiUser";
import CartMenu from "./Popover/CartMenu";
import FavoriteMenu from "./Popover/FavoriteMenu";
import NotificationMenu from "./Popover/NotificationMenu";
import HomeMenu from "./Popover/HomeMenu";
import PetsMenu from "./Popover/PetsMenu";
import { selectFavorites } from "@/src/services/Redux/FavoriteSlice";
import { selectProductFavorites } from "@/src/services/Redux/FavoriteProductSlice";

const Header = ({ allDog, allCat }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [leftMenuAnchorEl, setLeftMenuAnchorEl] = useState(null);
  const accessToken = useSelector(selectAccessToken);
  const [avatar, setAvatar] = useState(null);
  const [anchorElHome, setAnchorElHome] = useState(null);
  const [anchorElPets, setAnchorElPets] = useState(null);

  const favoritesPetsData = useSelector(selectFavorites);
  const favoritesProductData = useSelector(selectProductFavorites);
  const favoritesData = favoritesPetsData
    .concat(favoritesProductData)
    .sort((a, b) => new Date(b.createAt) - new Date(a.createAt));

  const [anchorElCart, setAnchorElCart] = useState(null);
  const [anchorElFavorite, setAnchorElFavorite] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);

  const handleMenuHomeOpen = (event) => {
    setAnchorElHome(event.currentTarget);
  };
  const handleMenuHomeClose = () => {
    setAnchorElHome(null);
  };
  const handleMenuPetsOpen = (event) => {
    setAnchorElPets(event.currentTarget);
  };
  const handleMenuPetsClose = () => {
    setAnchorElPets(null);
  };
  const handleMenuCartOpen = (event) => {
    setAnchorElCart(event.currentTarget);
  };
  const handleMenuCartClose = () => {
    setAnchorElCart(null);
  };
  const handleMenuFavoriteOpen = (event) => {
    setAnchorElFavorite(event.currentTarget);
  };
  const handleMenuFavoriteClose = () => {
    setAnchorElFavorite(null);
  };
  const handleMenuNotificationOpen = (event) => {
    setAnchorElNotification(event.currentTarget);
  };
  const handleMenuNotificationClose = () => {
    setAnchorElNotification(null);
  };

  const openHome = Boolean(anchorElHome);
  const openPets = Boolean(anchorElPets);

  const openCart = Boolean(anchorElCart);
  const openFavorite = Boolean(anchorElFavorite);
  const openNotification = Boolean(anchorElNotification);

  const homeMenuId = "primary-home-menu";
  const petsMenuId = "primary-pets-menu";

  const cartMenuId = "primary-shopping-cart-menu";
  const favoriteMenuId = "primary-favorite-menu";
  const notificationMenuId = "primary-notification-menu";

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLeftMenuOpen = Boolean(leftMenuAnchorEl);

  const mobileMenuId = "primary-search-account-menu-mobile";

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        const res = await getCurrentUser(accessToken);
        setAvatar(res.Avatar);
      }
    };
    fetchData();
  }, [accessToken]);

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

  return (
    <Box sx={{ flexGrow: 1, zIndex: "1000" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fafafa",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
          color: "black",
          flexGrow: 1,
          position: "fixed",
          top: 0,
          top: "0",
          zIndex: "100000",
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
              className="responsive-logo"
            />
            <MenuItems
              handleMenuHomeOpen={handleMenuHomeOpen}
              handleMenuPetsOpen={handleMenuPetsOpen}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SearchBar />

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                onClick={handleMenuCartOpen}
                size="large"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                onClick={handleMenuFavoriteOpen}
                color="inherit"
              >
                <Badge badgeContent={favoritesData?.length} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                onClick={handleMenuNotificationOpen}
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
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
                <Avatar src={avatar} />
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
        avatar={avatar}
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

      <CartMenu
        anchorElCart={anchorElCart}
        cartMenuId={cartMenuId}
        openCart={openCart}
        handleMenuCartClose={handleMenuCartClose}
      />
      <FavoriteMenu
        favoritesData={favoritesData}
        anchorElFavorite={anchorElFavorite}
        favoriteMenuId={favoriteMenuId}
        openFavorite={openFavorite}
        handleMenuFavoriteClose={handleMenuFavoriteClose}
      />
      <NotificationMenu
        anchorElNotification={anchorElNotification}
        notificationMenuId={notificationMenuId}
        openNotification={openNotification}
        handleMenuNotificationClose={handleMenuNotificationClose}
      />
      <HomeMenu
        anchorElHome={anchorElHome}
        homeMenuId={homeMenuId}
        openHome={openHome}
        handleMenuHomeClose={handleMenuHomeClose}
      />

      <PetsMenu
        allDog={allDog}
        allCat={allCat}
        anchorElPets={anchorElPets}
        petsMenuId={petsMenuId}
        openPets={openPets}
        handleMenuPetsClose={handleMenuPetsClose}
      />
    </Box>
  );
};

export default Header;
