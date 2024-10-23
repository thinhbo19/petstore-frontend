import React, { useState } from "react";
import {
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
} from "@mui/material";
import Pay from "../Pay/Pay";
import Image from "next/image";
import VNPayImg from "../../../public/VNpay.png";

const PaymentMethodSection = ({
  totalAmount,
  handleThanhToanPayPal,
  handlePayOCD,
}) => {
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [onlinePayment, setOnlinePayment] = useState(false);

  const handleCashOnDeliveryChange = (event) => {
    setCashOnDelivery(event.target.checked);
    if (event.target.checked) {
      setOnlinePayment(false);
    }
  };

  const handleOnlinePaymentChange = (event) => {
    setOnlinePayment(event.target.checked);
    if (event.target.checked) {
      setCashOnDelivery(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Payment Method
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={cashOnDelivery}
            onChange={handleCashOnDeliveryChange}
          />
        }
        label="Payment upon receipt"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={onlinePayment}
            onChange={handleOnlinePaymentChange}
          />
        }
        label="Electronic payment"
      />

      {cashOnDelivery && (
        <Button
          onClick={() => handlePayOCD()}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Payment upon receipt
        </Button>
      )}

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Pay
          isElectronicEnabled={onlinePayment}
          paymentSuccess={handleThanhToanPayPal}
          amount={Math.round(totalAmount / 25000)}
          currency={"USD"}
        />
        {onlinePayment && (
          <Button variant="contained" color="secondary" fullWidth>
            Pay with VNPay{" "}
            <Image src={VNPayImg} width={100} height={40} alt="name" />
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default PaymentMethodSection;
