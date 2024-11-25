"use client";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import CustomButtons from "./CustomButtons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import {
  totalPriceOrder,
  mostPurchasedProduct,
  totalSalesByMonth,
  getAllOrders,
  topUsersByOrders,
} from "@/src/services/apiOrder";
import {
  totalPriceBooking,
  mostPurchasedService,
  totalSalesByMonthBooking,
  getAllBooking,
} from "@/src/services/apiBooking";
import exportToExcel from "./exportToExcel";
import DownloadIcon from "@mui/icons-material/Download";

const Statistical = ({ users }) => {
  const accessToken = useSelector(selectAccessToken);
  const [status, setStatus] = useState("All");
  const [year, setYear] = useState(new Date().getFullYear());
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [topProd, setTopProd] = useState([]);
  const [topBooking, setTopBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [monthlySales, setMonthlySales] = useState([]);
  const [orderLength, setOrderLength] = useState(0);
  const [mostUsers, setMostUsers] = useState([]);

  const handleChangeStatus = (newStatus) => setStatus(newStatus);
  const handleYearChange = (event) => setYear(event.target.value);

  const fetchData = async () => {
    setLoading(true);
    try {
      const orders = await getAllOrders(accessToken);
      const bookings = await getAllBooking(accessToken);

      const priceOrder = await totalPriceOrder(accessToken);
      const priceBooking = await totalPriceBooking(accessToken);
      const mostProd = await mostPurchasedProduct(accessToken);
      const mostService = await mostPurchasedService(accessToken);
      const totalMonthProd = await totalSalesByMonth(accessToken, year);
      const totalMonthBooking = await totalSalesByMonthBooking(
        accessToken,
        year
      );

      const totalMonthlyRevenue = totalMonthProd.map((prod, index) => {
        const booking = totalMonthBooking[index];
        return {
          month: prod.month,
          totalSales: prod.totalSales + (booking?.totalSales || 0),
        };
      });

      const resUser = await topUsersByOrders(accessToken);
      setMostUsers(resUser);
      setTopProd(mostProd);
      setTopBooking(mostService);
      if (status === "All") {
        setOrderLength(orders.length + bookings.length);
        setMonthlySales(totalMonthlyRevenue);
        setTotalRevenue(priceOrder + priceBooking);
      } else if (status === "Purchase") {
        setTotalRevenue(priceOrder);
        setOrderLength(orders.length);
        setMonthlySales(totalMonthProd);
      } else if (status === "Booking") {
        setOrderLength(bookings.length);
        setTotalRevenue(priceBooking);
        setMonthlySales(totalMonthBooking);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) fetchData();
  }, [accessToken, status, year]);

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
    <Box sx={{ padding: "2rem", maxWidth: "1200px", margin: "auto" }}>
      <CustomButtons handleChangeStatus={handleChangeStatus} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Overview" />
            <CardContent>
              <Typography variant="h6">Number of Customers</Typography>
              <Typography variant="h4" sx={{ color: "primary.main" }}>
                {users?.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              title={`All Orders ${
                status === "Purchase" ? "Product" : "Booking"
              }`}
            />
            <CardContent>
              <Typography variant="h6">Number of Orders</Typography>
              <Typography variant="h4" sx={{ color: "primary.main" }}>
                {orderLength}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Revenue" />
            <CardContent>
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h5" sx={{ color: "success.main" }}>
                {totalRevenue.toLocaleString("vi")} VNĐ
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Top User" />
            <CardContent>
              {mostUsers && mostUsers?.length > 0 ? (
                mostUsers?.map((user, index) => (
                  <Box
                    key={user.userId}
                    display="flex"
                    alignItems="center"
                    mb={2}
                    sx={{
                      border: "1px solid #e0e0e0",
                      padding: "8px",
                      borderRadius: "8px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Box
                      component="img"
                      src={user.Avatar}
                      alt={user.name}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        marginRight: 2,
                      }}
                    />
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {index + 1}. {user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Order Count: {user.orderCount}
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No products available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Top Product" />
            <CardContent>
              {topProd && topProd.length > 0 ? (
                topProd.map((product, index) => (
                  <Box
                    key={product.id}
                    display="flex"
                    alignItems="center"
                    mb={2}
                    sx={{
                      border: "1px solid #e0e0e0",
                      padding: "8px",
                      borderRadius: "8px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Box
                      component="img"
                      src={product.img}
                      alt={product.name}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        marginRight: 2,
                      }}
                    />
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {index + 1}. {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Purchased: {product.totalPurchased}
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No products available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Top Service" />
            <CardContent>
              {topBooking && topBooking.length > 0 ? (
                topBooking.map((service, index) => (
                  <Box
                    key={service.id}
                    display="flex"
                    mb={2}
                    sx={{
                      border: "1px solid #e0e0e0",
                      padding: "8px",
                      borderRadius: "8px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      {index + 1}. {service.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Purchased: {service.totalPurchased}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No products available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box
        sx={{
          margin: "25px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormControl fullWidth sx={{ width: "10%" }}>
          <InputLabel id="select-year-label">Select Year</InputLabel>
          <Select
            labelId="select-year-label"
            value={year}
            onChange={handleYearChange}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <MenuItem key={i} value={2024 - i}>
                {2024 - i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="success"
          startIcon={<DownloadIcon />}
          size="large"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            padding: "5px 15px",
            boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
            textAlign: "right",
          }}
          onClick={() => exportToExcel(monthlySales, totalRevenue)}
        >
          Export to Excel
        </Button>
      </Box>

      <Box sx={{ margin: "10px 0" }}>
        <Typography variant="h6" gutterBottom>
          Monthly Sales Chart
        </Typography>
        <BarChart
          series={[
            {
              data: monthlySales.map((sale) => sale.totalSales),
            },
          ]}
          height={500}
          xAxis={[
            {
              data: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              scaleType: "band",
            },
          ]}
          margin={{ top: 5, bottom: 30, left: 80, right: 0 }}
        />
      </Box>
    </Box>
  );
};

export default Statistical;
