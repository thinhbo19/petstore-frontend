import React, { useEffect } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";

const ProductList = ({ subTotal, products, totalPrice }) => {
  const router = useRouter();

  useEffect(() => {
    if (products.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "You have not purchased any products yet!",
        text: "Please go to the shop and buy something!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        router.push("/shop");
      });
    }
  }, [products, router]);

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      {products.length === 0 ? (
        <Typography
          variant="h6"
          sx={{ color: "red", fontWeight: "bold", textAlign: "center" }}
        >
          You have not purchased any products yet!!!!!!
        </Typography>
      ) : (
        <>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Product List
          </Typography>
          {products.map((product) => (
            <Box key={product.id} sx={{ display: "flex", marginBottom: 2 }}>
              <Image
                src={product.images}
                alt={product.info.name}
                style={{ marginRight: "1rem" }}
                width={80}
                height={80}
              />
              <Box>
                <Typography variant="body1">{product.info.name}</Typography>
                <Typography variant="body2">
                  Quantity: {product.quantity}
                </Typography>
                <Typography variant="body2">
                  Price: {product.info.price.toLocaleString("vi")} VND
                </Typography>
              </Box>
            </Box>
          ))}
          <Box
            sx={{
              marginTop: 3,
              textAlign: "right",
              display: { xs: "none", sm: "block" },
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">Subtotal:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="body1">
                  {subTotal.toLocaleString("vi")} VNĐ
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Decrease:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="body1">
                  {(subTotal - totalPrice).toLocaleString("vi")} VNĐ
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Total:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography
                  sx={{ color: "red", fontWeight: "bold" }}
                  variant="h6"
                >
                  {totalPrice.toLocaleString("vi")} VNĐ
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Paper
            elevation={2}
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              zIndex: 1000,
              margin: 0,
              p: 1,
              boxSizing: "border-box",
              width: "100%",
              display: { xs: "block", sm: "none" },
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">Subtotal:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="body1">
                  {subTotal.toLocaleString("vi")} VNĐ
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Decrease:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="body1">
                  {(subTotal - totalPrice).toLocaleString("vi")} VNĐ
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Total:</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography
                  sx={{ color: "red", fontWeight: "bold" }}
                  variant="h6"
                >
                  {totalPrice.toLocaleString("vi")} VNĐ
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </Paper>
  );
};

export default ProductList;
