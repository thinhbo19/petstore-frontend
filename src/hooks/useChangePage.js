export const handleChangePage = (router, item) => {
  switch (item) {
    case "home":
      router.push("/");
      break;
    case "pets":
      router.push("/shop");
      break;
    case "voucher":
      router.push("/voucher");
      break;
    case "more":
      router.push("/shop");
      break;
    case "notification":
      router.push("/notification");
      break;
    case "favorite":
      router.push("/favorite");
      break;
    case "cart":
      router.push("/cart");
      break;
    default:
      console.log("Invalid item");
  }
};
