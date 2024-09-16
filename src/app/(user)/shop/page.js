import ShopForm from "@/src/component/ShopComponent/ShopForm";
import { getAllBreeds } from "@/src/services/apiPet";
import "../../../styles/shop.css";
import { getAllProduct } from "@/src/services/apiProduct";

export default async function ShopPage() {
  const data = await getAllBreeds();
  const dataAccessory = await getAllProduct();
  return <ShopForm data={data} dataAccessory={dataAccessory} />;
}
