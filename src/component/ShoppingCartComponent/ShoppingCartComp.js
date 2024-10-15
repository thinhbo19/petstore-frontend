"use client";
import React, { useState } from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import testImg from "../../../public/avartar.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import TakeLogin from "../No-Login/TakeLogin";

const CartPage = () => {
  const accessToken = useSelector(selectAccessToken);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      description: "This is a sample product description.",
      price: 100000,
      quantity: 1,
      image: testImg,
    },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id)); // Chọn tất cả
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
  };

  const handleRemoveSelectedItems = () => {
    setCartItems(cartItems.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const handleIncrease = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const subtotal = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2, marginTop: "5rem" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <ShoppingCartIcon sx={{ mr: 1, fontSize: 40, color: "#F84C2F" }} />
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#F84C2F" }}>
          Shopping Cart
        </Typography>
      </Box>

      <TakeLogin accesstoken={accessToken} />

      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              alignItems: "center",
            }}
          >
            {selectedItems.length > 0 && (
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleRemoveSelectedItems}
              >
                Xóa tất cả
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSelectAll}
              sx={{
                borderColor: "#1976d2",
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
              }}
            >
              {selectedItems.length === cartItems.length
                ? "Bỏ chọn tất cả"
                : "Chọn tất cả"}
            </Button>
          </Box>

          <Box
            sx={{
              maxHeight: "500px",
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: "8px",
              p: 2,
            }}
          >
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleRemoveItem={handleRemoveItem}
                handleIncrease={handleIncrease}
                handleDecrease={handleDecrease}
                handleSelect={handleSelect}
                isSelected={selectedItems.includes(item.id)}
              />
            ))}
          </Box>

          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">Subtotal:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="body1">{subtotal} VNĐ</Typography>
              </Grid>
              {/* <Grid item xs={6}>
                <Typography variant="body1">Shipping:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="body1">50,000 VNĐ</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Tax (10%):</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="body1">
                  {(subtotal * 0.1).toFixed(0)} VNĐ
                </Typography>
              </Grid> */}
              <Grid item xs={6}>
                <Typography variant="h6">Total:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="h6">
                  {(subtotal + subtotal * 0.1 + 50000).toFixed(0)} VNĐ
                </Typography>
              </Grid>
            </Grid>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  background: "#F84C2F",
                  width: { xs: "100%", sm: "20%" },
                }}
              >
                Payment
              </Button>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default CartPage;
