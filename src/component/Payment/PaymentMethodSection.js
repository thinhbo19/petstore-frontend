import React from "react";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const PaymentMethodSection = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Phương thức thanh toán
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel>Phương thức</InputLabel>
        <Select>
          <MenuItem value={1}>Thanh toán qua thẻ</MenuItem>
          <MenuItem value={2}>Thanh toán khi nhận hàng</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" fullWidth>
        Thanh toán
      </Button>
    </Paper>
  );
};

export default PaymentMethodSection;
