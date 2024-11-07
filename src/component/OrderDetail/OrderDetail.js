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
  Modal,
} from "@mui/material";
import Image from "next/image";
import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/toast.css";
import axios from "axios";
import { apiUrlOrder, apiUrlPets, apiUrlProduct } from "@/src/services/config";
import { getSimplePets } from "@/src/services/apiPet";
import { getProdOrPet, getSimpleProd } from "@/src/services/apiProduct";
import RatingForm from "../RatingForm/RatingForm";

const OrderDetail = ({ orderId }) => {
  const accessToken = useSelector(selectAccessToken);
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState([]);
  const cartUser = useSelector(selectCart);
  const dispatch = useDispatch();
  const router = useRouter();
  const userID = orderDetail?.OrderBy._id;
  const [isRatingFormOpen, setIsRatingFormOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const pathName = usePathname();

  const handleOpenRatingForm = (id) => {
    setIsRatingFormOpen(true);
    setSelectedProductId(id);
  };
  const handleCloseRatingForm = () => {
    setIsRatingFormOpen(false);
    setSelectedProductId(null);
  };
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

      const resPet = await getSimplePets();
      const resProd = await getSimpleProd();

      const resRating = [...resPet, ...resProd];
      setRatings(resRating);
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
      case "Success":
        return "green";
      default:
        return "default";
    }
  };
  const handleRatingSubmit = async (star, comment, feedback_img) => {
    try {
      const formData = new FormData();
      formData.append("star", star);
      formData.append("comment", comment);
      formData.append("postBy", userID);
      feedback_img.forEach((image) => formData.append("feedback_img", image));

      if (!star || !comment) {
        toast.error(`No stars entered or comments missing`);
        return;
      }

      const res = await getProdOrPet(selectedProductId);
      if (res === "Pet") {
        await axios.post(
          `${apiUrlPets}/rating/${selectedProductId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success(`Review successfully`);
      } else if (res === "Prod") {
        await axios.post(
          `${apiUrlProduct}/rating/${selectedProductId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success(`Review successfully`);
      } else {
        console.error(
          "Error fetching data: Invalid response from getProdOrPet"
        );
      }
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
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
      <Typography
        sx={{ textAlign: "center", width: "100%", fontWeight: "bold" }}
        variant="h5"
        gutterBottom
      >
        ORDER DETAIL
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
              {orderDetail.products.map((product, index) => {
                const userHasReviewed =
                  ratings.length > 0 &&
                  ratings.some(
                    (rating) =>
                      rating._id === product.id &&
                      rating.rating.some(
                        (r) => r.postBy === orderDetail.OrderBy._id
                      )
                  );

                return (
                  <React.Fragment key={product.id}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <ListItemAvatar
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
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
                      <Box
                        sx={{
                          width: { xs: "100%", sm: "auto" },
                          flexShrink: 0,
                          mt: { xs: 1, sm: 0 },
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        {orderDetail.status === "Success" &&
                          pathName !== `/dashboard/order/${orderId}` && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleOpenRatingForm(product.id)}
                            >
                              {userHasReviewed ? "Change Rating" : "Rating"}
                            </Button>
                          )}
                      </Box>
                    </ListItem>

                    {index < orderDetail.products.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </React.Fragment>
                );
              })}
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
                { title: "Username", value: orderDetail.OrderBy.username },
                {
                  title: "Contact",
                  value: `${orderDetail.OrderBy.mobile} - ${orderDetail.OrderBy.email}`,
                },
                {
                  title: "Note",
                  value: `${orderDetail.Note}`,
                },
                {
                  title: "Coupon",
                  value: `${
                    orderDetail.coupon !== null
                      ? orderDetail.coupon.nameVoucher
                      : "No voucher"
                  }`,
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
                  {orderDetail.status === "Processing" &&
                    pathName !== `/dashboard/order/${orderId}` && (
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 2 }}
                        onClick={() => handleChangeStatus("Cancelled")}
                      >
                        Cancel Order
                      </Button>
                    )}

                  {orderDetail.status === "Shipping" &&
                    pathName !== `/dashboard/order/${orderId}` && (
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ mt: 2 }}
                        onClick={() => handleChangeStatus("Success")}
                      >
                        Package Received
                      </Button>
                    )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Modal open={isRatingFormOpen} onClose={handleCloseRatingForm}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            outline: "none",
          }}
        >
          <RatingForm
            onSubmit={handleRatingSubmit}
            onClose={handleCloseRatingForm}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderDetail;
