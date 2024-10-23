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
import MoMoImg from "../../../public/MoMo_Logo.png";

const PaymentMethodSection = ({
  totalAmount,
  handleThanhToanPayPal,
  handlePayOCD,
  handleVNPay,
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

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mt: 2,
          justifyContent: { xs: "center", md: "left" },
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        <Pay
          isElectronicEnabled={onlinePayment}
          paymentSuccess={handleThanhToanPayPal}
          amount={Math.round(totalAmount / 25000)}
          currency={"USD"}
        />
        {onlinePayment && (
          <>
            <Box
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              onClick={() => handleVNPay()}
            >
              <Image src={VNPayImg} width={150} height={50} alt="VNPay" />
            </Box>

            <Box
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              onClick={() => console.log("MoMo clicked")}
            >
              <Image src={MoMoImg} width={120} height={70} alt="MoMo" />
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default PaymentMethodSection;
