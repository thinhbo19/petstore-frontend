import EditProductsData from "@/src/component/AdminComponent/ProductsComponent/EditData";
import { getAllProduct } from "@/src/services/apiProduct";

export async function generateStaticParams() {
  const Data = await getAllProduct();
  return Data.map((p) => ({
    id: p._id,
  }));
}

export default function EditProducstPage({ params }) {
  const { id } = params;
  return <EditProductsData prodID={id} />;
}
