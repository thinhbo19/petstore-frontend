import React from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";
import { handleChangePage } from "@/src/hooks/useChangePage";
import { Avatar } from "@mui/material";

const MobileMenu = ({
  avatar,
  mobileMenuId,
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
  handleProfileMenuOpen,
}) => {
  const router = useRouter();

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{ zIndex: "100000" }}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          color="inherit"
        >
          <Badge color="error">
            <Avatar src={avatar} />
          </Badge>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={() => handleChangePage(router, "cart")}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={() => handleChangePage(router, "favorite")}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Favorite Lists</p>
      </MenuItem>
      <MenuItem onClick={() => handleChangePage(router, "notification")}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );
};

export default MobileMenu;
