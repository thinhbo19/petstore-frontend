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
        display: { xs: "none", sm: "none", md: "flex", lg: "flex" }, // Hide on extra small screens, show on small and up
        alignItems: "center",
        flexGrow: 2,
        gap: 2,
        zIndex: "100000",
        flexDirection: { xs: "column", sm: "row" }, // Column layout on small screens, row on larger screens
        padding: { xs: 2, sm: 0 }, // Padding adjustments
        textAlign: { xs: "center", sm: "left" }, // Center text on small screens, left-align on larger
      }}
    >
      <MenuItem
        onClick={handleMenuHomeOpen}
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "14px", sm: "16px", md: "18px" },
        }} // Responsive font size
      >
        HOME
      </MenuItem>
      <MenuItem
        onClick={handleMenuPetsOpen}
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "14px", sm: "16px", md: "18px" },
        }} // Responsive font size
      >
        PETS
      </MenuItem>
      <MenuItem
        onClick={() => handleChangePage(router, "Voucher")}
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "14px", sm: "16px", md: "18px" },
        }} // Responsive font size
      >
        VOUCHER
      </MenuItem>
      <MenuItem
        onClick={() => handleChangePage(router, "More")}
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "14px", sm: "16px", md: "18px" },
        }} // Responsive font size
      >
        MORE
      </MenuItem>
    </Box>
  );
};

export default MenuItems;
