"use client";
import React, { useState, useEffect, useRef } from "react";
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

const PetShopForm = ({ breedName, dataBreed, catData, dogData }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [data, setData] = useState(dataBreed);
  const [loading, setLoading] = useState(true);
  const [likedPets, setLikedPets] = useState(new Set());
  const containerRef = useRef(null);
  const itemsPerPage = 18;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [optionMenu, setOptionMenu] = useState("Sort Options");

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

  const handleLikeClick = (petId) => {
    setLikedPets((prevLikedPets) => {
      const updatedLikedPets = new Set(prevLikedPets);
      if (updatedLikedPets.has(petId)) {
        updatedLikedPets.delete(petId);
      } else {
        updatedLikedPets.add(petId);
      }
      return updatedLikedPets;
    });
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
    setData(sortedPets); // Cập nhật dữ liệu đã sắp xếp
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
  const sortedData = sortData(filteredData, optionMenu);
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
            variant="outlined"
            startIcon={<SortIcon />}
            onClick={toggleDrawer(true)}
            sx={{
              marginBottom: {
                xs: "10px",
                sm: 0,
              },
              color: "black",
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
              sx={{ color: "black" }}
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
                <Card sx={{ maxWidth: 300 }}>
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
                      {pet.price}
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
                      handleLikeClick(pet._id);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={likedPets.has(pet._id) ? solidHeart : regularHeart}
                      size="lg"
                      color={likedPets.has(pet._id) ? "red" : "black"}
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
