import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favoritePets",
  initialState: {
    favorites: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      const newFavorite = action.payload;
      const existingFavorite = state.favorites.find(
        (fav) => fav.petID === newFavorite.petID
      );

      if (!existingFavorite) {
        state.favorites.push({
          petID: newFavorite._id,
          imgPet: newFavorite.imgPet[0],
          namePet: newFavorite.namePet,
          nameBreed: newFavorite.petBreed.nameBreed,
          nameSpecies: newFavorite.petBreed.nameSpecies,
          age: newFavorite.age,
          gender: newFavorite.gender,
          price: newFavorite.price,
          createAt: new Date().toISOString(),
        });
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.petID !== action.payload
      );
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } =
  favoriteSlice.actions;

export const selectFavorites = (state) => state.favorites.favorites;

export default favoriteSlice.reducer;
