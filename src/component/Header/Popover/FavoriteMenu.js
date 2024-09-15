import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";

const FavoriteMenu = ({
  favoritesData,
  anchorElFavorite,
  favoriteMenuId,
  openFavorite,
  handleMenuFavoriteClose,
}) => {
  const sortedFavorites = [...favoritesData] // Sao chép mảng
    .sort((a, b) => new Date(a.createNow) - new Date(b.createNow)) // Sắp xếp dựa trên createNow
    .slice(0, 5); // Lấy 5 phần tử đầu tiên

  return (
    <Menu
      sx={{ zIndex: "100000" }}
      anchorEl={anchorElFavorite}
      id={favoriteMenuId}
      keepMounted
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={openFavorite}
      onClose={handleMenuFavoriteClose}
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
      {sortedFavorites.length === 0 ? (
        <MenuItem sx={{ textAlign: "center" }}>
          <Typography variant="body2">
            There are no favorite products yet
          </Typography>
        </MenuItem>
      ) : (
        sortedFavorites.map((favorite, index) => (
          <MenuItem key={index} sx={{ alignItems: "center", gap: 1.5 }}>
            <Image
              src={favorite.imgPet}
              width={50}
              height={50}
              alt={favorite.namePet}
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
                }}
              >
                {favorite.namePet}
              </Typography>
              <Typography
                variant="inherit"
                sx={{
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {favorite.price}đ
              </Typography>
            </Box>
          </MenuItem>
        ))
      )}

      <MenuItem sx={{ textAlign: "right", justifyContent: "flex-end" }}>
        <Link
          style={{ fontSize: "0.8rem", color: "black" }}
          href="/profile/favorite"
        >
          More
        </Link>
      </MenuItem>
    </Menu>
  );
};

export default FavoriteMenu;
