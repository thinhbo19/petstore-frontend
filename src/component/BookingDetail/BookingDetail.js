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
  Table,
  TableBody,
  TableRow,
  TableCell,
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
import { getBookingID } from "@/src/services/apiBooking";
import { formatDate } from "@/src/hooks/useFormatTime";

const BookingDetail = ({ bookingId }) => {
  const accessToken = useSelector(selectAccessToken);
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState([]);
  const router = useRouter();
  const userID = orderDetail?.user._id;
  const [isRatingFormOpen, setIsRatingFormOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const pathName = usePathname();
  console.log(orderDetail);

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
      const res = await getBookingID(bookingId, accessToken);
      const orderData = res;
      setOrderDetail(orderData);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch booking details. Please try again later.");
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
    setLoading(true);
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

        Swal.fire({
          icon: "success",
          title: "Rating Successfully!",
          text: "Thank you for your purchase",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
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
        Swal.fire({
          icon: "success",
          title: "Rating Successfully!",
          text: "Thank you for your purchase",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
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
    } finally {
      setLoading(false);
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
        <Typography variant="h6">No booking details found.</Typography>
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

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              marginBottom: { xs: "15px", md: "0" },
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: { xs: "center", md: "left" },
              }}
              variant="h6"
              gutterBottom
            >
              BOOKING INFOMATION
            </Typography>
            <Grid container spacing={2}>
              {[
                { title: "Booking ID", value: orderDetail._id },
                { title: "Username", value: orderDetail.user.username },
                {
                  title: "Contact",
                  value: `${orderDetail.user.mobile} - ${orderDetail.user.email}`,
                },
                {
                  title: "Note",
                  value: `${orderDetail.Note}`,
                },
                {
                  title: "Coupon",
                  value: null,
                  //  `${
                  //   orderDetail.coupon !== null
                  //     ? orderDetail.coupon.nameVoucher
                  //     : "No voucher"
                  // }`,
                },
                {
                  title: "Type Service",
                  value: `${orderDetail.services[0].type} Service`,
                },
                {
                  title: "Booking Date",
                  value: formatDate(orderDetail.realDate),
                },
                {
                  title: "Check In Date",
                  value: formatDate(orderDetail.bookingDate),
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
                        sx={{
                          fontWeight: "bold",
                          fontSize: { xs: "0.8rem", md: "1rem" },
                        }}
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
                          fontSize: { xs: "0.8rem", md: "1rem" },
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
                    pathName !== `/dashboard/booking/${bookingId}` && (
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
                    pathName !== `/dashboard/booking/${bookingId}` && (
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
              Pet Info
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <Image
                src={orderDetail.pet.images[0] || "/placeholder.svg"}
                alt={orderDetail.pet.name}
                width={120}
                height={120}
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />

              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>{orderDetail.pet.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Breed</strong>
                    </TableCell>
                    <TableCell>{orderDetail.pet.breed}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Age</strong>
                    </TableCell>
                    <TableCell>{orderDetail.pet.age} month</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Gender</strong>
                    </TableCell>
                    <TableCell>{orderDetail.pet.gender}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Deworming</strong>
                    </TableCell>
                    <TableCell>{orderDetail.pet.deworming} times</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Vaccination</strong>
                    </TableCell>
                    <TableCell>{orderDetail.pet.vaccination} times</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: { xs: "center", md: "left" },
              }}
              variant="h6"
              gutterBottom
            >
              List Services
            </Typography>
            <List>
              {orderDetail.services.map((ser, index) => {
                const userHasReviewed =
                  ratings.length > 0 &&
                  ratings.some(
                    (rating) =>
                      rating._id === ser._id &&
                      rating.rating.some(
                        (r) => r.postBy === orderDetail.user._id
                      )
                  );

                return (
                  <Box key={index}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box sx={{ margin: "10px" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {ser.nameService}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: "red",
                            fontSize: "0.9rem",
                          }}
                        >
                          {ser.price.toLocaleString("vi")} VNĐ
                        </Typography>
                      </Box>
                      {orderDetail.status === "Completed" &&
                        pathName !== `/dashboard/booking/${orderId}` && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenRatingForm(product.id)}
                          >
                            {userHasReviewed ? "Change Rating" : "Rating"}
                          </Button>
                        )}
                    </Box>
                    {index < orderDetail.services.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </Box>
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

export default BookingDetail;
