export const handleChangePage = (router, item) => {
  switch (item) {
    case "HOME":
      router.push("/");
      break;
    case "About Us":
      router.push("/about-us");
      break;
    case "Spa&Hotel Services":
      router.push("/spa-services");
      break;
    case "Warranty Policy":
      router.push("/warranty-policy");
      break;
    case "0% Installment Policy":
      router.push("/installment-policy");
      break;
    case "Contact":
      router.push("/contact");
      break;
    case "News":
      router.push("/news");
      break;
    case "Pets":
      router.push("/shop");
      break;
    case "Voucher":
      router.push("/voucher");
      break;
    case "More":
      router.push("/accessory");
      break;
    case "Product":
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
    case "profile":
      router.push("/profile");
      break;
    case "dashboard":
      router.push("/dashboard");
      break;
    case "order-history":
      router.push("/profile/order-history");
      break;
    default:
      console.log("Invalid item");
  }
};
