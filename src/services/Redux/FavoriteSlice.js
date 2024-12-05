import { createSlice } from "@reduxjs/toolkit";
import { generateSlug } from "../slugifyConfig";

const favoriteSlice = createSlice({
  name: "favoritePets",
  initialState: {
    favorites: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload.map((item) => {
        if (item.type === "Pet") {
          return {
            favId: item.petID,
            img: item.imgPet,
            name: item.namePet,
            price: item.price,
            species: item.Species,
            breed: item.nameBreed,
            href: `/shop/${generateSlug(item.nameSpecies)}/${generateSlug(
              item.nameBreed
            )}/${generateSlug(item.namePet)}`,
            type: item.type,
            createAt: new Date().toISOString(),
          };
        } else {
          return {
            favId: item._id,
            img: item.images,
            name: item.nameProduct,
            category: item.nameCate,
            price: item.price,
            href: `/accessory/${generateSlug(item.nameCate)}/${generateSlug(
              item.nameProduct
            )}`,
            type: item.type,
            createAt: new Date().toISOString(),
          };
        }
      });
    },

    addFavorite: (state, action) => {
      const { item, type } = action.payload;
      const existingFavorite = state.favorites.find(
        (fav) => fav.favId === item._id
      );

      if (!existingFavorite) {
        if (type === "Pet") {
          state.favorites.push({
            favId: item._id,
            img: item.imgPet[0],
            name: item.namePet,
            price: item.price,
            species: item.petBreed.nameSpecies,
            breed: item.petBreed.nameBreed,
            href: `/shop/${generateSlug(
              item.petBreed.nameSpecies
            )}/${generateSlug(item.petBreed.nameBreed)}/${generateSlug(
              item.namePet
            )}`,
            type: type,
            createAt: new Date().toISOString(),
          });
        } else {
          state.favorites.push({
            favId: item._id,
            img: item.images[0],
            name: item.nameProduct,
            price: item.price,
            category: item.category.nameCate,
            href: `/accessory/${generateSlug(
              item.category.nameCate
            )}/${generateSlug(item.nameProduct)}`,
            type: type,
            createAt: new Date().toISOString(),
          });
        }
      }
    },

    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.favId !== action.payload
      );
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } =
  favoriteSlice.actions;

export const selectFavorites = (state) => state.favorites.favorites;

export default favoriteSlice.reducer;
