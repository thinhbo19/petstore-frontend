"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import testImg from "../../../public/avartar.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import TakeLogin from "../No-Login/TakeLogin";
import axios from "axios";
import { apiUrlUser } from "@/src/services/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "@/src/services/apiUser";
import { removeCart, setCart } from "@/src/services/Redux/CartSlice";

const CartPage = () => {
  const accessToken = useSelector(selectAccessToken);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantityUpdateTimeout, setQuantityUpdateTimeout] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const fetchData = async () => {
    try {
      const res = await getCurrentUser(accessToken);
      setTimeout(() => {
        setCartItems(res?.cart);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      await axios.put(
        `${apiUrlUser}/cart`,
        {
          id,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("Quantity updated successfully!");
      fetchData();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

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
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const res = await axios.delete(`${apiUrlUser}/allOneCart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          id: id,
        },
      });
      setCartItems(cartItems.filter((item) => item.id !== id));
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      dispatch(removeCart(id));
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveSelectedItems = async () => {
    try {
      const res = await axios.delete(`${apiUrlUser}/allCart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCartItems(
        cartItems.filter((item) => !selectedItems.includes(item.id))
      );
      setSelectedItems([]);
      dispatch(setCart([]));
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIncrease = (id) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id && item.quantity < item.info.quantity) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);

    if (quantityUpdateTimeout) {
      clearTimeout(quantityUpdateTimeout);
    }

    const newTimeout = setTimeout(() => {
      const item = updatedItems.find((item) => item.id === id);
      updateQuantity(id, item.quantity);
    }, 500);

    setQuantityUpdateTimeout(newTimeout);
  };

  const handleDecrease = (id) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);

    if (quantityUpdateTimeout) {
      clearTimeout(quantityUpdateTimeout);
    }

    const newTimeout = setTimeout(() => {
      const item = updatedItems.find((item) => item.id === id);
      updateQuantity(id, item.quantity);
    }, 500);

    setQuantityUpdateTimeout(newTimeout);
  };

  const subtotal = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.newPrice, 0);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2, marginTop: "5rem" }}>
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

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading...
          </Typography>
        </Box>
      ) : cartItems.length === 0 ? (
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
