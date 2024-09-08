import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import TextImage from "../../../../public/Breed/Dog/anh-meo-Bengal-5.jpg";
import Link from "next/link";
import { Box } from "@mui/material";

const CartMenu = ({
  anchorElCart,
  cartMenuId,
  openCart,
  handleMenuCartClose,
}) => {
  return (
    <Menu
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
      <MenuItem sx={{ alignItems: "center", gap: 1.5 }}>
        <Image src={TextImage} width={100} height={100} alt="" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            maxWidth: "300px",
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
            }}
          >
            A very long text that overflows
          </Typography>
          <Typography
            variant="inherit"
            sx={{
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            1.900.000đ
          </Typography>
        </Box>
      </MenuItem>

      <MenuItem sx={{ textAlign: "right", justifyContent: "flex-end" }}>
        <Link style={{ fontSize: "0.8rem", color: "black" }} href="/cart">
          More
        </Link>
      </MenuItem>
    </Menu>
  );
};

export default CartMenu;
