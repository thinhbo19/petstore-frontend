import React, { useEffect, useState, useCallback } from "react";
import "./Mess.css";
import { styled, alpha } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Logout from "../../assets/log-out.svg";
import {
  setLogout,
  selectAccessToken,
  selectAdmin,
  selectUid,
} from "../../services/useSlice";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ChatList from "./ChatList";
import MessBox from "./MessBox";
import io from "socket.io-client";
import FetchDataMess from "./FetchDataMess";
import { getOneChat } from "../../services/apiChat";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  color: "white",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Mess = () => {
  const accessToken = useSelector(selectAccessToken);
  const uid = useSelector(selectUid);
  const [recipientId, setRecipientId] = useState(null);
  const role = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const location = useLocation();
  const chatId = location.pathname.split("/").pop();
  const [currentChat, setCurrentChat] = useState(null);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "");
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  const fetchData = useCallback(async () => {
    await FetchDataMess(
      accessToken,
      uid,
      role,
      navigate,
      setUserList,
      setFilteredUserList,
      chatId,
      setCurrentChat
    );
  }, [accessToken, uid, role, navigate, chatId]);

  const fetchRecipientId = useCallback(async () => {
    try {
      if (chatId !== "CustomerMessages") {
        const { chat, recId } = await getOneChat(accessToken, chatId, uid);
        setRecipientId(recId);
        setCurrentChat(chat);
      }
    } catch (error) {
      console.error(error);
    }
  }, [accessToken, chatId, uid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchRecipientId();
  }, [fetchRecipientId]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUserList(userList);
    } else {
      const filteredUsers = userList.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUserList(filteredUsers);
    }
  }, [searchTerm, userList]);

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    }
    if (avatar) {
      localStorage.setItem("avatar", avatar);
    }
  }, [username, avatar]);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", uid);
    socket.on("getOnlineUser", (res) => {
      setOnlineUser(res);
    });
    return () => {
      socket.off("getOnlineUser");
    };
  }, [socket, uid]);

  const handleUserClick = (username, avatar) => {
    setUsername(username);
    setAvatar(avatar);
  };

  return (
    <div className="mess__container">
      <div className="mess__left">
        <div className="mess__left__top">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </Search>
          <img
            className="mess__logout"
            src={Logout}
            alt="logout"
            onClick={handleLogout}
          />
        </div>
        <ChatList
          filteredUserList={filteredUserList}
          chatId={chatId}
          onUserClick={handleUserClick}
        />
      </div>
      <MessBox
        uid={uid}
        chatId={chatId}
        accessToken={accessToken}
        username={username}
        avatar={avatar}
        socket={socket}
        recipientId={recipientId}
        onlineUser={onlineUser}
        currentChat={currentChat}
        setNotifications={setNotifications}
      />
    </div>
  );
};

export default Mess;
