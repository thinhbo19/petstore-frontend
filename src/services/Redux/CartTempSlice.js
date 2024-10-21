import { createSlice } from "@reduxjs/toolkit";

const cartTempSlice = createSlice({
  name: "cartTemp",
  initialState: {
    cartTemp: [],
  },

  reducers: {
    setCartTemp: (state, action) => {
      state.cartTemp = action.payload;
    },
    addCartTemp: (state, action) => {
      const { id, info, quantity, newPrice, images } = action.payload;

      const existingItem = state.cartTemp.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.newPrice = existingItem.quantity * info.price;
      } else {
        state.cartTemp.push({
          id,
          info,
          quantity,
          newPrice,
          createAt: new Date().toISOString(),
          images,
        });
      }
    },

    removeCartTemp: (state, action) => {
      const id = action.payload;

      const index = state.cartTemp.findIndex((item) => item.id === id);

      if (index !== -1) {
        state.cartTemp.splice(index, 1);
      }
    },
  },
});

export const { setCartTemp, addCartTemp, removeCartTemp } =
  cartTempSlice.actions;

export const selectCartTemp = (state) => state.cartTemp.cartTemp;

export default cartTempSlice.reducer;
