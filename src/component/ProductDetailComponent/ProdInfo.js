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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addCart } from "@/src/services/Redux/CartSlice";
import {
  addProductFavorite,
  removeProductFavorite,
} from "@/src/services/Redux/FavoriteProductSlice";
import { removeFavorite } from "@/src/services/Redux/FavoriteSlice";
import { generateSlug } from "@/src/services/slugifyConfig";

function isFavorite(product, favorites) {
  return favorites.some((favorite) => favorite.productID === product._id);
}

const ProdReviews = ({ prodData, accessToken }) => {
  const [mainImage, setMainImage] = useState(prodData.images[0]);
  const [favorites, setFavoritesProd] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const res = await getFavorites(accessToken);
          setFavoritesProd(res?.favorites);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [accessToken]);

  const handleLikeClick = async () => {
    if (!accessToken) {
      Swal.fire({
        title: "LOGIN",
        text: "You are not logged in yet!!!",
        icon: "warning",
      });
    } else {
      const isCurrentlyFavorite = isFavorite(prodData, favorites);
      const updatedFavorites = isCurrentlyFavorite
        ? favorites.filter((f) => f.productID !== prodData._id)
        : [...favorites, { productID: prodData._id, ...prodData }];

      setFavoritesProd(updatedFavorites);

      try {
        const res = await axios.put(
          `${apiUrlUser}/favoriteProduct`,
          {
            productID: prodData._id,
            images: prodData.images[0],
            nameProduct: prodData.nameProduct,
            nameCate: prodData.category.nameCate,
            price: prodData.price,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (
          res.data.message ===
          "The product has been successfully removed from your favorite list"
        ) {
          dispatch(removeFavorite(prodData._id));
          dispatch(removeProductFavorite(prodData._id));
          toast.success(res.data.message);
        } else {
          dispatch(addProductFavorite(prodData));
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error("Error");
      }
    }
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) =>
      prevQuantity < prodData.quantity ? prevQuantity + 1 : prevQuantity
    );
  };

  const handleCart = async () => {
    if (!accessToken) {
      Swal.fire({
        title: "LOGIN",
        text: "You are not logged in yet!!!",
        icon: "warning",
      });
    } else {
      setLoading(true);
      try {
        const res = await axios.put(
          `${apiUrlUser}/cart`,
          {
            id: prodData._id,
            quantity: quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const item = res.data.cart;

        dispatch(
          addCart({
            id: item.id,
            info: item.info,
            quantity: item.quantity,
            newPrice: item.newPrice,
            images: item.images,
          })
        );
        toast.success(res.data.message);
        setQuantity(1);
      } catch (error) {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
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
                    alt={prodData.nameProduct}
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

          {/* Increase/Decrease and Add to Cart buttons */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "left" },
              flexDirection: { xs: "row", md: "row" },
              gap: 2,
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#eeeeee",
                color: "black",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
              }}
            >
              <IconButton
                onClick={handleDecrease}
                sx={{
                  color: "black",
                  "&:hover": { backgroundColor: "#f7f7f7" },
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                }}
                disabled={prodData.sold}
              >
                <RemoveIcon />
              </IconButton>
              <Box
                sx={{
                  fontWeight: "bold",
                  margin: "0 12px",
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                }}
              >
                {prodData.sold ? 0 : quantity}
              </Box>
              <IconButton
                onClick={handleIncrease}
                sx={{
                  color: "black",
                  "&:hover": { backgroundColor: "#f7f7f7" },
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                }}
                disabled={prodData.sold}
              >
                <AddIcon />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              sx={{
                fontWeight: "bold",
                backgroundColor: "#F7482E",
                "&:hover": {
                  backgroundColor: "#D63A2E",
                },
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
              onClick={() => handleCart()}
              disabled={prodData.sold}
            >
              Add To Cart <AddShoppingCartIcon sx={{ marginLeft: "10px" }} />
            </Button>
          </Box>

          {/* Buy Now and Favorite buttons */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "left" },
              flexDirection: { xs: "row", md: "row" },
              gap: 2,
              marginBottom: 2,
            }}
          >
            <Box>
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#0C89F7",
                  "&:hover": {
                    backgroundColor: "#0C89F2",
                  },
                  padding: { xs: "6px", sm: "8px", md: "10px" }, // Responsive padding
                  fontSize: { xs: "0.8rem", sm: "1rem" }, // Responsive font size
                }}
                disabled={prodData.sold}
              >
                Buy Now
              </Button>
            </Box>

            <IconButton onClick={() => handleLikeClick()}>
              <FontAwesomeIcon
                icon={
                  isFavorite(prodData, favorites) ? solidHeart : regularHeart
                }
                size="lg"
                color={isFavorite(prodData, favorites) ? "red" : "black"}
              />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProdReviews;
