"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Container,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import VoucherIMG from "../../../public/Slider/Brown Minimalist Pet Shop Promotion Banner.png";
import { getAllVouchersClient } from "@/src/services/apiVocher";
import { formatDate } from "@/src/hooks/useFormatTime";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import { getVouchersUser } from "@/src/services/apiUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";
import { apiUrlUser } from "@/src/services/config";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4A6741",
    },
    secondary: {
      main: "#D4A373",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const voucherTypeColors = {
  Food: "#FF6B6B",
  Toy: "#4ECDC4",
  Accessory: "#45B7D1",
  Medicine: "#98D8C8",
  Service: "#FFBE0B",
  Other: "#6B5B95",
};

const VoucherComponent = () => {
  const accessToken = useSelector(selectAccessToken);
  const [vouchersByType, setVouchersByType] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const allVouchers = await getAllVouchersClient();

      if (accessToken) {
        const userVoucherList = await getVouchersUser(accessToken);
        const groupedVouchers = allVouchers.reduce((acc, voucher) => {
          const isClaimed = userVoucherList.some(
            (uv) => uv._id === voucher._id
          );

          if (!isClaimed) {
            if (!acc[voucher.typeVoucher]) {
              acc[voucher.typeVoucher] = [];
            }
            acc[voucher.typeVoucher].push(voucher);
          }

          return acc;
        }, {});
        setVouchersByType(groupedVouchers);
      } else {
        setVouchersByType(allVouchers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const handleClaimVoucher = async (id) => {
    setLoading(true);
    if (!accessToken) {
      Swal.fire({
        title: "Error!",
        text: "You have not login!",
        icon: "warning",
        showConfirmButton: false,
      });
      setLoading(false);
      return;
    }

    try {
      await axios.put(
        `${apiUrlUser}/add-voucher`,
        { voucherId: id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("You have successfully obtained the voucher");
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "background.default",
          padding: "6rem 0 2rem",
          width: "100%",
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
          style={{ zIndex: "10000000 !important" }}
        />
        <Container maxWidth="lg">
          <Paper
            elevation={6}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              mb: 6,
              position: "relative",
            }}
          >
            <Image
              src={VoucherIMG}
              alt="Pet Shop Promotion Banner"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
              priority
            />
          </Paper>

          {Object.entries(vouchersByType).map(([type, vouchers]) => (
            <Box key={type} sx={{ mb: 9 }}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  color: voucherTypeColors[type] || voucherTypeColors.Other,
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                }}
              >
                {type} Vouchers
              </Typography>
              <Grid container spacing={4}>
                {vouchers.map((voucher) => (
                  <Grid item xs={12} sm={6} md={4} key={voucher._id}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: { xs: 2, sm: 2.5, md: 3 },
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: "12px",
                        transition: "all 0.3s ease-in-out",
                        borderTop: `4px solid ${
                          voucherTypeColors[type] || voucherTypeColors.Other
                        }`,
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          component="h3"
                          gutterBottom
                          color="primary"
                          sx={{
                            fontSize: {
                              xs: "1rem",
                              sm: "1.2rem",
                              md: "1.5rem",
                            },
                          }}
                        >
                          {voucher.nameVoucher}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: {
                              xs: "0.8rem",
                              sm: "0.9rem",
                              md: "1rem",
                            },
                          }}
                        >
                          Value: <strong>{voucher.exclusive} VNĐ</strong>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: {
                              xs: "0.8rem",
                              sm: "0.9rem",
                              md: "1rem",
                            },
                          }}
                        >
                          Expires: <strong>{formatDate(voucher.expiry)}</strong>
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 3,
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="p"
                          sx={{
                            color:
                              voucherTypeColors[type] ||
                              voucherTypeColors.Other,
                            fontSize: {
                              xs: "1rem",
                              sm: "1.2rem",
                              md: "1.5rem",
                            },
                          }}
                          fontWeight="bold"
                        >
                          {voucher.discount}% OFF
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => handleClaimVoucher(voucher._id)}
                          sx={{
                            backgroundColor:
                              voucherTypeColors[type] ||
                              voucherTypeColors.Other,
                            color: "white",
                            borderRadius: "20px",
                            textTransform: "none",
                            fontWeight: "bold",
                            fontSize: {
                              xs: "0.8rem",
                              sm: "1rem",
                              md: "1.2rem",
                            },
                            padding: {
                              xs: "6px 12px",
                              sm: "8px 16px",
                              md: "10px 20px",
                            },
                            boxShadow: `0 4px 6px ${
                              voucherTypeColors[type] || voucherTypeColors.Other
                            }33`,
                            "&:hover": {
                              backgroundColor:
                                voucherTypeColors[type] ||
                                voucherTypeColors.Other,
                              boxShadow: `0 6px 8px ${
                                voucherTypeColors[type] ||
                                voucherTypeColors.Other
                              }4D`,
                            },
                          }}
                        >
                          Claim Now
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default VoucherComponent;
