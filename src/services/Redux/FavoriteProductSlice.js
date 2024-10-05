import { createSlice } from "@reduxjs/toolkit";

const favoriteProductSlice = createSlice({
  name: "favoriteProducts",
  initialState: {
    favoriteProducts: [],
  },
  reducers: {
    setProductFavorites: (state, action) => {
      state.favoriteProducts = action.payload;
    },
    addProductFavorite: (state, action) => {
      const newFavorite = action.payload;
      const existingFavorite = state.favoriteProducts.find(
        (fav) => fav.productID === newFavorite.productID
      );

      if (!existingFavorite) {
        state.favoriteProducts.push({
          productID: newFavorite._id,
          images: newFavorite.images[0],
          nameProduct: newFavorite.nameProduct,
          nameCate: newFavorite.category.nameCate,
          price: newFavorite.price,
          createAt: new Date().toISOString(),
        });
      }
    },
    removeProductFavorite: (state, action) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (item) => item.productID !== action.payload
      );
    },
  },
});

export const {
  setProductFavorites,
  addProductFavorite,
  removeProductFavorite,
} = favoriteProductSlice.actions;

export const selectProductFavorites = (state) =>
  state.favoriteProducts.favoriteProducts;

export default favoriteProductSlice.reducer;
