"use client";
import React, { useState } from "react";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Pagination,
  IconButton,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import RemoveIcon from "@mui/icons-material/Remove";
import { generateSlug } from "@/src/services/slugifyConfig";
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from "@/src/services/Redux/FavoriteSlice";
import Swal from "sweetalert2";
import { apiUrlUser } from "@/src/services/config";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreIcon from "@mui/icons-material/More";

function isFavorite(product, favorites) {
  return favorites.some((favorite) => favorite.petID === product._id);
}

export default function FavoritesPage() {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const favoritesData = useSelector(selectFavorites);
  const [favorites, setFavorites] = useState([]);

  // State to manage current page
  const [page, setPage] = useState(1);
  const itemsPerPage = 4; // Number of items per page

  // Calculate total pages
  const totalPages = Math.ceil(favoritesData.length / itemsPerPage);

  // Get items for current page
  const currentItems = favoritesData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Handle remove favorite
  const handleRemoveFavorite = async (petData) => {
    if (!accessToken) {
      Swal.fire({
        title: "LOGIN",
        text: "You are not logged in yet!!!",
        icon: "warning",
      });
    } else {
      const isCurrentlyFavorite = isFavorite(petData, favorites);
      const updatedFavorites = isCurrentlyFavorite
        ? favorites.filter((f) => f.petID !== petData.petID)
        : [...favorites, { petID: petData.petID, ...petData }];

      setFavorites(updatedFavorites);
      try {
        const res = await axios.put(
          `${apiUrlUser}/favoritePet`,
          {
            petID: petData.petID,
            imgPet: petData.imgPet,
            namePet: petData.namePet,
            nameBreed: petData.nameBreed,
            nameSpecies: petData.nameSpecies,
            age: petData.age,
            gender: petData.gender,
            price: petData.price,
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
          dispatch(removeFavorite(petData.petID));
        } else {
          dispatch(addFavorite(petData));
        }
        Swal.fire({
          title: "SUCCESSFULLY",
          text: res.data.message,
          icon: "success",
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "ERROR",
          text: "Something went wrong",
          icon: "error",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        maxWidth: "100%",
        margin: "auto",
        textAlign: "left",
      }}
    >
      {favoritesData.length === 0 ? (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", marginTop: "2rem" }}
        >
          No favorite products found.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {currentItems.map((favorite, index) => (
              <Grid item xs={6} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 150, height: 150, objectFit: "cover" }}
                    image={favorite.imgPet}
                    alt={favorite.namePet}
                  />
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration: "none",
                        color: "text.primary",
                      }}
                    >
                      {favorite.namePet}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>
                      {favorite.nameBreed} - {favorite.nameSpecies}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      sx={{ marginTop: "0.5rem" }}
                    >
                      {favorite.price} đ
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleRemoveFavorite(favorite)}
                      sx={{ marginTop: "0.5rem", zIndex: "100" }}
                    >
                      Remove
                    </Button>{" "}
                    <Link
                      href={`/shop/${generateSlug(
                        favorite.nameBreed
                      )}/${generateSlug(favorite.nameSpecies)}/${generateSlug(
                        favorite.namePet
                      )}`}
                      style={{
                        textDecoration: "none",
                      }}
                      passHref
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<MoreIcon />}
                        sx={{ marginTop: "0.5rem", zIndex: "100" }}
                      >
                        Detail
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
}