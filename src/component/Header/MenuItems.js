import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { handleChangePage } from "@/src/hooks/useChangePage";

const MenuItems = ({ handleMenuHomeOpen, handleMenuPetsOpen }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        alignItems: "center",
        flexGrow: 2,
        gap: 2,
        zIndex: "100000",
      }}
    >
      <MenuItem onClick={handleMenuHomeOpen} sx={{ fontWeight: "bold" }}>
        HOME
      </MenuItem>
      <MenuItem onClick={handleMenuPetsOpen} sx={{ fontWeight: "bold" }}>
        PETS
      </MenuItem>
      <MenuItem
        onClick={() => handleChangePage(router, "Voucher")}
        sx={{ fontWeight: "bold" }}
      >
        VOUCHER
      </MenuItem>
      <MenuItem
        onClick={() => handleChangePage(router, "More")}
        sx={{ fontWeight: "bold" }}
      >
        MORE
      </MenuItem>
    </Box>
  );
};

export default MenuItems;
