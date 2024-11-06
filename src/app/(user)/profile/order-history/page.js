"use client";
import { getAllOrderUser } from "@/src/services/apiOrder";
import { selectAccessToken, selectUid } from "@/src/services/Redux/useSlice";
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  Grid,
  Pagination,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OrderHistoryPage() {
  const accessToken = useSelector(selectAccessToken);
  const userId = useSelector(selectUid);
  const [orderData, setOrderData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const res = await getAllOrderUser(userId, accessToken);
          setOrderData(res.reverse());
        } catch (error) {
          console.error(error);
        }
      } else {
        setOrderData([]);
      }
    };
    fetchData();
  }, [userId, accessToken]);

  const filteredOrders = orderData.filter((order) => {
    if (filter === "All") return true;
    return order.status === filter;
  });

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        padding: { xs: "0", md: "2rem" },
        marginLeft: "15px",
      }}
    >
      {/* ButtonGroup for filters */}
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {["All", "Processing", "Shipping", "Success", "Cancelled"].map(
          (status) => (
            <Button
              key={status}
              onClick={() => {
                setFilter(status);
                setPage(1);
              }}
              sx={{
                fontSize: { xs: "0.5rem", sm: "0.8rem", md: "1rem" },
                fontWeight: "bold",
                backgroundColor: filter === status ? "#F7452E" : "inherit",
                color: filter === status ? "white" : "#F7452E",
                borderColor: "#F7452E",
                "&:hover": {
                  backgroundColor:
                    filter === status ? "#F7452E" : "rgba(247, 69, 46, 0.1)",
                  borderColor: "#F7452E",
                },
                margin: { xs: "6px 0", md: "0" },
                padding: { xs: "10px 20px", md: "5px" },
                flex: 1,
              }}
            >
              {status}
            </Button>
          )
        )}
      </ButtonGroup>

      {/* Check if there are orders */}
      {filteredOrders.length === 0 ? (
        <Typography variant="h6" sx={{ marginTop: "2rem" }}>
          No orders.
        </Typography>
      ) : (
        <Box sx={{ marginTop: "2rem" }}>
          {paginatedOrders.map((order) => (
            <Box
              key={order._id}
              sx={{
                border: "1px solid #F7452E",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                backgroundColor: "rgba(247, 69, 46, 0.05)",
                textAlign: "left",
              }}
            >
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="h6"
                    color="#F7452E"
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                      wordBreak: "break-word",
                      fontWeight: "bold",
                    }}
                  >
                    Order ID: {order._id}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                    }}
                  >
                    Status: <strong>{order.status}</strong>
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                    }}
                  >
                    Total Price: {order.totalPrice.toLocaleString("vi")} VNĐ
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                    }}
                  >
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  textAlign={{ xs: "center", md: "right" }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#F7452E",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#d23e1b",
                      },
                      mt: { xs: 2, md: 0 },
                      width: "50%",
                      maxWidth: { xs: "100%", md: "auto" },
                    }}
                    onClick={() => router.push(`/order-detail/${order._id}`)}
                  >
                    See Details
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#F7452E",
                color: "white",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
