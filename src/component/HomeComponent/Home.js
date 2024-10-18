"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Link as MuiLink, Grid, Button } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import BannerSlider from "../Slider/Slider";
import Loading from "../Loading/Loading";
import Link from "next/link";
import { generateSlug } from "@/src/services/slugifyConfig";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat, faDog, faShop } from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: <LocalShippingIcon sx={{ fontSize: 50, color: "#1C56B9" }} />,
    title: "FREE SHIPPING",
    description: "Nationwide delivery: Airplane, Train, Taxi...",
  },
  {
    icon: <CardGiftcardIcon sx={{ fontSize: 50, color: "#F76546" }} />,
    title: "ATTRACTIVE GIFTS",
    description: "Comes with essential accessories for pets.",
  },
  {
    icon: <ThumbUpIcon sx={{ fontSize: 50, color: "#0DB14B" }} />,
    title: "100% PUREBRED COMMITMENT",
    description: "Purebred pets guaranteed, no crossbreeding.",
  },
  {
    icon: <HealthAndSafetyIcon sx={{ fontSize: 50, color: "#1D9FE8" }} />,
    title: "COMPREHENSIVE HEALTH COVERAGE",
    description: "Deliver healthy pets to customers.",
  },
];

export default function Home({ dogs, cats, prods }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 120,
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home__container">
      {/* Slider banner */}
      <BannerSlider />

      {/* Box for About Pet House */}
      <Box
        sx={{
          backgroundColor: "#DAD6D6",
          borderRadius: "10px",
          padding: { xs: "10px", md: "20px" },
          marginTop: "30px",
          width: { xs: "90%", sm: "80%", md: "70%" },
          maxWidth: "600px",
          margin: "30px auto",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", fontSize: { xs: "20px", md: "24px" } }}
          variant="h5"
          gutterBottom
        >
          About Pet House
        </Typography>
        <Typography variant="body1" paragraph>
          Pet House is a large pet breeding farm in Vietnam and is also a chain
          of stores providing accessories, pet care and beauty services & pet
          hotels.
        </Typography>
        <Typography variant="body1" paragraph>
          With a variety of pet dog and cat breeds, we ensure the quality of the
          breed, standard genetic resources and professional breeding process.
          At Pet House, all the breeds are purebred, well cared for, and in good
          health, ready for their new homes.
        </Typography>
        <MuiLink href="#" variant="body1" underline="hover">
          Learn more
        </MuiLink>
      </Box>

      {/* Feature section */}
      <Box sx={{ backgroundColor: "#F5F5F5", padding: "20px 0" }}>
        <Grid container spacing={3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box textAlign="center">
                {feature.icon}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "16px", md: "18px" },
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Hotline section */}
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#E63232",
              color: "#fff",
              borderRadius: "20px",
              padding: { xs: "8px 16px", md: "10px 20px" },
              fontSize: { xs: "16px", md: "18px" },
            }}
          >
            HOTLINE: 0xxx.xxx.xxx
          </Button>
        </Box>
      </Box>

      {/* Dog Breeds Section */}
      <Box
        data-aos="fade-up"
        sx={{ backgroundColor: "#F5F5F5", padding: { xs: "10px", md: "20px" } }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "18px", md: "20px" },
          }}
          variant="h6"
          textAlign="center"
          gutterBottom
        >
          <FontAwesomeIcon icon={faDog} /> DOG BREEDS
        </Typography>
        <Grid container spacing={2}>
          {dogs.map((dog, index) => (
            <Grid item xs={6} sm={4} md={2.4} key={index}>
              <Link
                href={`/shop/dog/${generateSlug(dog.nameBreed)}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Box
                  textAlign="center"
                  sx={{
                    padding: "10px",
                    backgroundColor: "#FFF",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={dog.imgBreed[0]}
                    alt={dog.nameBreed}
                    style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: "1/1",
                      borderRadius: "10px",
                    }}
                  />
                  <Typography variant="body1" mt={1}>
                    {dog.nameBreed}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Cat Breeds Section */}
      <Box
        data-aos="fade-up"
        sx={{ backgroundColor: "#F5F5F5", padding: { xs: "10px", md: "20px" } }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "18px", md: "20px" },
          }}
          variant="h6"
          textAlign="center"
          gutterBottom
        >
          <FontAwesomeIcon icon={faCat} /> CAT BREEDS
        </Typography>
        <Grid container spacing={2}>
          {cats.map((cat, index) => (
            <Grid item xs={6} sm={4} md={2.4} key={index}>
              <Link
                href={`/shop/cat/${generateSlug(cat.nameBreed)}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Box
                  textAlign="center"
                  sx={{
                    padding: "10px",
                    backgroundColor: "#FFF",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={cat.imgBreed[0]}
                    alt={cat.nameBreed}
                    style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: "1/1",
                      borderRadius: "10px",
                    }}
                  />
                  <Typography variant="body1" mt={1}>
                    {cat.nameBreed}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Cat Breeds Section */}
      <Box
        data-aos="fade-up"
        sx={{ backgroundColor: "#F5F5F5", padding: { xs: "10px", md: "20px" } }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "18px", md: "20px" },
          }}
          variant="h6"
          textAlign="center"
          gutterBottom
        >
          <FontAwesomeIcon icon={faShop} /> ACCESSORIES
        </Typography>
        <Grid container spacing={2}>
          {prods.map((prod, index) => (
            <Grid item xs={6} sm={4} md={2.4} key={index}>
              <Link
                href={`/accessory/${generateSlug(
                  prod.category.nameCate
                )}/${generateSlug(prod.nameProduct)}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Box
                  textAlign="center"
                  sx={{
                    padding: "10px",
                    backgroundColor: "#FFF",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.nameProduct}
                    style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: "1/1",
                      borderRadius: "10px",
                    }}
                  />
                  <Typography variant="body1" mt={1}>
                    {prod.nameProduct}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
