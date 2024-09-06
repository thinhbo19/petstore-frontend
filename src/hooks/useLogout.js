export const handleLogout = (dispatch, router, setLogout) => {
  dispatch(setLogout());
  router.push("/login");
};

export const handleLogin = (router) => {
  router.push("/login");
};
