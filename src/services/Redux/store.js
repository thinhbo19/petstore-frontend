import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./useSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import FavoriteSlice from "./FavoriteSlice";
import CartSlice from "./CartSlice";
import CartTempSlice from "./CartTempSlice";
import NotificationSlice from "./NotificationSlice";

const rootReducer = combineReducers({
  user: userReducer,
  favorites: FavoriteSlice,
  cart: CartSlice,
  cartTemp: CartTempSlice,
  notification: NotificationSlice,
});

const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["favorites", "favoriteProducts", "cart", "cartTemp"],
  // whitelist: ["login", "accessToken"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
