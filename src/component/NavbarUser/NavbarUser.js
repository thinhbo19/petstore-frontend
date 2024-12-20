"use client";
import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  IconButton,
  Drawer,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HistoryIcon from "@mui/icons-material/History";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LockIcon from "@mui/icons-material/Lock";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { usePathname } from "next/navigation";

const NavbarUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const linkStyles = (href) => ({
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "black",
    width: "100%",
    "&:hover": {
      color: "white",
    },
  });

  const isActive = (href) => pathName === href;

  const iconList = (
    <List
      sx={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      {[
        { href: "/profile", icon: <PersonIcon />, text: "Profile" },
        { href: "/profile/address", icon: <LocationOnIcon />, text: "Address" },
        {
          href: "/profile/order-history",
          icon: <HistoryIcon />,
          text: "Order History",
        },
        {
          href: "/profile/booking-history",
          icon: <CalendarMonthIcon />,
          text: "Booking History",
        },
        {
          href: "/profile/voucher",
          icon: <CardGiftcardIcon />,
          text: "Voucher",
        },
        {
          href: "/profile/notifications",
          icon: <NotificationsIcon />,
          text: "Notification",
        },
        { href: "/profile/favorite", icon: <FavoriteIcon />, text: "Favorite" },
        {
          href: "/profile/change-password",
          icon: <LockIcon />,
          text: "Change Password",
        },
      ].map(({ href, icon, text }) => (
        <ListItem
          button
          key={href}
          sx={{
            marginBottom: "20px",
            backgroundColor: isActive(href) ? "#F7452E" : "transparent",
            "&:hover": {
              backgroundColor: "#F7452E",
            },
            borderRadius: "0 20px 20px 0",
          }}
        >
          <Link href={href} style={linkStyles(href)}>
            <ListItemIcon>
              {React.cloneElement(icon, {
                sx: {
                  fontSize: "2rem",
                  color: isActive(href) ? "white" : "black",
                  "&:hover": {
                    color: "white",
                  },
                },
              })}
            </ListItemIcon>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontSize: {
                  xs: "1rem",
                  sm: "1rem",
                  md: "0.8rem",
                  lg: "0.9rem",
                },
                fontWeight: "bold",
                color: isActive(href) ? "white" : "black",
              }}
            >
              {text}
            </Typography>
          </Link>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box>
      <IconButton
        sx={{
          display: { md: "none" },
          width: "35px",
          height: "35px",
          backgroundColor: "#ededed",
          marginTop: "15px",
        }}
        onClick={toggleDrawer}
      >
        <ArrowForwardIosIcon sx={{ fontSize: "1.2rem" }} />
      </IconButton>

      <Drawer
        sx={{ zIndex: "10000000" }}
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
      >
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          {iconList}
        </Box>
      </Drawer>

      <Box sx={{ display: { xs: "none", md: "block" } }}>{iconList}</Box>
    </Box>
  );
};

export default NavbarUser;
