"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Grid,
  Pagination,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddLocation } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import { getCurrentUser } from "@/src/services/apiUser";
import axios from "axios";
import { apiUrlUser } from "@/src/services/config";

export default function AddressPage() {
  const accessToken = useSelector(selectAccessToken);
  const [addresses, setAddresses] = useState([]);
  const [open, setOpen] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const itemsPerPage = 6;

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingPage(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const res = await getCurrentUser(accessToken);
          setAddresses(res.Address);
          setName(res.username);
          setPhone(res.mobile);
        } catch (error) {}
      };
      fetchData();
    }
  }, [accessToken]);

  if (loadingPage) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleAddAddress = async () => {
    try {
      const res = await axios.post(
        `${apiUrlUser}/address`,
        {
          address: newAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res);
      setAddresses([...addresses, newAddress]);
      setNewAddress("");

      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAddress = async (index) => {
    try {
      await axios.delete(`${apiUrlUser}/address/${index}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAddresses(addresses.filter((_, i) => i !== index));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastAddress = currentPage * itemsPerPage;
  const indexOfFirstAddress = indexOfLastAddress - itemsPerPage;
  const currentAddresses = addresses.slice(
    indexOfFirstAddress,
    indexOfLastAddress
  );

  return (
    <Box
      sx={{
        padding: "2rem",
        maxWidth: "100%",
        margin: "auto",
        textAlign: "left",
      }}
    >
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#F94E30",
          color: "white",
          marginBottom: "1rem",
        }}
        onClick={handleClickOpen}
      >
        Add Address <AddLocation />
      </Button>
      <Grid container spacing={2}>
        {currentAddresses.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              sx={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: 3,
                position: "relative",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  color: "red",
                }}
                onClick={() => handleDeleteAddress(indexOfFirstAddress + index)}
              >
                <DeleteIcon />
              </IconButton>
              {currentAddresses.length > 0 && (
                <Typography variant="h6" gutterBottom>
                  {name}
                </Typography>
              )}{" "}
              {currentAddresses.length > 0 && (
                <Typography variant="body1" color="textSecondary">
                  {phone}
                </Typography>
              )}
              <Typography variant="body2" color="textSecondary">
                {item}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(addresses.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: "1rem" }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm Địa Chỉ Mới</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Địa Chỉ"
            type="text"
            fullWidth
            variant="standard"
            name="address"
            value={newAddress.address}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleAddAddress}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
