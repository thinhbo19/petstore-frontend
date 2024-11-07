"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  Button,
  Alert,
  Menu,
  MenuItem,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/src/services/slugifyConfig";
import "../../styles/shop.css";
import Loading from "../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import DrawerPet from "./Sorting/DrawerPet";
import { sortingPets } from "@/src/services/apiPet";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import Swal from "sweetalert2";
import axios from "axios";
import { apiUrlUser } from "@/src/services/config";
import { getFavorites } from "@/src/services/apiUser";
import {
  addFavorite,
  removeFavorite,
} from "@/src/services/Redux/FavoriteSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function isFavorite(product, favorites) {
  return favorites.some((favorite) => favorite.petID === product._id);
}

const PetShopForm = ({ breedName, dataBreed, catData, dogData }) => {
  const router = useRouter();
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [data, setData] = useState(dataBreed);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const itemsPerPage = 18;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [optionMenu, setOptionMenu] = useState("Sort Options");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const res = await getFavorites(accessToken);
          setFavorites(res?.favorites);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [accessToken]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (page) {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  const handleChangePageDog = (event, newPage) => {
    setPage(newPage);
  };

  const changePage = (species, breed, pet) => {
    router.push(
      `/shop/${generateSlug(species)}/${generateSlug(breed)}/${generateSlug(
        pet
      )}`
    );
  };

  const handleLikeClick = async (pet) => {
    if (!accessToken) {
      Swal.fire({
        title: "LOGIN",
        text: "You are not logged in yet!!!",
        icon: "warning",
      });
    } else {
      const isCurrentlyFavorite = isFavorite(pet, favorites);
      const updatedFavorites = isCurrentlyFavorite
        ? favorites.filter((f) => f.petID !== pet._id)
        : [...favorites, { petID: pet._id, ...pet }];

      setFavorites(updatedFavorites);

      try {
        const res = await axios.put(
          `${apiUrlUser}/favoritePet`,
          {
            petID: pet._id,
            imgPet: pet.imgPet[0],
            namePet: pet.namePet,
            nameBreed: pet.petBreed.nameBreed,
            nameSpecies: pet.petBreed.nameSpecies,
            age: pet.age,
            gender: pet.gender,
            price: pet.price,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (
          res.data.message ===
          "The pet has been successfully removed from your favorite list"
        ) {
          dispatch(removeFavorite(pet._id));
          toast.success(res.data.message);
        } else {
          dispatch(addFavorite(pet));
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    }
  };

  const filterByPrice = (pets) => {
    return pets.filter(
      (pet) => pet.price >= priceRange[0] && pet.price <= priceRange[1]
    );
  };

  const sortData = (pets, option) => {
    switch (option) {
      case "A to Z":
        return pets.sort((a, b) => a.namePet.localeCompare(b.namePet));
      case "Z to A":
        return pets.sort((a, b) => b.namePet.localeCompare(a.namePet));
      case "Price: High to Low":
        return pets.sort((a, b) => b.price - a.price);
      case "Price: Low to High":
        return pets.sort((a, b) => a.price - b.price);
      default:
        return pets;
    }
  };

  const handleSortOption = async (option) => {
    setOptionMenu(option);
    const newBreedName = formatString(breedName);
    const sortedPets = await sortingPets(newBreedName, option);
    setData(sortedPets);
    handleMenuClose();
  };

  const formatString = (input) => {
    return input
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const startIndexDog = (page - 1) * itemsPerPage;
  const endIndexDog = page * itemsPerPage;
  const filteredData = filterByPrice(data);
  const sortedData = useMemo(
    () => sortData(filteredData, optionMenu),
    [filteredData, optionMenu]
  );
  const currentData = sortedData.slice(startIndexDog, endIndexDog);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        padding: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast-container"
      />
      <Box
        ref={containerRef}
        sx={{ maxWidth: "1400px", width: "100%", marginBottom: 4 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: {
              xs: "10px",
              sm: "20px",
            },
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          {/* Button "View Products By Price" */}
          <Button
            startIcon={<SortIcon />}
            onClick={toggleDrawer(true)}
            sx={{
              marginBottom: {
                xs: "10px",
                sm: 0,
              },
              border: "1px solid #FB5431",
              color: "#FB5431",
            }}
          >
            View Products By Price
          </Button>

          {/* Button with dropdown for sorting options */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                marginRight: {
                  xs: 2,
                  sm: 2,
                },
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.875rem",
                },
              }}
            >
              Showing {currentData.length} results
            </Typography>
            <Button
              sx={{ border: "1px solid #FB5431", color: "#FB5431" }}
              variant="outlined"
              onClick={handleMenuClick}
              endIcon={<ArrowDropDownIcon />}
            >
              {optionMenu}
            </Button>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleSortOption("A to Z")}>
              A to Z
            </MenuItem>
            <MenuItem onClick={() => handleSortOption("Z to A")}>
              Z to A
            </MenuItem>
            <MenuItem onClick={() => handleSortOption("Price: High to Low")}>
              Price: High to Low
            </MenuItem>
            <MenuItem onClick={() => handleSortOption("Price: Low to High")}>
              Price: Low to High
            </MenuItem>
          </Menu>
        </Box>

        <DrawerPet
          breedName={breedName}
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          dogData={dogData}
          catData={catData}
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
        />

        <Grid container spacing={2} justifyContent="center">
          {currentData.length === 0 ? (
            <Box
              sx={{
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Alert severity="info">
                There are no products in this price range.
              </Alert>
            </Box>
          ) : (
            currentData.map((pet) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                lg={2}
                key={pet._id}
                display="flex"
                justifyContent="center"
                sx={{
                  position: "relative",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    cursor: "pointer",
                  },
                }}
                onClick={() =>
                  changePage(
                    pet.petBreed.nameSpecies,
                    pet.petBreed.nameBreed,
                    pet.namePet
                  )
                }
              >
                <Card
                  sx={{
                    maxWidth: 300,
                    background: "rgba(255, 255, 255, 0.55)",
                    boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backdropFilter: "blur(8.5px)",
                    WebkitBackdropFilter: "blur(8.5px)",
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                  }}
                >
                  {pet.imgPet && pet.imgPet.length > 0 && (
                    <CardMedia
                      component="img"
                      height="280"
                      image={pet.imgPet[0]}
                      alt={pet.nameBreed}
                      loading="lazy"
                    />
                  )}
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      align="left"
                      sx={{
                        fontSize: {
                          xs: "1rem",
                          sm: "1rem",
                          md: "1rem",
                          lg: "1rem",
                        },
                      }}
                    >
                      {pet.namePet}
                    </Typography>
                    <Typography
                      variant="body2"
                      align="center"
                      className="price"
                    >
                      {pet.price.toLocaleString("vi")}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 20,
                      right: 10,
                      cursor: "pointer",
                      zIndex: 1,
                      fontSize: "1.4rem",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeClick(pet);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        isFavorite(pet, favorites) ? solidHeart : regularHeart
                      }
                      size="lg"
                      color={isFavorite(pet, favorites) ? "red" : "black"}
                    />
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
        {currentData.length !== 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Pagination
              count={Math.ceil(data.length / itemsPerPage)}
              page={page}
              onChange={handleChangePageDog}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PetShopForm;
