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
} from "@mui/material";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/src/services/slugifyConfig";
import "../../styles/shop.css";
import Link from "next/link";
import Loading from "../Loading/Loading";

const AccessoryComponent = () => {
  return (
    <Box
      sx={{
        padding: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Section for Phụ kiện */}
      <Box
        ref={containerCatRef}
        sx={{ maxWidth: "1400px", width: "100%", marginBottom: 4 }}
      >
        <div className="all__item">
          <Link href="/shop/cat" className="link__all__item">
            PET ACCESSORIES
          </Link>
        </div>
        <Grid container spacing={2} justifyContent="center">
          {currentCats.map((breed) => (
            <Grid
              item
              xs={6} // 2 items per row on phone screens
              sm={4} // 3 items per row on tablet screens
              md={3}
              lg={2} // 5 items per row on large screens
              key={breed._id}
              display="flex"
              justifyContent="center"
              sx={{
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
              onClick={() =>
                changePage(breed.petSpecies.nameSpecies, breed.nameBreed)
              }
            >
              <Card sx={{ maxWidth: 300 }}>
                {breed.imgBreed && breed.imgBreed.length > 0 && (
                  <CardMedia
                    component="img"
                    height="280"
                    image={breed.imgBreed[0]}
                    alt={breed.nameBreed}
                    loading="lazy"
                  />
                )}
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "1rem",
                        md: "1rem",
                        lg: "1rem",
                      },
                    }}
                  >
                    {breed.nameBreed}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    Species: {breed.petSpecies.nameSpecies}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Pagination
            count={Math.ceil(cats.length / itemsPerPage)}
            page={pageCat}
            onChange={handleChangePageCat}
            color="primary"
          />
        </Box>
      </Box>

      {/* Section for Thức ăn */}
      <Box
        ref={containerCatRef}
        sx={{ maxWidth: "1400px", width: "100%", marginBottom: 4 }}
      >
        <div className="all__item">
          <Link href="/shop/cat" className="link__all__item">
            PET FOOD
          </Link>
        </div>
        <Grid container spacing={2} justifyContent="center">
          {currentCats.map((breed) => (
            <Grid
              item
              xs={6} // 2 items per row on phone screens
              sm={4} // 3 items per row on tablet screens
              md={3}
              lg={2} // 5 items per row on large screens
              key={breed._id}
              display="flex"
              justifyContent="center"
              sx={{
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
              onClick={() =>
                changePage(breed.petSpecies.nameSpecies, breed.nameBreed)
              }
            >
              <Card sx={{ maxWidth: 300 }}>
                {breed.imgBreed && breed.imgBreed.length > 0 && (
                  <CardMedia
                    component="img"
                    height="280"
                    image={breed.imgBreed[0]}
                    alt={breed.nameBreed}
                    loading="lazy"
                  />
                )}
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "1rem",
                        md: "1rem",
                        lg: "1rem",
                      },
                    }}
                  >
                    {breed.nameBreed}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    Species: {breed.petSpecies.nameSpecies}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Pagination
            count={Math.ceil(cats.length / itemsPerPage)}
            page={pageCat}
            onChange={handleChangePageCat}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AccessoryComponent;