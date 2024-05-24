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
