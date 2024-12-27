import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";
import { handleChangePage } from "@/src/hooks/useChangePage";
import { Avatar } from "@mui/material";
import { unreadNotificationFunc } from "@/src/utils/NotificationFunc";
import io from "socket.io-client";
import { selectAccessToken, selectUid } from "@/src/services/Redux/useSlice";
import { useSelector } from "react-redux";
import { getChat, getMess } from "@/src/services/apiChat";
import Swal from "sweetalert2";

const MobileMenu = ({
  avatar,
  mobileMenuId,
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
  handleProfileMenuOpen,
  favoritesData,
  cartData,
}) => {
  const socketUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [socket, setSocket] = useState(null);
  const router = useRouter();
  const [userChat, setUserChat] = useState(null);
  const uid = useSelector(selectUid);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io(`${socketUrl}`);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const getUserChats = async () => {
      try {
        if (uid) {
          const res = await getChat(uid);
          setUserChat(res[0]);
        } else {
          Swal.fire({
            icon: "info",
            text: "Please login.",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserChats();
  }, [uid]);

  useEffect(() => {
    if (!userChat?._id) return;

    const fetchChatMessages = async () => {
      try {
        const res = await getMess(userChat._id);
        setMessages(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChatMessages();
  }, [userChat]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("addNewUser", uid);
  }, [socket, uid]);

  useEffect(() => {
    if (!socket) return;

    socket.on("getMess", (res) => {
      if (userChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });

    return () => {
      socket.off("getMess");
    };
  }, [socket]);

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
      <MenuItem
        onClick={() => {
          handleChangePage(router, "cart");
          handleMobileMenuClose();
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={messages.length} color="error">
            <ChatIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleChangePage(router, "cart");
          handleMobileMenuClose();
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={cartData?.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleChangePage(router, "favorite");
          handleMobileMenuClose();
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={favoritesData?.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Favorite</p>
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
