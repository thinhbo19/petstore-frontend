"use client";
import { getVouchersUser } from "@/src/services/apiUser";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import {
  Box,
  Grid,
  Pagination,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import PetsIcon from "@mui/icons-material/Pets";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { formatDate } from "@/src/hooks/useFormatTime";

const VoucherUserPage = () => {
  const accessToken = useSelector(selectAccessToken);
  const [vouchers, setVouchers] = useState([]);
  const [page, setPage] = useState(0);

  const voucherColors = {
    Pet: "linear-gradient(to right, #4caf50, #66bb6a)",
    Accessory: "linear-gradient(to right, #f44336, #e57373)",
    Booking: "linear-gradient(to right, #2196f3, #64b5f6)",
    Ship: "linear-gradient(to right, #ff9800, #ffb74d)",
  };

  const voucherIcons = {
    Pet: (
      <PetsIcon
        sx={{
          color: "#fff",
        }}
      />
    ),
    Accessory: (
      <LocalMallIcon
        sx={{
          color: "#fff",
        }}
      />
    ),
    Booking: (
      <EventAvailableIcon
        sx={{
          color: "#fff",
        }}
      />
    ),
    Ship: (
      <LocalShippingIcon
        sx={{
          color: "#fff",
        }}
      />
    ),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accessToken) {
          const res = await getVouchersUser(accessToken);
          setVouchers(res);
        } else {
          setVouchers([]);
        }
      } catch (error) {
        console.error(error);
        setVouchers([]);
      }
    };
    fetchData();
  }, [accessToken]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const vouchersPerPage = 9;
  const paginatedVouchers = vouchers?.slice(
    page * vouchersPerPage,
    (page + 1) * vouchersPerPage
  );

  const handleDelete = (id) => {
    console.log("Deleting voucher with id:", id);
    setVouchers(vouchers.filter((voucher) => voucher._id !== id));
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        maxWidth: "100%",
        margin: "auto",
        textAlign: "left",
      }}
    >
      <Grid container spacing={3}>
        {paginatedVouchers?.map((voucher) => (
          <Grid item xs={6} md={4} key={voucher._id} marginBottom={3}>
            <Paper
              sx={{
                padding: "1rem",
                background: voucherColors[voucher.typeVoucher] || "#e0e0e0",
                borderRadius: "12px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  color: "#fff",
                }}
              >
                {voucherIcons[voucher.typeVoucher]}
              </Box>

              <Typography
                sx={{
                  fontSize: { xs: "0.7rem", md: "1.3rem" },
                  fontWeight: "bold",
                  width: "70%",
                }}
                variant="h6"
                component="h2"
                gutterBottom
              >
                {voucher.nameVoucher}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.6rem", md: "1rem" },
                }}
                variant="body1"
                gutterBottom
              >
                Type: {voucher.typeVoucher}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.6rem", md: "1rem" },
                }}
                variant="body2"
                gutterBottom
              >
                Discount: {voucher.discount}% off
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.6rem", md: "1rem" },
                }}
                variant="body2"
                gutterBottom
              >
                Expiry: {formatDate(voucher.expiry)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: "2rem", textAlign: "center" }}>
        <Pagination
          count={Math.ceil(vouchers?.length / vouchersPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default VoucherUserPage;
