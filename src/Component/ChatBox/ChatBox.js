import React, { useEffect, useState } from "react";
import "./ChatBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/logo.svg";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUid } from "../../services/useSlice";
const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const uid = useSelector(selectUid);
  const [onlineUser, setOnlineUser] = useState([]);
  const accessToken = useSelector(selectAccessToken);

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

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbox__container">
      {!isOpen && (
        <img
          src={Logo}
          className="chatbox__icon"
          alt=""
          onClick={toggleChatBox}
        />
      )}

      {isOpen && (
        <div className="chatbox__content">
          <div className="chatbox__header">
            <p>Customer Support Department</p>
            <FontAwesomeIcon
              className="chatbox__iconOut"
              icon={faCircleXmark}
              onClick={toggleChatBox}
            />
          </div>
          <div className="chatbox__messages">
            {/* Messages will go here */}
            <div className="chatbox__message">Sample message</div>
          </div>
          <div className="chatbox__input">
            {/* Input area for typing messages */}
            <input type="text" placeholder="Type your message..." />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
