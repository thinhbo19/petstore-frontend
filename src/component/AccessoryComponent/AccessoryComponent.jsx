"use client";
import React, { useEffect, useMemo, useState } from "react";
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
  Pagination,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import DrawerAccessory from "./Sorting/DrawerAccessory";
import { usePathname } from "next/navigation";
import { generateSlug } from "@/src/services/slugifyConfig";
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
import { removeFavorite } from "@/src/services/Redux/FavoriteSlice";

function isFavorite(product, favorites) {
  return favorites.some((favorite) => favorite.productID === product._id);
}

const AccessoryComponent = ({ categoryData, groupedProducts }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [optionMenu, setOptionMenu] = useState("Sort Options");
  const pathName = usePathname();
  const productsPerPage = 24;
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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
          dispatch(removeFavorite(accessory._id));
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

  // Bộ lọc theo giá
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const filterByPrice = (accessories) => {
    return accessories.filter(
      (accessory) =>
        accessory.price >= priceRange[0] && accessory.price <= priceRange[1]
    );
  };

  // Toggle Drawer
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

  // Sắp xếp dữ liệu
  const sortData = (accessories, option) => {
    switch (option) {
      case "A to Z":
        return accessories.sort((a, b) =>
          a.nameProduct.localeCompare(b.nameProduct)
        );
      case "Z to A":
        return accessories.sort((a, b) =>
          b.nameProduct.localeCompare(a.nameProduct)
        );
      case "Price: High to Low":
        return accessories.sort((a, b) => b.price - a.price);
      case "Price: Low to High":
        return accessories.sort((a, b) => a.price - b.price);
      default:
        return accessories;
    }
  };

  const formatString = (input) => {
    return input
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleSortOption = (option) => {
    setOptionMenu(option);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalProducts = Object.values(groupedProducts).flat().length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const filteredData = filterByPrice(categoryData);
  const sortedData = useMemo(
    () => sortData(filteredData, optionMenu),
    [filteredData, optionMenu]
  );

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = currentPage * productsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

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
      {/* Nút mở Drawer để lọc theo giá */}
      <div style={{ textAlign: "left" }} className="all__item">
        <Button
          variant="outlined"
          startIcon={<SortIcon />}
          onClick={toggleDrawer(true)}
        >
          View Products {pathName === "/accessory/" ? "By Price" : null}
        </Button>
      </div>

      {/* Drawer lọc sản phẩm */}
      <DrawerAccessory
        data={groupedProducts}
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        priceRange={priceRange}
        handlePriceChange={handlePriceChange}
      />

      {/* Hiển thị danh sách sản phẩm */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {currentData.length === 0 ? (
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ margin: "20px auto" }}
          >
            No product in this price
          </Typography>
        ) : (
          currentData.map((product, index) => {
            const categoryName =
              product.category?.nameCate || "default-category";
            const productName = product.nameProduct
              .replace(/\s+/g, "-")
              .toLowerCase();

            return (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Card
                  sx={{
                    position: "relative",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.05)" },
                    cursor: "pointer",
                    width: "100%",
                    height: 300,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Link
                    href={`/accessory/${generateSlug(
                      categoryName
                    )}/${generateSlug(productName)}`}
                    passHref
                    style={{ textDecoration: "none" }}
                  >
                    <CardMedia
                      component="img"
                      alt={product.nameProduct}
                      image={product.images[0]}
                      sx={{
                        height: 150,
                        objectFit: "contain",
                        padding: 1,
                      }}
                    />
                    <CardContent sx={{ padding: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{
                          fontSize: {
                            xs: "0.7rem",
                            sm: "1rem",
                            md: "1rem",
                          },
                        }}
                      >
                        {product.nameProduct}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "0.7rem",
                            sm: "1rem",
                            md: "1rem",
                          },
                        }}
                        variant="body1"
                        color="red"
                      >
                        {product.price.toLocaleString("vi")} VND
                      </Typography>
                    </CardContent>
                  </Link>

                  {/* Nút yêu thích */}
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleFavorite(product);
                    }}
                    aria-label="add to favorites"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      zIndex: 1,
                      color: isFavorite(product, favorites) ? "red" : "gray",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                  >
                    {isFavorite(product, favorites) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>

      {/* Phân trang */}
      <Divider sx={{ marginY: 2 }} />
      <Box
        display="flex"
        justifyContent="center"
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Container>
  );
};

export default AccessoryComponent;
