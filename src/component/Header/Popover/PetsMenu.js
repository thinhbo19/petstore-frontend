import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat, faDog } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@mui/material";
import { generateSlug } from "@/src/services/slugifyConfig";

const PetsMenu = ({
  anchorElPets,
  petsMenuId,
  openPets,
  handleMenuPetsClose,
  allDog,
  allCat,
}) => {
  const router = useRouter();

  const handleLinkClick = (href) => {
    router.push(href);
    handleMenuPetsClose(); // Đóng menu sau khi click
  };

  return (
    <Menu
      sx={{ zIndex: "100000" }}
      anchorEl={anchorElPets}
      id={petsMenuId}
      keepMounted
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      open={openPets}
      onClose={handleMenuPetsClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            width: {
              xs: 300,
              sm: 450,
              md: 800,
            },
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
              left: 25,
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MenuItem
            onClick={() => handleLinkClick("/shop/dog")}
            sx={{ fontWeight: "bold", cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faDog} />
            ALL DOG
          </MenuItem>
          {allDog.map((dog) => (
            <MenuItem
              key={dog._id}
              onClick={() =>
                handleLinkClick(`/shop/dog/${generateSlug(dog.nameBreed)}`)
              }
              sx={{ cursor: "pointer" }}
            >
              {dog.nameBreed}
            </MenuItem>
          ))}
        </Grid>

        <Grid item xs={6}>
          <MenuItem
            onClick={() => handleLinkClick("/shop/cat")}
            sx={{ fontWeight: "bold", cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faCat} />
            ALL CAT
          </MenuItem>
          {allCat.map((cat) => (
            <MenuItem
              key={cat._id}
              onClick={() =>
                handleLinkClick(`/shop/cat/${generateSlug(cat.nameBreed)}`)
              }
              sx={{ cursor: "pointer" }}
            >
              <Typography>{cat.nameBreed}</Typography>
            </MenuItem>
          ))}
        </Grid>
      </Grid>
    </Menu>
  );
};

export default PetsMenu;
