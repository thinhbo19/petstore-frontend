import axios from "axios";
import { apiUrlChat, apiUrlMess } from "./config";

export const createChat = async (userId) => {
  try {
    const res = await axios.post(`${apiUrlChat}`, {
      secondId: userId,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const getChat = async (userId) => {
  try {
    const res = await axios.get(`${apiUrlChat}/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const deleteChat = async (chatId) => {
  try {
    const res = await axios.delete(`${apiUrlChat}/${chatId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const getMess = async (chatId) => {
  try {
    const res = await axios.get(`${apiUrlMess}/${chatId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const postMess = async (chatId, text, senderId) => {
  try {
    const res = await axios.post(`${apiUrlMess}`, {
      chatId: chatId,
      text: text,
      senderId: senderId,
    });
    return res.data;
  } catch (error) {
    console.error("Error posting message:", error);
    throw error;
  }
};

export const getOneChat = async (chatId, senderId) => {
  try {
    const res = await axios.get(`${apiUrlChat}/findone/${chatId}`);
    const chat = res.data[0];

    const recId = chat.members?.find((member) => member !== senderId);

    return { recId, chat };
  } catch (error) {
    console.error("Error fetching chat:", error);
    throw error;
  }
};

export const getLatestMess = async (chatId) => {
  try {
    const res = await axios.get(`${apiUrlMess}/${chatId}/latest`);
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const findOneChat = async (adminId, userid) => {
  try {
    const res = await axios.get(`${apiUrlChat}/find/${adminId}/${userid}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
