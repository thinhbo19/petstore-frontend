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

const ShopForm = ({ data, dataAccessory }) => {
  const router = useRouter();
  const [pageDog, setPageDog] = useState(1);
  const [pageCat, setPageCat] = useState(1);
  const [pageAccessory, setPageAccessory] = useState(1);
  const [loading, setLoading] = useState(true);
  const containerDogRef = useRef(null);
  const containerCatRef = useRef(null);
  const containerAccessoryRef = useRef(null);
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

  useEffect(() => {
    if (pageAccessory) {
      containerAccessoryRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [pageAccessory]);

  const handleChangePageDog = (event, newPage) => {
    setPageDog(newPage);
  };

  const handleChangePageCat = (event, newPage) => {
    setPageCat(newPage);
  };

  const handleChangePageAccessory = (event, newPage) => {
    setPageAccessory(newPage);
  };

  const changePage = (species, breed) => {
    router.push(`/shop/${generateSlug(species)}/${generateSlug(breed)}`);
  };

  const changePageAccessory = (product) => {
    router.push(`/shop/accessory/${generateSlug(product)}`);
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

  const startIndexAccessory = (pageAccessory - 1) * itemsPerPage;
  const endIndexAccessory = pageAccessory * itemsPerPage;
  const currentAccessories = dataAccessory.slice(
    startIndexAccessory,
    endIndexAccessory
  );

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
          <Link href="/shop/dog" className="link__all__item">
            ALL DOGS
          </Link>
        </div>
        <Grid container spacing={2} justifyContent="center">
          {currentDogs.map((breed) => (
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
          <Link href="/shop/cat" className="link__all__item">
            ALL CATS
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

      {/* Section for Phụ kiện */}
      <Box
        ref={containerAccessoryRef}
        sx={{ maxWidth: "1400px", width: "100%", marginBottom: 4 }}
      >
        <div className="all__item">
          <Link href="/shop/accessory" className="link__all__item">
            PET ACCESSORIES
          </Link>
        </div>
        <Grid container spacing={2} justifyContent="center">
          {currentAccessories.map((accessory) => (
            <Grid
              item
              xs={6} // 2 items per row on phone screens
              sm={4} // 3 items per row on tablet screens
              md={3}
              lg={2} // 5 items per row on large screens
              key={accessory._id}
              display="flex"
              justifyContent="center"
              sx={{
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
              onClick={() => changePageAccessory(accessory.nameProduct)}
            >
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="280"
                  image={accessory.images}
                  alt={accessory.nameProduct}
                  loading="lazy"
                />
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
                    {accessory.nameProduct}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    Category: {accessory.category.nameCate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Pagination
            count={Math.ceil(dataAccessory.length / itemsPerPage)}
            page={pageAccessory}
            onChange={handleChangePageAccessory}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ShopForm;
