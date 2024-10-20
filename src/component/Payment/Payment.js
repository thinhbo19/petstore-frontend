"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import ProductList from "./ProductList";
import NoteSection from "./NoteSection";
import AddressSection from "./AddressSection";
import VoucherSection from "./VoucherSection";
import PaymentMethodSection from "./PaymentMethodSection";
import { getCurrentUser } from "@/src/services/apiUser";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";

const Payment = () => {
  const [user, setUser] = useState(null);
  const [note, setNote] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getCurrentUser(accessToken);
        setUser(response);
        setAddresses(response.Address);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <Box
      sx={{
        paddingTop: "7rem",
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={4} sx={{ width: "95%" }}>
        <Grid item xs={12} md={6}>
          <ProductList />
        </Grid>
        <Grid item xs={12} md={6}>
          <NoteSection note={note} setNote={setNote} />
          {loading ? (
            <CircularProgress />
          ) : (
            <AddressSection
              user={user}
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          )}
          <VoucherSection />
          <PaymentMethodSection />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;
