import { useEffect, useState } from "react";
import { getFavorites } from "../services/apiUser";

export const useFetchFavorites = (accessToken) => {
  const [favoritesData, setFavorites] = useState([]);

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const res = await getFavorites(accessToken);
          setFavorites(res?.favorites);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [accessToken]);

  return { favoritesData };
};
