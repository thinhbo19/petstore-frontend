"use client";
import { useFetchFavorites } from "@/src/hooks/useFetchFavorites";
import { createContext, useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../Redux/useSlice";

// Tạo Context cho Favorite
const FavoriteContext = createContext();

// Tạo provider để cung cấp dữ liệu favorite cho toàn bộ ứng dụng
export const FavoriteProvider = ({ children }) => {
  const accessToken = useSelector(selectAccessToken);

  const { favoritesData } = useFetchFavorites(accessToken);

  const [favorites, setFavorites] = useState(favoritesData);

  // Khi component được mount, nạp dữ liệu từ localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Mỗi khi danh sách yêu thích thay đổi, lưu nó vào localStorage
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  // Hàm thêm sản phẩm vào danh sách yêu thích
  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => [...prevFavorites, product]);
  };

  // Hàm xóa sản phẩm khỏi danh sách yêu thích
  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((p) => p.id !== productId)
    );
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useFavorite = () => {
  return useContext(FavoriteContext);
};
