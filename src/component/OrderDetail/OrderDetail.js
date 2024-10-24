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
  Button,
} from "@mui/material";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/toast.css";
import axios from "axios";
import { apiUrlOrder } from "@/src/services/config";

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

  const handleChangeStatus = async (status) => {
    setLoading(true);
    try {
      await axios.patch(
        `${apiUrlOrder}/update/${orderDetail?._id}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      fetchData();
      toast.success(`${status} successfully`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getChipColor = (status) => {
    switch (status) {
      case "Processing":
        return "blue";
      case "Cancelled":
        return "red";
      case "Shipping":
        return "#FB5631";
      case "Successfully":
        return "green";
      default:
        return "default";
    }
  };

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
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: { xs: "center", md: "left" },
              }}
              variant="h6"
              gutterBottom
            >
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
                          <Typography
                            variant="body2"
                            sx={{
                              color: "red",
                              fontWeight: "bold",
                            }}
                          >
                            {(product.count * product.price).toLocaleString(
                              "vi-VN"
                            )}{" "}
                            VNĐ
                          </Typography>
                        </React.Fragment>
                      }
                    />
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
                Total:
                <Typography
                  sx={{ fontWeight: "bold", color: "red", marginLeft: "5px" }}
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
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: { xs: "center", md: "left" },
              }}
              variant="h6"
              gutterBottom
            >
              Order Information
            </Typography>
            <Grid container spacing={2}>
              {[
                { title: "Order ID", value: orderDetail._id },
                { title: "Customer", value: orderDetail.OrderBy.username },
                {
                  title: "Contact",
                  value: `${orderDetail.OrderBy.mobile} - ${orderDetail.OrderBy.email}`,
                },
                { title: "Address", value: orderDetail.address },
                {
                  title: "Date",
                  value: new Date(orderDetail.createdAt).toLocaleDateString(),
                },
                {
                  title: "Status",
                  value: (
                    <Chip
                      label={orderDetail.status}
                      sx={{
                        backgroundColor: getChipColor(orderDetail.status),
                        color: "white",
                      }}
                    />
                  ),
                },
              ].map((info, index) => (
                <Grid item xs={12} key={index}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {info.title}:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        {info.value}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {orderDetail.status === "Processing" && (
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ mt: 2 }}
                      onClick={() => handleChangeStatus("Cancelled")}
                    >
                      Cancel Order
                    </Button>
                  )}

                  {orderDetail.status === "Shipping" && (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mt: 2 }}
                      onClick={() => handleChangeStatus("Successfully")}
                    >
                      Package Received
                    </Button>
                  )}

                  {orderDetail.status === "Successfully" && (
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                      Review
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetail;
