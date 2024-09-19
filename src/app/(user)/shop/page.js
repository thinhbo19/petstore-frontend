import ShopForm from "@/src/component/ShopComponent/ShopForm";
import { getAllBreeds } from "@/src/services/apiPet";
import "../../../styles/shop.css";

export default async function ShopPage() {
  const data = await getAllBreeds();

  return <ShopForm data={data} />;
}
