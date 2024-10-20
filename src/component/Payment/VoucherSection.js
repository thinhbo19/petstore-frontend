import React from "react";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const VoucherSection = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h5" gutterBottom>
        Chọn voucher
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Voucher</InputLabel>
        <Select>
          <MenuItem value={1}>Voucher 1</MenuItem>
          <MenuItem value={2}>Voucher 2</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default VoucherSection;
