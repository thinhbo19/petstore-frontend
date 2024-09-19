import AccessoryComponent from "@/src/component/AccessoryComponent/AccessoryComponent";
import { getAllProduct } from "@/src/services/apiProduct";

export default async function AccessoryPage() {
  const data = await getAllProduct();

  return <AccessoryComponent data={data} />;
}
