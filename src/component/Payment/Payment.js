"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import ProductList from "./ProductList";
import NoteSection from "./NoteSection";
import AddressSection from "./AddressSection";
import VoucherSection from "./VoucherSection";
import PaymentMethodSection from "./PaymentMethodSection";
import { getCurrentUser, getVouchersUser } from "@/src/services/apiUser";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import axios from "axios";
import { apiUrlUser, apiUrlOrder } from "@/src/services/config";
import { selectCartTemp } from "@/src/services/Redux/CartTempSlice";
import { selectCart } from "@/src/services/Redux/CartSlice";
import Swal from "sweetalert2";
import { removeCart } from "@/src/services/Redux/CartSlice";
import { useRouter } from "next/navigation";
import { getCurrentVoucher } from "@/src/services/apiVocher";

const Payment = () => {
  const cartUser = useSelector(selectCart);
  const cartData = useSelector(selectCartTemp);
  const [user, setUser] = useState(null);
  const [note, setNote] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector(selectAccessToken);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getCurrentUser(accessToken);
        const res = await getVouchersUser(accessToken);
        setVouchers(res);
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

  useEffect(() => {
    const fetchTotalPrice = async () => {
      try {
        let totalPrice = cartData.reduce(
          (total, product) => total + product.newPrice,
          0
        );
        setSubTotal(totalPrice);
        if (selectedVoucher) {
          const voucher = await getCurrentVoucher(selectedVoucher);
          const discount = voucher.discount;
          const lastTotal = totalPrice - (totalPrice * discount) / 100;
          setTotalAmount(lastTotal);
        } else {
          setTotalAmount(totalPrice);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTotalPrice();
  }, [selectedVoucher]);

  const handlePayPal = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrlOrder}/order`,
        {
          products: cartData.map((prod) => ({
            id: prod.id,
            img: prod.images,
            name: prod.info.name,
            count: prod.quantity,
            price: prod.info.price,
          })),
          note: note,
          address: selectedAddress,
          coupon: selectedVoucher,
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
        for (const product of cartData) {
          if (cartUser.length !== 0) {
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
    } finally {
      setLoading(false);
    }
  };
  const handlePayOCD = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrlOrder}/order`,
        {
          products: cartData.map((prod) => ({
            id: prod.id,
            img: prod.images,
            name: prod.info.name,
            count: prod.quantity,
            price: prod.info.price,
          })),
          note: note,
          address: selectedAddress,
          coupon: selectedVoucher,
          paymentMethod: "PaymentDelivery",
          orderBy: user?._id,
        },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        for (const product of cartData) {
          if (cartUser.length !== 0) {
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
    } finally {
      setLoading(false);
    }
  };
  const handleVNPay = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrlOrder}/createUrl`,
        {
          products: cartData.map((prod) => ({
            id: prod.id,
            img: prod.images,
            name: prod.info.name,
            count: prod.quantity,
            price: prod.info.price,
          })),
          note: note,
          address: selectedAddress,
          coupon: selectedVoucher,
          paymentMethod: "VNPay",
          orderBy: user?._id,
          bankCode: "NCB",
        },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );
      router.push(res.data.paymentUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

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
          <ProductList
            subTotal={subTotal}
            products={cartData}
            totalPrice={totalAmount}
            setTotalAmount={setTotalAmount}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <NoteSection note={note} setNote={setNote} />

          <AddressSection
            user={user}
            addresses={addresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />

          <VoucherSection
            subTotal={subTotal}
            vouchers={vouchers}
            selectedVoucher={selectedVoucher}
            setSelectedVoucher={setSelectedVoucher}
          />
          <PaymentMethodSection
            totalAmount={totalAmount}
            handlePayPal={handlePayPal}
            handlePayOCD={handlePayOCD}
            handleVNPay={handleVNPay}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;
