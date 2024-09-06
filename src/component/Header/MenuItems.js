import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { handleChangePage } from "@/src/hooks/useChangePage";

const MenuItems = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        alignItems: "center",
        flexGrow: 2,
        gap: 2,
      }}
    >
      <MenuItem
        onClick={() => handleChangePage(router, "home")}
        sx={{ fontWeight: "bold" }}
      >
        HOME
      </MenuItem>
      <MenuItem
        onClick={() => handleChangePage(router, "pets")}
        sx={{ fontWeight: "bold" }}
      >
        PETS
      </MenuItem>
      <MenuItem
        onClick={() => handleChangePage(router, "voucher")}
        sx={{ fontWeight: "bold" }}
      >
        VOUCHER
      </MenuItem>
      <MenuItem
        onClick={() => handleChangePage(router, "more")}
        sx={{ fontWeight: "bold" }}
      >
        MORE
      </MenuItem>
    </Box>
  );
};

export default MenuItems;
