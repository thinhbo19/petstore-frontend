"use client";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SpaIMG from "../../../public/Slider/spa service.jpg";
import SpaIMG1 from "../../../public/Slider/spa1.jpg";
import SpaIMG2 from "../../../public/Slider/spa2.jpg";
import {
  OverlayText,
  OverlayText1,
  OverlayText2,
} from "../OverlayText/OverlayText";
import SpaHotel, { Hotel, Spa } from "../Spa&Hotel/SpaHotel";

const SpaService = ({ spas, hotels }) => {
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("hotel");

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <Box
      sx={{
        marginTop: "5rem",
        width: "100%",
        position: "relative",
        backgroundColor: "#f1f1f1",
      }}
    >
      <OverlayText title="Spa & Hotel Services" IMG={SpaIMG} />

      <Container fixed>
        {/* about */}
        <Box sx={{ margin: "20px 0", width: "100%" }}>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
              lineHeight: 1.2,
            }}
            component="h2"
          >
            Welcome to PET SHOP! We are thrilled to invite you to our Beauty Spa
            & Hotel Service. Discover exclusive pet accessories and treats for
            your beloved pets!
          </Typography>
        </Box>

        {/* info section */}
        <Box
          sx={{
            margin: "20px 0",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            alignItems: "center",
          }}
        >
          <OverlayText1 IMG={SpaIMG1} />
          <OverlayText2 IMG={SpaIMG2} />
        </Box>

        {/* booking section */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          <Button
            variant={activeButton === "hotel" ? "contained" : "outlined"}
            onClick={() => handleButtonClick("hotel")}
            sx={{
              flex: 1,
              marginRight: { xs: 0, md: "10px" },
              fontWeight: activeButton === "hotel" ? "bold" : "normal",
            }}
          >
            Hotel Services
          </Button>
          <Button
            variant={activeButton === "spa" ? "contained" : "outlined"}
            onClick={() => handleButtonClick("spa")}
            sx={{
              flex: 1,
              marginLeft: { xs: 0, md: "10px" },
              fontWeight: activeButton === "spa" ? "bold" : "normal",
            }}
          >
            Spa Service
          </Button>
        </Box>

        {activeButton === "spa" && <Spa spas={spas} />}
        {activeButton === "hotel" && <Hotel hotels={hotels} />}
      </Container>
    </Box>
  );
};

export default SpaService;
