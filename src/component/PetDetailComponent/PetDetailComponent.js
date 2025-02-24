"use client";

import { Box, Typography, Collapse, Button, IconButton } from "@mui/material";
import PetInfo from "./PetInfo";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";
import PetDescription from "./PetDescription";
import PetReviews from "./PetReviews";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SimilarProducts from "./SimilarProducts";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentPetsByName } from "@/src/services/apiPet";
import formatPetName from "@/src/services/formatPetName";

const PetDetailComponent = ({ petName, petData, similarProducts }) => {
  const description = petData?.description;
  const accessToken = useSelector(selectAccessToken);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [openDescription, setOpenDescription] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCurrentPetsByName(formatPetName(petName));
        setReviews(res.pet?.rating);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!petData) {
    return <Typography variant="h4">Pet not found</Typography>;
  }

  return (
    <Box sx={{ padding: { xs: 1, sm: 1, md: 1, lg: "0 100px 32px 100px" } }}>
      {/* Pet Information */}
      <PetInfo petData={petData} accessToken={accessToken} />

      {/* Description */}
      <Button
        onClick={() => setOpenDescription(!openDescription)}
        endIcon={openDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={{
          color: "#000",
          width: "100%",
          textAlign: "left",
          justifyContent: "space-between",
          padding: "12px 16px",
          backgroundColor: openDescription ? "#e0e0e0" : "#f0f0f0",
          border: "1px solid #dcdcdc",
          borderRadius: "8px",
          boxShadow: "none",
          fontWeight: "bold",
          transition: "background-color 0.3s, color 0.3s",
          "&:hover": {
            backgroundColor: "#d5d5d5",
            color: "#000",
          },
          marginBottom: 2,
        }}
      >
        Description
      </Button>
      <Collapse in={openDescription}>
        <PetDescription description={description} />
      </Collapse>

      {/* Reviews */}
      <Button
        onClick={() => setOpenReviews(!openReviews)}
        endIcon={openReviews ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={{
          color: "#000",
          width: "100%",
          textAlign: "left",
          justifyContent: "space-between",
          padding: "12px 16px",
          backgroundColor: openReviews ? "#e0e0e0" : "#f0f0f0",
          border: "1px solid #dcdcdc",
          borderRadius: "8px",
          boxShadow: "none",
          fontWeight: "bold",
          transition: "background-color 0.3s, color 0.3s",
          "&:hover": {
            backgroundColor: "#d5d5d5",
            color: "#000",
          },
        }}
      >
        Reviews
      </Button>
      <Collapse in={openReviews}>
        <PetReviews reviews={reviews} />
      </Collapse>

      {/* Similar Products */}
      <SimilarProducts similarProducts={similarProducts} />
    </Box>
  );
};

export default PetDetailComponent;
