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
        display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
        alignItems: "center",
        flexGrow: 2,
        gap: 2,
        zIndex: "100000",
        flexDirection: { xs: "column", sm: "row" },
        padding: { xs: 2, sm: 0 },
        textAlign: { xs: "center", sm: "left" },
      }}
    >
      <MenuItem
        onClick={handleMenuHomeOpen}
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "14px", sm: "16px", md: "16px" },
        }}
      >
        HOME
      </MenuItem>
      <MenuItem
        onClick={handleMenuPetsOpen}
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "14px", sm: "16px", md: "16px" },
        }}
      >
        PETS
      </MenuItem>
      <MenuItem
        onClick={() => handleChangePage(router, "Voucher")}
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "14px", sm: "16px", md: "16px" },
        }}
      >
        VOUCHER
      </MenuItem>
      <MenuItem
        onClick={() => handleChangePage(router, "More")}
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "14px", sm: "16px", md: "16px" },
        }}
      >
        MORE
      </MenuItem>
    </Box>
  );
};

export default MenuItems;
