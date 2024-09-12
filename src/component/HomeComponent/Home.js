"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Link, Grid, Button } from "@mui/material";
import "../../styles/Home.css";
import BannerSlider from "../Slider/Slider";
import Loading from "../Loading/Loading";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

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

export default function Home() {
  const [loading, setLoading] = useState(true);
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
      <BannerSlider />

      {/* Box chứa nội dung About Pet House */}
      <Box
        sx={{
          backgroundColor: "#DAD6D6",
          borderRadius: "10px", // Bo tròn góc
          padding: "20px",
          marginTop: "30px",
          width: "70%", // Chiều rộng 1 nửa
          maxWidth: "600px", // Giới hạn chiều rộng tối đa
          margin: "30px auto", // Căn giữa
          textAlign: "center", // Căn giữa nội dung
        }}
      >
        <Typography variant="h5" gutterBottom>
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
          At Pet House, all the breeds are purebred, well cared for and in good
          health, ready for their new homes.
        </Typography>
        <Link href="#" variant="body1" underline="hover">
          Learn more
        </Link>
      </Box>

      <Box sx={{ backgroundColor: "#F5F5F5", padding: "20px 0" }}>
        {/* Grid chứa các feature */}
        <Grid container spacing={3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box textAlign="center">
                {feature.icon}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Phần hotline */}
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#E63232",
              color: "#fff",
              borderRadius: "20px",
              padding: "10px 20px",
              fontSize: "18px",
            }}
          >
            HOTLINE: 0xxx.xxx.xxx
          </Button>
        </Box>
      </Box>
    </div>
  );
}
