import axios from "axios";
import { apiUrlChat, apiUrlMess } from "./config";

export const getChat = async (accessToken, userId) => {
  try {
    const res = await axios.get(`${apiUrlChat}/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const getMess = async (accessToken, chatId) => {
  try {
    const res = await axios.get(`${apiUrlMess}/${chatId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const postMess = async (accessToken, chatId, text, senderId) => {
  try {
    const res = await axios.post(
      `${apiUrlMess}`,
      {
        chatId: chatId,
        text: text,
        senderId: senderId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error posting message:", error);
    throw error;
  }
};

export const getOneChat = async (accessToken, chatId, senderId) => {
  try {
    const res = await axios.get(`${apiUrlChat}/findone/${chatId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const chat = res.data[0];

    const recId = chat.members.find((member) => member !== senderId);

    return { recId, chat };
  } catch (error) {
    console.error("Error fetching chat:", error);
    throw error;
  }
};
