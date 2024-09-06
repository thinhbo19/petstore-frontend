import React from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";
import { handleChangePage } from "@/src/hooks/useChangePage";

const MobileMenu = ({
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
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          color="inherit"
        >
          <Badge color="error">
            <MoreIcon />
          </Badge>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <ShoppingCartIcon
              onClick={() => handleChangePage(router, "cart")}
            />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <FavoriteIcon
              onClick={() => handleChangePage(router, "favorite")}
            />
          </Badge>
        </IconButton>
        <p>Favorite Lists</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon
              onClick={() => handleChangePage(router, "notification")}
            />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );
};

export default MobileMenu;
