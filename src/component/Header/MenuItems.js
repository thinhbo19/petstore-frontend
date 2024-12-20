import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { usePathname, useRouter } from "next/navigation";
import { handleChangePage } from "@/src/hooks/useChangePage";

// Helper function to check active path
const isActivePath = (path, activePaths) => {
  return activePaths.some(
    (activePath) => path === activePath || path.startsWith(activePath)
  );
};

const MenuItems = ({ handleMenuHomeOpen, handleMenuPetsOpen }) => {
  const router = useRouter();
  const pathName = usePathname();

  // Paths where the menu items should be active
  const activePathsHome = ["/about-us", "/spa-services", "/news", "/contact"];
  const activePathsPets = ["/shop"];
  const activePathsVoucher = ["/voucher"];
  const activePathsMore = ["/accessory"];

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
          fontFamily: "Quicksand",
          fontWeight: "bold",
          fontSize: { xs: "14px", sm: "16px", md: "16px" },
          backgroundColor:
            isActivePath(pathName, activePathsHome) || pathName === "/"
              ? "#F7452E"
              : "",
          borderRadius: "20px",
          color:
            isActivePath(pathName, activePathsHome) || pathName === "/"
              ? "white"
              : "black",
        }}
        aria-label="Home"
      >
        HOME
      </MenuItem>
      <MenuItem
        onClick={handleMenuPetsOpen}
        sx={{
          fontFamily: "Quicksand",
          fontWeight: "bold",
          fontSize: { xs: "14px", sm: "16px", md: "16px" },
          backgroundColor: isActivePath(pathName, activePathsPets)
            ? "#F7452E"
            : "",
          borderRadius: "20px",
          color: isActivePath(pathName, activePathsPets) ? "white" : "black",
        }}
        aria-label="Pets"
      >
        PETS
      </MenuItem>
      <MenuItem
        onClick={() => handleChangePage(router, "Voucher")}
        sx={{
          fontFamily: "Quicksand",
          fontWeight: "bold",
          fontSize: { xs: "14px", sm: "16px", md: "16px" },
          backgroundColor: isActivePath(pathName, activePathsVoucher)
            ? "#F7452E"
            : "",
          borderRadius: "20px",
          color: isActivePath(pathName, activePathsVoucher) ? "white" : "black",
        }}
        aria-label="Voucher"
      >
        VOUCHER
      </MenuItem>
      <MenuItem
        onClick={() => handleChangePage(router, "More")}
        sx={{
          fontFamily: "Quicksand",
          fontWeight: "bold",
          fontSize: { xs: "14px", sm: "16px", md: "16px" },
          backgroundColor: isActivePath(pathName, activePathsMore)
            ? "#F7452E"
            : "",
          borderRadius: "20px",
          color: isActivePath(pathName, activePathsMore) ? "white" : "black",
        }}
        aria-label="More"
      >
        MORE
      </MenuItem>
    </Box>
  );
};

export default MenuItems;
