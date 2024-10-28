"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import { generateSlug } from "@/src/services/slugifyConfig";
import { usePathname } from "next/navigation";
import CategoryAccessory from "./Sorting/CategoryAccessory";
import Loading from "../Loading/Loading";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "@/src/services/apiUser";
import Swal from "sweetalert2";
import { apiUrlUser } from "@/src/services/config";
import axios from "axios";
import {
  addProductFavorite,
  removeProductFavorite,
} from "@/src/services/Redux/FavoriteProductSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function isFavorite(product, favorites) {
  return favorites.some((favorite) => favorite.productID === product._id);
}

const CategoryComponent = ({ groupedProducts }) => {
  let visibleProducts = {};
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathName = usePathname();
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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

  const handleFavorite = async (accessory) => {
    if (!accessToken) {
      Swal.fire({
        title: "LOGIN",
        text: "You are not logged in yet!!!",
        icon: "warning",
      });
    } else {
      const isCurrentlyFavorite = isFavorite(accessory, favorites);
      const updatedFavorites = isCurrentlyFavorite
        ? favorites.filter((f) => f.productID !== accessory._id)
        : [...favorites, { productID: accessory._id, ...accessory }];

      setFavorites(updatedFavorites);

      try {
        const res = await axios.put(
          `${apiUrlUser}/favoriteProduct`,
          {
            productID: accessory._id,
            images: accessory.images[0],
            nameProduct: accessory.nameProduct,
            nameCate: accessory.category.nameCate,
            price: accessory.price,
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
          dispatch(removeProductFavorite(accessory._id));
          toast.success(res.data.message);
        } else {
          dispatch(addProductFavorite(accessory));
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error("Error");
      }
    }
  };

  const getVisibleProducts = (category) => {
    return visibleProducts[category] || 15;
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
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
      <div style={{ textAlign: "left" }} className="all__item">
        <Button
          variant="outlined"
          startIcon={<SortIcon />}
          onClick={toggleDrawer(true)}
        >
          View Products {pathName === "/accessoty/" ? "By Price" : null}
        </Button>
      </div>
      <CategoryAccessory
        data={groupedProducts}
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
      />

      {Object.keys(groupedProducts).map((category, index) => (
        <Box sx={{ marginTop: "10px" }} key={index} mb={5}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: "10px" }}
          >
            <Typography
              gutterBottom
              sx={{
                margin: "0",
                padding: "0",
                fontWeight: "bold",
                fontSize: "1.4rem",
              }}
            >
              {category}
            </Typography>
            <Link
              href={`/accessory/${generateSlug(category)}`}
              style={{
                textDecoration: "none",
                color: "#007bff",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  color: "black",
                  marginTop: { xs: "8px", sm: "0" },
                }}
              >
                More
                <KeyboardArrowRightIcon />
              </Typography>
            </Link>
          </Box>
          <Divider sx={{ marginBottom: "10px", marginTop: "5px" }} />

          <Grid container spacing={4}>
            {groupedProducts[category]
              .slice(0, getVisibleProducts(category))
              .map((product, index) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                  <Link
                    href={`/accessory/${generateSlug(category)}/${generateSlug(
                      product.nameProduct
                    )}`}
                    passHref
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        position: "relative",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: 6,
                        },
                        padding: 1,
                        background: "rgba(255, 255, 255, 0.55)",
                        boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                        backdropFilter: "blur(8.5px)",
                        WebkitBackdropFilter: "blur(8.5px)",
                        borderRadius: "10px",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                      }}
                    >
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          handleFavorite(product);
                        }}
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          color: isFavorite(product, favorites)
                            ? "red"
                            : "gray",
                          zIndex: 1000,
                        }}
                      >
                        {isFavorite(product, favorites) ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>

                      <CardMedia
                        component="img"
                        sx={{
                          height: { xs: 120, sm: 130, md: 150 },
                          objectFit: "cover",
                        }}
                        image={product.images}
                        alt={product.nameProduct}
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: {
                              xs: "0.7rem",
                              sm: "1rem",
                              md: "1rem",
                            },
                          }}
                          gutterBottom
                        >
                          {product.nameProduct}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="red"
                          sx={{
                            fontWeight: "bold",
                            fontSize: {
                              xs: "0.6rem",
                              sm: "0.9rem",
                              md: "1rem",
                            }, // Responsive font size for price
                          }}
                        >
                          Price: {product.price.toLocaleString("vi")} VND
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default CategoryComponent;
