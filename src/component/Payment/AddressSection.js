import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";

const AddressSection = ({
  user,
  addresses,
  selectedAddress,
  setSelectedAddress,
}) => {
  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };
  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h5" gutterBottom>
        Select Address
      </Typography>
      <Box sx={{ marginBottom: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Address</InputLabel>
          <Select
            label="Địa Chỉ"
            value={selectedAddress}
            onChange={handleAddressChange}
          >
            {addresses.length > 0 ? (
              addresses.map((address, index) => (
                <MenuItem key={index} value={address}>
                  {user.username}, {user.mobile}, {address}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Không có địa chỉ nào</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default AddressSection;
