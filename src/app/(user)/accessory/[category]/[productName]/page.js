import { getAllProduct } from "@/src/services/apiProduct";

export async function generateStaticParams() {
  const Data = await getAllProduct();
  return Data.map((product) => ({
    productName: product.nameProduct,
  }));
}

export default function ProductDetailPage({ params }) {
  const { productName } = params;
  return;
}
