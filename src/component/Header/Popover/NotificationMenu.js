import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Box, Button, Divider } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationMenu = ({
  anchorElNotification,
  notificationMenuId,
  openNotification,
  handleMenuNotificationClose,
  notificationData,
}) => {
  return (
    <Menu
      sx={{ zIndex: "100000" }}
      anchorEl={anchorElNotification}
      id={notificationMenuId}
      keepMounted
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={openNotification}
      onClose={handleMenuNotificationClose}
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        <Button sx={{ color: "#FB5730", fontSize: "0.8rem" }}>
          <NotificationsIcon sx={{ color: "#FB5730", fontSize: "1rem" }} /> Read
          All
        </Button>
      </Box>
      {notificationData.length === 0 ? (
        <MenuItem
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1.5,
            minHeight: "100px",
          }}
        >
          <Typography
            variant="inherit"
            sx={{
              textAlign: "center",
              color: "gray",
            }}
          >
            No notifications
          </Typography>
        </MenuItem>
      ) : (
        notificationData.map((notification, index) => (
          <MenuItem
            key={index}
            sx={{
              alignItems: "center",
              gap: 1.5,
              backgroundColor:
                notification.status === false ? "#ededed" : "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="inherit"
                noWrap
                sx={{
                  overflow: "hidden",
                  whiteSpace: "normal",
                  wordWrap: "initial",
                  flexGrow: 1,
                }}
              >
                {notification.notification}{" "}
              </Typography>
            </Box>
            <Divider></Divider>
          </MenuItem>
        ))
      )}

      {/* {notificationData.length > 0 && (
        <MenuItem sx={{ textAlign: "right", justifyContent: "flex-end" }}>
          <Link
            style={{ fontSize: "0.8rem", color: "black" }}
            href="/profile/notification"
          >
            More
          </Link>
        </MenuItem>
      )} */}
    </Menu>
  );
};

export default NotificationMenu;
