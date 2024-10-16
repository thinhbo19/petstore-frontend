import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";

const CartMenu = ({
  anchorElCart,
  cartMenuId,
  openCart,
  handleMenuCartClose,
  cartData,
}) => {
  return (
    <Menu
      sx={{ zIndex: "100000" }}
      anchorEl={anchorElCart}
      id={cartMenuId}
      keepMounted
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={openCart}
      onClose={handleMenuCartClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 12,
              width: 25,
              height: 25,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
    >
      {cartData.length === 0 ? (
        <MenuItem sx={{ textAlign: "center" }}>
          <Typography variant="body2">There are no products yet</Typography>
        </MenuItem>
      ) : (
        cartData.map((cart, index) => (
          <MenuItem key={index} sx={{ alignItems: "center", gap: 1.5 }}>
            <Link
              href={cart.info.slug || ""}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textDecoration: "none",
                color: "black",
                width: "100%",
              }}
            >
              <Image
                src={cart.images}
                width={50}
                height={50}
                alt={cart.info.name}
              />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  maxWidth: "350px",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="inherit"
                  noWrap
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    flexGrow: 1,
                    marginLeft: "5px",
                  }}
                >
                  {cart.info.name}
                </Typography>
                <Typography
                  variant="inherit"
                  sx={{
                    textAlign: "right",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  {cart.info.price}đ
                </Typography>
              </Box>
            </Link>
          </MenuItem>
        ))
      )}

      <MenuItem sx={{ textAlign: "right", justifyContent: "flex-end" }}>
        <Link
          onClick={handleMenuCartClose}
          style={{ fontSize: "0.8rem", color: "black" }}
          href="/cart"
        >
          More
        </Link>
      </MenuItem>
    </Menu>
  );
};

export default CartMenu;
