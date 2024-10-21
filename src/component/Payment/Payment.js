"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import ProductList from "./ProductList";
import NoteSection from "./NoteSection";
import AddressSection from "./AddressSection";
import VoucherSection from "./VoucherSection";
import PaymentMethodSection from "./PaymentMethodSection";
import { getCurrentUser } from "@/src/services/apiUser";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import axios from "axios";
import { apiUrlUser, apiUrOrder } from "@/src/services/config";
import { selectCartTemp } from "@/src/services/Redux/CartTempSlice";
import { selectCart } from "@/src/services/Redux/CartSlice";
import Swal from "sweetalert2";
import { removeCart } from "@/src/services/Redux/CartSlice";
import { useRouter } from "next/navigation";

const Payment = () => {
  const cartUser = useSelector(selectCart);
  const cartData = useSelector(selectCartTemp);
  const [user, setUser] = useState(null);
  const [note, setNote] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector(selectAccessToken);
  const router = useRouter();
  const dispatch = useDispatch();

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

  const handleThanhToanPayPal = async () => {
    try {
      const res = await axios.post(
        `${apiUrOrder}/order`,
        {
          products: cartData.map((prod) => ({
            id: prod.id,
            img: prod.images,
            name: prod.info.name,
            count: prod.quantity,
          })),
          note: note,
          address: selectedAddress,
          coupon: "",
          paymentMethod: "PayPal",
          orderBy: user?._id,
        },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        if (cartUser > 0) {
          for (const product of cartData) {
            await axios.delete(`${apiUrlUser}/allOneCart`, {
              data: {
                id: product.id,
                userID: user?._id,
              },
            });
            dispatch(removeCart(product.id));
          }
        }

        Swal.fire({
          title: "Successfully!",
          text: "You have successfully placed your order.!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          router.push(`/order-detail/${res.data.data._id}`);
        });
      } else {
        Swal.fire({
          title: "ĐẶT HÀNG THẤT BẠI",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <ProductList products={cartData} setTotalAmount={setTotalAmount} />
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
          <PaymentMethodSection
            totalAmount={totalAmount}
            handleThanhToanPayPal={handleThanhToanPayPal}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;
