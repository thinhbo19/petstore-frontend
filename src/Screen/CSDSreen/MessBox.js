import React, { useEffect, useState, useRef } from "react";
import { Avatar } from "@mui/material";
import { getMess, postMess } from "../../services/apiChat";
import { format } from "date-fns";
import Swal from "sweetalert2";
import InputEmoji from "react-input-emoji";

const MessBox = ({
  chatId,
  uid,
  accessToken,
  username,
  avatar,
  socket,
  recipientId,
  onlineUser,
  currentChat,
  setNotifications,
}) => {
  const [mess, setMess] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messData = await getMess(accessToken, currentChat?._id);
        setMess(messData);
        scrollToBottom();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentChat, accessToken]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("addNewUser", uid);

    socket.on("getMess", (res) => {
      setMess((prevMess) => [...prevMess, res]);
      scrollToBottom();
    });

    return () => {
      socket.off("getMess");
    };
  }, [socket, uid, recipientId]);

  useEffect(() => {
    scrollToBottom();
  }, [mess]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) {
      return "";
    }
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return "";
    }
    return format(date, "HH:mm:ss, dd/MM/yyyy");
  };

  const handleSendMess = async () => {
    try {
      if (text.trim() === "") {
        Swal.fire({
          icon: "info",
          text: "Please enter a message before sending.",
        });
      } else {
        const res = await postMess(accessToken, chatId, text, uid);
        const newMessage = res;
        setMess((prevMess) => [...prevMess, newMessage]);
        setText("");
        scrollToBottom();
        socket.emit("sendMess", {
          ...newMessage,
          recipientId,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        icon: "error",
        text: "Failed to send message. Please try again later.",
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setText((prevText) => prevText + "\n");
    } else if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  if (chatId === "CustomerMessages" || chatId === "CustomerMessages/") {
    return <div className="mess__box">No user selected</div>;
  }

  return (
    <div className="mess__box">
      <div className="mess__box__top">
        <Avatar src={avatar} alt="Avatar" className="chatlist__avatar" />
        <p>{username}</p>
      </div>
      <div className="mess__box__mid">
        {mess &&
          mess.map((m) => (
            <div
              key={m._id}
              className={m.senderId === uid ? "messServer" : "messClient"}
            >
              <pre
                style={{
                  fontSize: "1rem",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                {m.text}
              </pre>
              <p className="timemess">{formatDate(m.createdAt)}</p>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mess__box__bot">
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <button className="upload-button">Upload Image</button>
        </label>
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleSendMess}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
        />
        <button className="btnsend" onClick={handleSendMess}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessBox;
