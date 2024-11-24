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
} from "@/src/services/apiOrder";
import {
  totalPriceBooking,
  mostPurchasedService,
  totalSalesByMonthBooking,
} from "@/src/services/apiBooking";
import exportToExcel from "./exportToExcel";
import DownloadIcon from "@mui/icons-material/Download";

const Statistical = ({ users }) => {
  const accessToken = useSelector(selectAccessToken);
  const [status, setStatus] = useState("All");
  const [year, setYear] = useState(new Date().getFullYear());
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [bestProd, setBestProd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [monthlySales, setMonthlySales] = useState([]);

  const handleChangeStatus = (newStatus) => setStatus(newStatus);
  const handleYearChange = (event) => setYear(event.target.value);

  const fetchData = async () => {
    setLoading(true);
    try {
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

      if (status === "All") {
        setMonthlySales(totalMonthlyRevenue);
        setTotalRevenue(priceOrder + priceBooking);
      } else if (status === "Purchase") {
        setTotalRevenue(priceOrder);
        setBestProd(mostProd);
        setMonthlySales(totalMonthProd);
      } else if (status === "Booking") {
        setTotalRevenue(priceBooking);
        setBestProd(mostService);
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
        {/* Overview Card */}
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

        {/* Revenue Card */}
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

        {/* Best Selling Products/Services */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              title={
                status === "All"
                  ? "All"
                  : status === "Best Selling Products"
                  ? "Purchase"
                  : "Best Service"
              }
            />
            <CardContent>
              <Typography variant="h6">
                Top{" "}
                {status === "All"
                  ? "All"
                  : status === "Product"
                  ? "Purchase"
                  : "Booking"}
              </Typography>
              <Typography variant="h5" sx={{ color: "warning.main" }}>
                {bestProd?.name}
              </Typography>
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
