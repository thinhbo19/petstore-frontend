// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./useSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import FavoriteSlice from "./FavoriteSlice";
import FavoriteProductSlice from "./FavoriteProductSlice";
import CartSlice from "./CartSlice";
import CartTempSlice from "./CartTempSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  favorites: FavoriteSlice,
  favoriteProducts: FavoriteProductSlice,
  cart: CartSlice,
  cartTemp: CartTempSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
