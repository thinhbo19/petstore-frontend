"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneOrder } from "@/src/services/apiOrder";
import { selectCart, removeCart } from "@/src/services/Redux/CartSlice";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Alert,
  Divider,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const OrderDetail = ({ orderId }) => {
  const accessToken = useSelector(selectAccessToken);
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartUser = useSelector(selectCart);
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getOneOrder(orderId, accessToken);
      const orderData = res?.data;
      setOrderDetail(orderData);

      for (const orderProduct of orderData.products) {
        const matchingProduct = cartUser.find(
          (cartProduct) =>
            cartProduct.id === orderProduct.id &&
            cartProduct.quantity === orderProduct.count
        );
        if (matchingProduct) {
          dispatch(removeCart(matchingProduct.id));
        }
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch order details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  if (accessToken === null) {
    Swal.fire({
      icon: "warning",
      title: "You must login!",
      text: "Please login!",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      router.push("/login");
    });
  }

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

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!orderDetail) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6">No order details found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: "1rem",
        marginTop: { xs: "5rem", md: "5rem" },
        marginBottom: "5rem",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
              Product List
            </Typography>
            <List>
              {orderDetail.products.map((product, index) => (
                <React.Fragment key={product.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar variant="rounded">
                        <Image
                          src={product.img || "/placeholder.svg"}
                          alt={product.name}
                          width={50}
                          height={50}
                          objectFit="cover"
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Quantity: {product.count}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "red",
                        minWidth: "80px",
                        textAlign: "center",
                        alignSelf: "center",
                      }}
                    >
                      {(product.count * product.price).toLocaleString("vi-VN")}{" "}
                      VNĐ
                    </Typography>
                  </ListItem>
                  {index < orderDetail.products.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="right" alignItems="flex-end">
              <Typography
                variant="subtitle1"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                Total:{" "}
                <Typography
                  sx={{ fontWeight: "bold", color: "red" }}
                  variant="subtitle1"
                >
                  {orderDetail.totalPrice?.toLocaleString("vi-VN") || "N/A"} VND
                </Typography>
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Responsive Grid cho thông tin hóa đơn */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
              Order Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Order ID: {orderDetail._id}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Customer: {orderDetail.OrderBy.username}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Contact: {orderDetail.OrderBy.mobile} -{" "}
                  {orderDetail.OrderBy.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Address: {orderDetail.address}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Date: {new Date(orderDetail.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Status: <Chip label={orderDetail.status} color="primary" />
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetail;
