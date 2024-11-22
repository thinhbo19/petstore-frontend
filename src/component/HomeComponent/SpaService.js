"use client";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  Avatar,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SpaIMG from "../../../public/Slider/spa service.jpg";
import SpaIMG1 from "../../../public/Slider/spa1.jpg";
import SpaIMG2 from "../../../public/Slider/spa2.jpg";
import {
  OverlayText,
  OverlayText1,
  OverlayText2,
} from "../OverlayText/OverlayText";
import { Hotel, Spa } from "../Spa&Hotel/SpaHotel";
import { getRatingsByType } from "@/src/services/apiBooking";

const SpaService = ({ spas, hotels }) => {
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("hotel");
  const [ratings, setRatings] = useState([]);

  const topRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getRatingsByType(
          activeButton === "hotel" ? "Hotel" : "Spa"
        );
        setRatings(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeButton]);

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        {/* About */}
        <Box sx={{ margin: "20px 0", width: "100%" }}>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
              lineHeight: 1.2,
            }}
            component="h2"
          >
            Welcome to PET SHOP! We are thrilled to invite you to our Beauty Spa
            & Hotel Service. Discover exclusive pet accessories and treats for
            your beloved pets!
          </Typography>
        </Box>

        {/* Info Section */}
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
        <div ref={topRef}></div>

        {/* Booking Section */}
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

        {/* Display Services */}
        {activeButton === "spa" ? (
          <Spa spas={spas} />
        ) : (
          <Hotel hotels={hotels} />
        )}

        {/* Ratings Slider */}
        <Box sx={{ marginTop: "40px" }}>
          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Customer Reviews
          </Typography>
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 3 },
            }}
            modules={[Pagination]}
            style={{ padding: "0 20px" }}
          >
            {ratings.map((rating, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    src={rating.postBy.Avatar}
                    alt={rating.postBy.username}
                    sx={{
                      width: 80,
                      height: 80,
                      marginBottom: "10px",
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {rating.postBy.username}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#555", marginBottom: "10px" }}
                  >
                    {new Date(rating.dateComment).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ marginBottom: "10px", color: "#555" }}
                  >
                    {rating.comment}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "#fbc02d" }}
                  >
                    {"⭐".repeat(rating.star)}
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

export default SpaService;
