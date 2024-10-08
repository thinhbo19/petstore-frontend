"use client";
import React from "react";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import RedeemIcon from "@mui/icons-material/Redeem";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { styled } from "@mui/system";

// Data for vouchers
const vouchers = [
  {
    id: 1,
    title: "10% OFF on Electronics",
    description: "Get 10% off on all electronics items.",
    discount: "10%",
    expiryDate: "Valid until: Dec 31, 2024",
    backgroundColor: "#E0E0E0", // Soft gray
  },
  {
    id: 2,
    title: "Buy 1 Get 1 Free on Accessories",
    description: "Buy one, get one free on selected accessories.",
    discount: "BOGO",
    expiryDate: "Valid until: Nov 15, 2024",
    backgroundColor: "#F5F5F5", // Lighter gray
  },
  {
    id: 3,
    title: "20% OFF on Fashion",
    description: "Save 20% on all fashion items.",
    discount: "20%",
    expiryDate: "Valid until: Jan 5, 2025",
    backgroundColor: "#F0F0F0", // Subtle gray
  },
];

// Styled component for cleaner, toned-down cards
const StyledCard = styled(Card)(({ bg }) => ({
  backgroundColor: bg || "#FFF",
  color: "#333",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
  },
}));

// Styled Button with subtle accents
const StyledButton = styled(Button)({
  background: "#1976D2", // Soft blue for primary action
  borderRadius: 50,
  border: 0,
  color: "white",
  height: 40,
  padding: "0 24px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: "#1565C0", // Slightly darker on hover
  },
});

const VoucherComponent = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FAFAFA", // Light gray background
        paddingTop: "40px",
        paddingBottom: "40px",
        minHeight: "100vh",
      }}
    >
      <Container>
        <Box
          mt={4}
          mb={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ flexDirection: "column" }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "#333", // Soft dark for headings
            }}
          >
            Your Vouchers
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            gutterBottom
            sx={{ color: "#666", textAlign: "center" }}
          >
            Redeem your exclusive offers below
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {vouchers.map((voucher) => (
            <Grid item xs={12} sm={6} md={4} key={voucher.id}>
              <StyledCard bg={voucher.backgroundColor}>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <IconButton>
                      <LocalOfferIcon
                        sx={{ fontSize: "32px", color: "#555" }}
                      />
                    </IconButton>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        marginBottom: "8px",
                        marginLeft: "8px",
                        color: "#333",
                      }}
                    >
                      {voucher.title}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: "8px", color: "#666" }}
                  >
                    {voucher.description}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      marginTop: "16px",
                      fontWeight: "bold",
                      color: "#1976D2", // Primary blue for discount highlight
                    }}
                  >
                    {voucher.discount}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: "8px",
                      color: "#888",
                    }}
                  >
                    {voucher.expiryDate}
                  </Typography>
                </CardContent>

                <CardActions>
                  <StyledButton
                    variant="contained"
                    startIcon={<RedeemIcon />}
                    fullWidth
                  >
                    Redeem
                  </StyledButton>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default VoucherComponent;
