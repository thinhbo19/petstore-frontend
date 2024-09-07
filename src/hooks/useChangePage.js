export const handleChangePage = (router, item) => {
  switch (item) {
    case "HOME":
      router.push("/");
      break;
    case "ABOUT US":
      router.push("/about-us");
      break;
    case "NEWS":
      router.push("/news");
      break;
    case "PETS":
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
