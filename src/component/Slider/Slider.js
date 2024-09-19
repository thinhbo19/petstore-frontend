import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Image from "next/image";
import Slder1 from "../../../public/Slider/Slider1.jpg";
import Slder2 from "../../../public/Slider/Slider2.jpg";
import Slder3 from "../../../public/Slider/Slider3.jpg";

const BannerSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Kiểm tra nếu là mobile
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // Kiểm tra nếu là tablet

  const banners = [
    {
      imageUrl: Slder1,
    },
    {
      imageUrl: Slder2,
    },
    {
      imageUrl: Slder3,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "1400px",
        margin: "60px auto",
        overflow: "hidden",
        height: { xs: "200px", sm: "400px", md: "500px", lg: "600px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {banners.map((banner, index) => (
          <Box
            key={index}
            sx={{
              minWidth: "100%",
              position: "relative",
            }}
          >
            <Image
              src={banner.imageUrl}
              alt={banner.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              priority
            />
          </Box>
        ))}
      </Box>

      {/* Nút điều hướng */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "60%",
          left: { xs: "10px", sm: "20px", md: "30px" }, // Responsive button position
          transform: "translateY(-50%)",
          color: "black",
          padding: isMobile ? "5px" : isTablet ? "10px" : "15px", // Responsive padding
          fontSize: isMobile ? "1rem" : isTablet ? "1.5rem" : "2rem", // Responsive icon size
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <ArrowBackIos
          fontSize={isMobile ? "small" : isTablet ? "medium" : "large"}
        />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "60%",
          right: { xs: "10px", sm: "20px", md: "30px" }, // Responsive button position
          transform: "translateY(-50%)",
          color: "black",
          padding: isMobile ? "5px" : isTablet ? "10px" : "15px", // Responsive padding
          fontSize: isMobile ? "1rem" : isTablet ? "1.5rem" : "2rem", // Responsive icon size
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <ArrowForwardIos
          fontSize={isMobile ? "small" : isTablet ? "medium" : "large"}
        />
      </IconButton>
    </Box>
  );
};

export default BannerSlider;
