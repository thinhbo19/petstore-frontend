import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";
import { generateSlug } from "@/src/services/slugifyConfig";

const FavoriteMenu = ({
  favoritesData,
  anchorElFavorite,
  favoriteMenuId,
  openFavorite,
  handleMenuFavoriteClose,
  setAnchorElFavorite,
}) => {
  const sortedFavorites = [...favoritesData].slice(0, 5);

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
            <Link
              href={
                favorite.petID
                  ? `/shop/${generateSlug(favorite.nameSpecies)}/${generateSlug(
                      favorite.nameBreed
                    )}/${generateSlug(favorite.namePet)}`
                  : `/accessory/${generateSlug(
                      favorite.nameCate
                    )}/${generateSlug(favorite.nameProduct)}`
              }
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
                src={favorite.imgPet || favorite.images}
                width={50}
                height={50}
                alt={favorite.namePet || favorite.images}
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
                  {favorite.namePet || favorite.nameProduct}
                </Typography>
                <Typography
                  variant="inherit"
                  sx={{
                    textAlign: "right",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {favorite.price}đ
                </Typography>
              </Box>
            </Link>
          </MenuItem>
        ))
      )}

      <MenuItem sx={{ textAlign: "right", justifyContent: "flex-end" }}>
        <Link
          style={{ fontSize: "0.8rem", color: "black" }}
          href="/profile/favorite"
          onClick={() => setAnchorElFavorite(null)}
        >
          More
        </Link>
      </MenuItem>
    </Menu>
  );
};

export default FavoriteMenu;
