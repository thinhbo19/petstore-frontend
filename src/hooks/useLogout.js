import { setCart } from "../services/Redux/CartSlice";
import { setFavorites } from "../services/Redux/FavoriteSlice";
import { clearNotifications } from "../services/Redux/NotificationSlice";

export const handleLogout = (dispatch, router, setLogout) => {
  dispatch(setLogout());
  dispatch(setFavorites([]));
  dispatch(setCart([]));
  dispatch(clearNotifications([]));
  router.push("/login");
};

export const handleLogin = (router) => {
  router.push("/login");
};
