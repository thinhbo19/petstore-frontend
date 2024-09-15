import { setFavorites } from "../services/Redux/FavoriteSlice";

export const handleLogout = (dispatch, router, setLogout) => {
  dispatch(setLogout());
  dispatch(setFavorites([]));
  router.push("/login");
};

export const handleLogin = (router) => {
  router.push("/login");
};
