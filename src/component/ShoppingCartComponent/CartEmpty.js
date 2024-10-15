import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const CartEmpty = ({}) => {
  const router = useRouter();
  const handleChangePage = () => {
    router.push("/shop");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 1,
        height: "50vh",
      }}
    >
      <Typography variant="h6" sx={{ width: "100%", textAlign: "center" }}>
        Your cart is empty.{" "}
        <Button
          variant="contained"
          fullWidth
          sx={{
            background: "#F84C2F",
            width: { xs: "40%", sm: "10%" },
          }}
          onClick={() => handleChangePage()}
        >
          Buy Now
        </Button>{" "}
      </Typography>
    </Box>
  );
};

export default CartEmpty;
