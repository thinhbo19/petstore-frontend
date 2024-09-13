"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddLocation } from "@mui/icons-material";

const initialAddresses = [
  {
    name: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  },
  {
    name: "Trần Thị B",
    phone: "0912345678",
    address: "456 Đường DEF, Quận 2, TP.HCM",
  },
  {
    name: "Lê Văn C",
    phone: "0923456789",
    address: "789 Đường GHI, Quận 3, TP.HCM",
  },
  {
    name: "Nguyễn Văn D",
    phone: "0934567890",
    address: "101 Đường JKL, Quận 4, TP.HCM",
  },
  {
    name: "Trần Thị E",
    phone: "0945678901",
    address: "202 Đường MNO, Quận 5, TP.HCM",
  },
  {
    name: "Lê Văn F",
    phone: "0956789012",
    address: "303 Đường PQR, Quận 6, TP.HCM",
  },
];

export default function AddressPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [open, setOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const itemsPerRow = 2;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, newAddress]);
    setNewAddress({ name: "", phone: "", address: "" });
    handleClose();
  };

  const handleDeleteAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate the indexes for slicing the addresses array
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
              <Typography variant="h6" gutterBottom>
                {item.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {item.phone}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.address}
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
            autoFocus
            margin="dense"
            label="Tên"
            type="text"
            fullWidth
            variant="standard"
            name="name"
            value={newAddress.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Số Điện Thoại"
            type="tel"
            fullWidth
            variant="standard"
            name="phone"
            value={newAddress.phone}
            onChange={handleChange}
          />
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
