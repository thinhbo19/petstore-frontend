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
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/src/services/slugifyConfig";
import "../../styles/shop.css";
import Link from "next/link";
import Loading from "../Loading/Loading";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const ShopForm = ({ data }) => {
  const router = useRouter();
  const [pageDog, setPageDog] = useState(1);
  const [pageCat, setPageCat] = useState(1);
  const [loading, setLoading] = useState(true);
  const containerDogRef = useRef(null);
  const containerCatRef = useRef(null);
  const itemsPerPage = 8;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (pageDog) {
      containerDogRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [pageDog]);

  useEffect(() => {
    if (pageCat) {
      containerCatRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [pageCat]);

  const handleChangePageDog = (event, newPage) => {
    setPageDog(newPage);
  };

  const handleChangePageCat = (event, newPage) => {
    setPageCat(newPage);
  };

  const changePage = (species, breed) => {
    router.push(`/shop/${generateSlug(species)}/${generateSlug(breed)}`);
  };

  const dogs = data.filter(
    (breed) => breed.petSpecies.nameSpecies.toLowerCase() === "dog"
  );
  const cats = data.filter(
    (breed) => breed.petSpecies.nameSpecies.toLowerCase() === "cat"
  );

  const startIndexDog = (pageDog - 1) * itemsPerPage;
  const endIndexDog = pageDog * itemsPerPage;
  const currentDogs = dogs.slice(startIndexDog, endIndexDog);

  const startIndexCat = (pageCat - 1) * itemsPerPage;
  const endIndexCat = pageCat * itemsPerPage;
  const currentCats = cats.slice(startIndexCat, endIndexCat);

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
      {/* Section for Dogs */}
      <Box
        ref={containerDogRef}
        sx={{ maxWidth: "1400px", width: "100%", marginBottom: 4 }}
      >
        <div className="all__item">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              gutterBottom
              sx={{
                margin: "0",
                padding: "0",
                fontWeight: "bold",
                fontSize: "1.4rem",
              }}
            >
              ALL DOGS
            </Typography>
            <Link
              href="/shop/dog"
              style={{
                textDecoration: "none",
                color: "#007bff",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  color: "black",
                  marginTop: { xs: "8px", sm: "0" },
                }}
              >
                More
                <KeyboardArrowRightIcon />
              </Typography>
            </Link>
          </Box>
          <Divider sx={{ marginBottom: "20px", marginTop: "5px" }} />
        </div>
        <Grid container spacing={2} justifyContent="center">
          {currentDogs.map((breed) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
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
            count={Math.ceil(dogs.length / itemsPerPage)}
            page={pageDog}
            onChange={handleChangePageDog}
            color="primary"
          />
        </Box>
      </Box>

      {/* Section for Cats */}
      <Box
        ref={containerCatRef}
        sx={{ maxWidth: "1400px", width: "100%", marginBottom: 4 }}
      >
        <div className="all__item">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              gutterBottom
              sx={{
                margin: "0",
                padding: "0",
                fontWeight: "bold",
                fontSize: "1.4rem",
              }}
            >
              ALL CATS
            </Typography>
            <Link
              href="/shop/cat"
              style={{
                textDecoration: "none",
                color: "#007bff",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  color: "black",
                  marginTop: { xs: "8px", sm: "0" },
                }}
              >
                More
                <KeyboardArrowRightIcon />
              </Typography>
            </Link>
          </Box>
          <Divider sx={{ marginBottom: "20px", marginTop: "5px" }} />
        </div>
        <Grid container spacing={2} justifyContent="center">
          {currentCats.map((breed) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
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

export default ShopForm;
