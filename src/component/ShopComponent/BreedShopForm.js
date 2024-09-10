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
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/src/services/slugifyConfig";
import "../../styles/shop.css";
import Link from "next/link";
import Loading from "../Loading/Loading";
import DrawerBreed from "./Sorting/DrawerBreed";

const BreedShopForm = ({ nameSpecies, data, catData, dogData }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const itemsPerPage = 30;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const changePage = (species, breed) => {
    router.push(`/shop/${generateSlug(species)}/${generateSlug(breed)}`);
  };

  const startIndexDog = (page - 1) * itemsPerPage;
  const endIndexDog = page * itemsPerPage;
  const currentData = data.slice(startIndexDog, endIndexDog);

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
        <div style={{ textAlign: "left" }} className="all__item">
          <Button
            variant="outlined"
            startIcon={<SortIcon />}
            onClick={toggleDrawer(true)}
          >
            View Products By Price
          </Button>
        </div>

        <DrawerBreed
          nameSpecies={nameSpecies}
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          dogData={dogData}
          catData={catData}
        />

        <Grid container spacing={2} justifyContent="center">
          {currentData.map((breed) => (
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
                        xs: "1rem", // small font size for extra small screens
                        sm: "1.2rem", // slightly larger font size for small screens
                        md: "1.5rem", // medium font size for medium screens
                        lg: "1.8rem", // larger font size for large screens
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
            count={Math.ceil(data.length / itemsPerPage)}
            page={page}
            onChange={handleChangePageDog}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BreedShopForm;
