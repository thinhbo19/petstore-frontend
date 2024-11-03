import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import SpaIcon from "@mui/icons-material/Spa";
import BedIcon from "@mui/icons-material/Bed";

export function Hotel() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box sx={{ flex: "1" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BedIcon
            sx={{ fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}
          />
          <Typography
            component="h1"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            HOTEL SERVICES
          </Typography>
        </Box>
      </Box>
      <Box sx={{ flex: "1" }}>ad</Box>
    </Box>
  );
}

export function Spa() {
  const [expandedService, setExpandedService] = useState(null);

  const services = [
    {
      title: "Pet Bathing",
      description:
        "A relaxing bath with high-quality shampoos and conditioners to keep your pet's coat clean and shiny.",
    },
    {
      title: "Grooming",
      description:
        "Professional grooming services including haircuts, nail trimming, and ear cleaning.",
    },
    {
      title: "Massage Therapy",
      description:
        "Gentle massage therapy to relax your pet and relieve stress.",
    },
    {
      title: "Flea and Tick Treatment",
      description:
        "Effective treatments to keep your pet free from fleas and ticks.",
    },
    {
      title: "Spa Package",
      description:
        "A combination of bathing, grooming, and massage for a complete spa experience.",
    },
  ];

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* info */}
      <Box sx={{ flex: "1" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SpaIcon
            sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" } }}
          />
          <Typography
            component="h1"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            SPA SERVICES
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" },
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.4)",
            color: "#6C6969",
            mt: 1,
          }}
        >
          Treat your pet to a luxurious spa day! Our professional groomers
          provide top-notch services to keep your furry friend looking and
          feeling their best.
        </Typography>
        {/* data spa */}
        <Box sx={{ flex: "1" }}>
          {services.map((service, index) => (
            <Box
              key={index}
              sx={{ margin: "10px 0", width: { xs: "100%", md: "80%" } }}
            >
              <Button
                onClick={() => toggleService(index)}
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  backgroundColor: expandedService === index ? "#ccc" : "#fff",
                  border: "1px solid #6C6969",
                  borderRadius: "8px",
                  padding: "10px",
                  color: "black",
                  textAlign: "left",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "0.8rem", sm: "1.2rem" },
                  }}
                >
                  {service.title}
                </Typography>
                <Typography>{expandedService === index ? "▲" : "▼"}</Typography>
              </Button>
              {expandedService === index && (
                <Typography
                  sx={{
                    marginTop: "5px",
                    padding: "0 10px",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                  }}
                >
                  {service.description}
                </Typography>
              )}
            </Box>
          ))}
        </Box>{" "}
      </Box>
      {/* spa form */}
      <Box sx={{ flex: "1" }}></Box>
    </Box>
  );
}
