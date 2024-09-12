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
      title: "Banner 1",
      description: "Mô tả cho banner 1",
      imageUrl: Slder1,
    },
    {
      title: "Banner 2",
      description: "Mô tả cho banner 2",
      imageUrl: Slder2,
    },
    {
      title: "Banner 3",
      description: "Mô tả cho banner 3",
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
        margin: "0 auto",
        overflow: "hidden",
        height: { xs: "300px", sm: "400px", md: "500px", lg: "600px" }, // Responsive height
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
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: { xs: "10px", sm: "20px" },
                borderRadius: "8px",
                width: { xs: "90%", sm: "70%", md: "50%" }, // Responsive width for text box
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" }, // Responsive font size
                }}
              >
                {banner.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" }, // Responsive font size for description
                }}
              >
                {banner.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Nút điều hướng */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: { xs: "10px", sm: "20px", md: "30px" }, // Responsive button position
          transform: "translateY(-50%)",
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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
          top: "50%",
          right: { xs: "10px", sm: "20px", md: "30px" }, // Responsive button position
          transform: "translateY(-50%)",
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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
