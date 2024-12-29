"use client";
import React from "react";
import "../ChatBox/ChatBox.css";
import Image from "next/image";
import Mess from "../../../public/mess.png";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAccessToken, selectAdmin } from "@/src/services/Redux/useSlice";
import { Box } from "@mui/material";

const ChatBotMessenger = () => {
  const router = useRouter();
  const handlePush = () => {
    router.push("https://m.me/394058487122884?ref=w27982029");
  };
  const accessToken = useSelector(selectAccessToken);
  const role = useSelector(selectAdmin);

  return (
    <>
      {accessToken && role === "User" && (
        <Box
          sx={{ display: { xs: "none", md: "block" } }}
          className="chatbot_mess"
        >
          <Image
            onClick={handlePush}
            src={Mess}
            alt="chatbot_mess"
            width={50}
            height={50}
          />
        </Box>
      )}
    </>
  );
};

export default ChatBotMessenger;
