"use client";
import React, { useEffect, useRef, useState } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchBar";
import SearchResults from "./Popover/SearchResults";
import { generateSlug } from "@/src/services/slugifyConfig";
import { useRouter } from "next/navigation";
import { selectCart } from "@/src/services/Redux/CartSlice";
import { selectNotification } from "@/src/services/Redux/NotificationSlice";

const Header = ({ allDog, allCat, allPets, allProds }) => {
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
  const cartData = useSelector(selectCart);

  const [anchorElCart, setAnchorElCart] = useState(null);
  const [anchorElFavorite, setAnchorElFavorite] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);

  const notificationData = useSelector(selectNotification);
  const notificationUnRead = notificationData.filter(
    (not) => not.status === false
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const searchInputRef = useRef(null);
  const router = useRouter();

  const allResult = [
    ...allPets.map((pet) => ({
      name: pet.namePet,
      img: pet.imgPet[0],
      price: pet.price,
      slug: `/shop/${generateSlug(pet.petBreed.nameSpecies)}/${generateSlug(
        pet.petBreed.nameBreed
      )}/${generateSlug(pet.namePet)}`,
    })),
    ...allProds.map((prod) => ({
      name: prod.nameProduct,
      img: prod.images[0],
      price: prod.price,
      slug: "",
    })),
  ];

  const handleChangePage = (slug) => {
    router.push(slug);
    setSearchTerm("");
    setFilteredResults([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        !event.target.closest(".search-result-item")
      ) {
        setSearchTerm("");
        setFilteredResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      const results = allResult.filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Searching for:", searchTerm);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ededed",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
        color: "black",
        flexGrow: 1,
        position: "fixed",
        top: 0,
        top: "0",
        zIndex: "100000",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: {
            xs: "center",
            sm: "space-between",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ display: { xs: "flex", sm: "flex", md: "none", lg: "none" } }}
            onClick={handleMobileMenuLeftOpen}
          >
            <MenuIcon />
          </IconButton>
          <Image
            src={LogoWeb}
            alt="Logo"
            priority
            className="responsive-logo"
            style={{
              width: { xs: "50px", sm: "80px" },
              height: { xs: "50px", sm: "80px" },
              cursor: "pointer",
            }}
            onClick={() => handleChangePage("/")}
          />
          <MenuItems
            handleMenuHomeOpen={handleMenuHomeOpen}
            handleMenuPetsOpen={handleMenuPetsOpen}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Search ref={searchInputRef}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search....."
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </Search>

          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <IconButton
              onClick={handleMenuCartOpen}
              size="large"
              color="inherit"
            >
              <Badge badgeContent={cartData?.length} color="error">
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
              <Badge badgeContent={notificationData?.length} color="error">
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

      {filteredResults.length > 0 && (
        <SearchResults
          results={filteredResults}
          handleChangePage={handleChangePage}
        />
      )}

      <MobileMenu
        avatar={avatar}
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
        favoritesData={favoritesData}
        cartData={cartData}
      />
      <UserMenu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        handleMobileMenuClose={handleMobileMenuClose}
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
        cartData={cartData}
      />
      <FavoriteMenu
        favoritesData={favoritesData}
        anchorElFavorite={anchorElFavorite}
        favoriteMenuId={favoriteMenuId}
        openFavorite={openFavorite}
        handleMenuFavoriteClose={handleMenuFavoriteClose}
        setAnchorElFavorite={setAnchorElFavorite}
      />
      <NotificationMenu
        anchorElNotification={anchorElNotification}
        notificationMenuId={notificationMenuId}
        openNotification={openNotification}
        handleMenuNotificationClose={handleMenuNotificationClose}
        notificationData={notificationUnRead}
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
    </AppBar>
  );
};

export default Header;
