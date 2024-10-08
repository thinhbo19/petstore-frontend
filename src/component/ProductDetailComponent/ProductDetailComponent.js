"use client";

import { Box, Typography, Collapse, Button, IconButton } from "@mui/material";
import ProdInfo from "./ProdInfo";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";
import ProdDescription from "./ProdDescription";
import ProdReviews from "./ProdReviews";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SimilarProducts from "./SimilarProducts";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUid } from "@/src/services/Redux/useSlice";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailComponent = ({ productName, prodData, similarProducts }) => {
  const description = prodData?.description;
  const reviews = prodData?.rating;
  const accessToken = useSelector(selectAccessToken);
  const [loading, setLoading] = useState(true);
  const [openDescription, setOpenDescription] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);
  const userId = useSelector(selectUid);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!prodData) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        textAlign="center"
        padding="20px"
      >
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Pet not found!
        </Typography>

        <Typography variant="body1" color="textSecondary" paragraph>
          Sorry, we couldn’t find the pet you were looking for. It might have
          been removed or the URL is incorrect.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: { xs: 1, sm: 1, md: 1, lg: "0 100px 32px 100px" } }}>
      {/* Pet Information */}
      <ProdInfo prodData={prodData} accessToken={accessToken} />

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
        <ProdDescription description={description} />
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
        <ProdReviews reviews={reviews} />
      </Collapse>

      <SimilarProducts similarProducts={similarProducts} />
    </Box>
  );
};

export default ProductDetailComponent;
