import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },

  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addCart: (state, action) => {
      const { id, info, quantity, newPrice, images, slug } = action.payload;

      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.newPrice = existingItem.quantity * info.price;
      } else {
        state.cart.push({
          id,
          info,
          quantity,
          newPrice,
          createAt: new Date().toISOString(),
          images,
          slug,
        });
      }
    },

    removeCart: (state, action) => {
      const id = action.payload;

      const index = state.cart.findIndex((item) => item.id === id);

      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
  },
});

export const { setCart, addCart, removeCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
