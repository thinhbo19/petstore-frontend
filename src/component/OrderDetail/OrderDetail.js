"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneOrder } from "@/src/services/apiOrder";
import { selectCart, removeCart } from "@/src/services/Redux/CartSlice";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  ShoppingBag,
  CreditCard,
  LocationOn,
  Notepad,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const OrderDetail = ({ orderId }) => {
  const accessToken = useSelector(selectAccessToken);
  const [orderDetail, setOrderDetail] = useState(null);
  const cartUser = useSelector(selectCart);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const res = await getOneOrder(orderId, accessToken);
      const orderData = res?.data;
      setOrderDetail(orderData);

      // Compare and remove products from the cart
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
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  if (!orderDetail) {
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
    <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: "#f5f5f5" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Order Detail
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardHeader
              title="Order Information"
              action={
                <Chip
                  label={orderDetail.status}
                  color="primary"
                  variant="outlined"
                />
              }
            />
            <StyledCardContent>
              <List>
                <ListItem>
                  <ShoppingBag sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Order ID"
                    secondary={orderDetail._id}
                  />
                </ListItem>
                <ListItem>
                  <CreditCard sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Payment Method"
                    secondary={orderDetail.paymentMethod}
                  />
                </ListItem>
                <ListItem>
                  <LocationOn sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Address"
                    secondary={orderDetail.address}
                  />
                </ListItem>
                <ListItem>
                  <Notepad sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Note"
                    secondary={orderDetail.note || "No note"}
                  />
                </ListItem>
              </List>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardHeader title="Products" />
            <StyledCardContent>
              <List sx={{ maxHeight: 400, overflowY: "auto" }}>
                {orderDetail.products.map((product) => (
                  <React.Fragment key={product._id}>
                    <ListItem>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={3}>
                          <Avatar
                            alt={product.name}
                            src={product.img}
                            variant="square"
                            sx={{ width: 80, height: 80 }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <ListItemText
                            primary={product.name}
                            secondary={`Quantity: ${product.count}`}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="body1"
                            align="right"
                            fontWeight="bold"
                          >
                            {(product.count * product.price).toLocaleString()}{" "}
                            VND
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </StyledCardContent>
            <Divider />
            <CardContent>
              <Typography variant="h6" align="right">
                Total Price: {orderDetail.totalPrice.toLocaleString()} VND
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary" size="large" href="/shop">
          Back to Shop
        </Button>
      </Box>
    </Box>
  );
};

export default OrderDetail;
