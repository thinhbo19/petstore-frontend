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
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
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
import { selectProductFavorites } from "@/src/services/Redux/FavoriteProductSlice";

function isFavorite(product, favorites) {
  return favorites.some((favorite) => favorite.petID === product._id);
}

export default function FavoritesPage() {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();
  const favoritesPetsData = useSelector(selectFavorites);
  const favoritesProductData = useSelector(selectProductFavorites);
  const favoritesData = [...favoritesPetsData, ...favoritesProductData];
  const [favorites, setFavorites] = useState([]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(favoritesData.length / itemsPerPage);

  const currentItems = favoritesData
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .reverse();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                    background: "rgba(255, 255, 255, 0.55)",
                    boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                    backdropFilter: "blur(8.5px)",
                    WebkitBackdropFilter: "blur(8.5px)",
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: { xs: "100%", md: 150 },
                      height: { xs: 180, md: 150 },
                      objectFit: "cover",
                    }}
                    src={favorite.imgPet || favorite.images}
                    alt={favorite.namePet || favorite.images}
                  />
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration: "none",
                        color: "text.primary",
                      }}
                    >
                      {favorite.namePet || favorite.nameProduct}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>
                      {favorite.nameBreed - favorite.nameSpecies ||
                        favorite.category}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      sx={{ marginTop: "0.5rem" }}
                    >
                      {favorite.price} đ
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 1,
                        marginTop: "0.5rem",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleRemoveFavorite(favorite)}
                        sx={{ flexGrow: 1, maxWidth: "150px" }}
                      >
                        Remove
                      </Button>
                      <Link
                        href={
                          favorite.petID
                            ? `/shop/${generateSlug(
                                favorite.nameSpecies
                              )}/${generateSlug(
                                favorite.nameBreed
                              )}/${generateSlug(favorite.namePet)}`
                            : `/accessory/${generateSlug(
                                favorite.nameCate
                              )}/${generateSlug(favorite.nameProduct)}`
                        }
                        passHref
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<MoreIcon />}
                          sx={{ flexGrow: 1 }}
                        >
                          Detail
                        </Button>
                      </Link>
                    </Box>
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
