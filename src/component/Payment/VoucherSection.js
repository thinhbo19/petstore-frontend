import React from "react";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const VoucherSection = ({
  subTotal,
  vouchers,
  selectedVoucher,
  setSelectedVoucher,
}) => {
  const handleChange = (event) => {
    setSelectedVoucher(event.target.value);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h5" gutterBottom>
        Select Voucher
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Voucher</InputLabel>
        <Select label="Voucher" value={selectedVoucher} onChange={handleChange}>
          {vouchers.length > 0 ? (
            vouchers
              .filter((vou) => vou.exclusive >= subTotal)
              .map((vou) => (
                <MenuItem key={vou._id} value={vou._id}>
                  {vou.nameVoucher}
                </MenuItem>
              ))
          ) : (
            <MenuItem disabled>No available vouchers</MenuItem>
          )}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default VoucherSection;
