import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState } from "react";
import { getFavorites } from "@/src/services/apiUser";
import axios from "axios";
import { apiUrlUser } from "@/src/services/config";

import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function isFavorite(product, favorites) {
  return favorites.some((favorite) => favorite.productID === product._id);
}

const ProdReviews = ({ prodData, accessToken }) => {
  const [mainImage, setMainImage] = useState(prodData.images[0]);
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const res = await getFavorites(accessToken);
          setFavorites(res?.favorites);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [accessToken]);

  const handleLikeClick = async () => {};

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  return (
    <Paper
      elevation={8}
      sx={{ padding: 3, marginBottom: 4, position: "relative" }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast-container"
      />
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "50%",
            zIndex: "1000",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Grid container spacing={4}>
        {/* Left side: images */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                gap: 2,
                overflowX: "auto",
                mb: 2,
                maxWidth: { xs: "100%", md: "100px" },
              }}
            >
              {prodData.images.map((image, index) => (
                <IconButton
                  key={index}
                  onClick={() => handleImageClick(image)}
                  sx={{
                    padding: 0,
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index}`}
                    width={100}
                    height={100}
                    style={{ borderRadius: "8px", cursor: "pointer" }}
                  />
                </IconButton>
              ))}
            </Box>
            <Box
              sx={{
                flex: 1,
                position: "relative",
                width: "100%",
                height: 0,
                paddingBottom: "100%",
              }}
            >
              <Image
                src={mainImage}
                alt={prodData.nameProduct}
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: "8px" }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "1.5rem",
                sm: "1.5rem",
                md: "1.5rem",
                lg: "2rem",
              },
              textAlign: {
                xs: "center",
                sm: "center",
                md: "left",
                lg: "left",
              },
            }}
            variant="h3"
            gutterBottom
          >
            {prodData.nameProduct}
          </Typography>
          <Divider></Divider>
          <Typography
            sx={{
              fontSize: {
                xs: "1.2rem",
                sm: "1.3rem",
                md: "1.4rem",
                lg: "1.5rem",
              },
            }}
            variant="h5"
            color="text.secondary"
            gutterBottom
          >
            Category: {prodData.category.nameCate}
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "1.2rem",
                sm: "1.3rem",
                md: "1.4rem",
                lg: "1.5rem",
              },
            }}
            variant="h5"
            color="red"
            gutterBottom
          >
            {prodData.price.toLocaleString()} đ
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: {
                    xs: "1rem",
                    sm: "1.2rem",
                  },
                  textAlign: {
                    xs: "center",
                    sm: "left",
                  },
                }}
                color="text.secondary"
                gutterBottom
              >
                {prodData.shortTitle}
              </Typography>
            </Grid>
          </Grid>

          <Typography
            sx={{
              color: prodData.sold ? "red" : "green",
              fontWeight: "bold",
              margin: "15px auto",
            }}
          >
            Status: {prodData.sold ? "Sold" : "Available"}
          </Typography>

          <Divider></Divider>

          {/*button buy now*/}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              marginBottom: 2,
              marginTop: 2,
            }}
          >
            <Box>
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                    md: "1rem",
                    lg: "1rem",
                  },
                  padding: {
                    xs: "4px 10px",
                    sm: "6px 10px",
                    md: "6px 10px",
                    lg: "8px 12px",
                  },
                  marginRight: {
                    xs: 1,
                    sm: 1.6,
                    md: 1.8,
                    lg: 2,
                  },
                  backgroundColor: "#F7482E",
                  "&:hover": {
                    backgroundColor: "#D63A2E",
                  },
                }}
              >
                Buy Now
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                    md: "1rem",
                    lg: "1rem",
                  },
                  padding: {
                    xs: "4px 10px",
                    sm: "6px 10px",
                    md: "6px 10px",
                    lg: "8px 12px",
                  },
                  marginRight: {
                    xs: 1,
                    sm: 1.6,
                    md: 1.8,
                    lg: 2,
                  },
                  backgroundColor: "#F7482E",
                  "&:hover": {
                    backgroundColor: "#D63A2E",
                  },
                }}
              >
                Add To Cart <AddShoppingCartIcon sx={{ marginLeft: "10px" }} />
              </Button>
              <IconButton>
                <FontAwesomeIcon
                  icon={
                    isFavorite(prodData, favorites) ? solidHeart : regularHeart
                  }
                  size="lg"
                  color={isFavorite(prodData, favorites) ? "red" : "black"}
                  onClick={() => handleLikeClick()}
                />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProdReviews;
