"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Snackbar,
  Paper,
  IconButton,
  Pagination,
  Grid,
} from "@mui/material";
import { AddLocation } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import { apiUrlUser } from "@/src/services/config";
import { getCurrentUser } from "@/src/services/apiUser";

export default function AddressPage() {
  const accessToken = useSelector(selectAccessToken);
  const [addresses, setAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [specificAddress, setSpecificAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await getCurrentUser(accessToken);
          setAddresses(res.Address);
          setName(res.username);
          setPhone(res.mobile);
          const provinceRes = await axios.get(
            "https://open.oapi.vn/location/provinces?page=0&size=70"
          );
          setProvinces(provinceRes.data.data);
        } catch (error) {
          console.error(error);
          setSnackbarMessage("Unable to load address data.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [accessToken]);

  const handleSelectProvince = async (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setSelectedDistrict("");
    setSelectedWard("");
    setWards([]);
    const selected = provinces.find((item) => item.name === province);

    if (selected) {
      setLoading(true);
      try {
        const districtRes = await axios.get(
          `https://open.oapi.vn/location/districts/${selected.id}?page=0&size=70`
        );
        setDistricts(districtRes?.data.data || []);
      } catch (error) {
        console.error(error);
        setSnackbarMessage("Unable to load District data.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectDistrict = async (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedWard("");
    const selected = districts.find((item) => item.name === district);

    if (selected) {
      setLoading(true);
      try {
        const wardRes = await axios.get(
          `https://open.oapi.vn/location/wards/${selected.id}`
        );
        setWards(wardRes?.data.data || []);
      } catch (error) {
        console.error(error);
        setSnackbarMessage("Unable to load Ward data.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectWard = (e) => {
    setSelectedWard(e.target.value);
  };

  const handleChangeSpecificAddress = (e) => {
    setSpecificAddress(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedWard("");
    setSpecificAddress("");
  };

  const handleAddAddress = async () => {
    const fullAddress = `${specificAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`;
    setLoading(true);
    try {
      await axios.post(
        `${apiUrlUser}/address`,
        { address: fullAddress },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setSnackbarMessage("Address added successfully!");
      setAddresses([...addresses, fullAddress]);
      handleClose();
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error: Unable to add address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (index) => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrlUser}/address/${index}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAddresses(addresses.filter((_, i) => i !== index));
      setSnackbarMessage("Address deleted successfully!");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error: Unable to delete address. Please try again.");
    } finally {
      setLoading(false);
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
        aria-label="Add new address"
      >
        Add Address <AddLocation />
      </Button>
      <Grid container spacing={2}>
        {loading ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", padding: "2rem" }}
          >
            <CircularProgress />
          </Box>
        ) : currentAddresses.length > 0 ? (
          currentAddresses.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                sx={{
                  padding: "1rem",
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
                  onClick={() =>
                    handleDeleteAddress(indexOfFirstAddress + index)
                  }
                  aria-label="Delete address"
                >
                  <DeleteIcon />
                </IconButton>
                <Typography variant="h6">{name}</Typography>
                <Typography>{phone}</Typography>
                <Typography>{item}</Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "20vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ textAlign: "center" }}
              variant="body2"
              color="textSecondary"
            >
              No addresses found.
            </Typography>
          </Box>
        )}
        <Pagination
          count={Math.ceil(addresses.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{
            width: "100%",
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          {loading && <CircularProgress />}
          <FormControl fullWidth margin="dense">
            <InputLabel>Province/City</InputLabel>
            <Select value={selectedProvince} onChange={handleSelectProvince}>
              {provinces.map((item) => (
                <MenuItem key={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>District</InputLabel>
            <Select
              value={selectedDistrict}
              onChange={handleSelectDistrict}
              disabled={!districts.length}
            >
              {districts.map((item) => (
                <MenuItem key={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Ward</InputLabel>
            <Select
              value={selectedWard}
              onChange={handleSelectWard}
              disabled={!wards.length}
            >
              {wards.map((item) => (
                <MenuItem key={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Specific Address"
            type="text"
            fullWidth
            value={specificAddress}
            onChange={handleChangeSpecificAddress}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAddAddress}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            Add Address
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarMessage !== ""}
        autoHideDuration={6000}
        onClose={() => setSnackbarMessage("")}
        message={snackbarMessage}
      />
    </Box>
  );
}
