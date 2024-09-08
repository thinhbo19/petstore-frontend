"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Pagination,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { generateSlug } from "@/src/services/slugifyConfig";
import BreadcrumbsComponent from "../Breadcrumbs/Breadcrumbs";

const ShopForm = ({ data }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changePage = (species, breed) => {
    router.push(`/shop/${generateSlug(species)}/${generateSlug(breed)}`);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const currentBreeds = data.slice(startIndex, endIndex);

  return (
    <Box
      sx={{
        padding: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: "1400px", width: "100%" }}>
        <BreadcrumbsComponent pathName={pathName} />
        <Grid container spacing={2} justifyContent="center">
          {currentBreeds.map((breed) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
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
                  />
                )}
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
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
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ShopForm;
