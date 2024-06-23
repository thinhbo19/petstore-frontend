import axios from "axios";
import { apiUrlUser } from "./config";

export const getAllUsers = async (accessToken) => {
  try {
    const res = await axios.get(`${apiUrlUser}/allUser`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.users;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};
export const getUsersForChat = async (accessToken, uid) => {
  try {
    const res = await axios.get(`${apiUrlUser}/userCurrent/?_id=${uid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.message;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};
export const patchIsBlockedUser = async (accessToken, uid, isBlocked) => {
  try {
    const res = await axios.patch(
      `${apiUrlUser}/adminUpdate`,
      { userId: uid, isBlocked: !isBlocked },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};
export const patchChangeRole = async (accessToken, uid, newRole) => {
  try {
    const res = await axios.patch(
      `${apiUrlUser}/changeRole`,
      { userId: uid, newRole: newRole },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};
