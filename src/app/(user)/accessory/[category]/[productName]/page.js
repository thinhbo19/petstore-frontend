import ProductDetailComponent from "@/src/component/ProductDetailComponent/ProductDetailComponent";
import {
  getAllProduct,
  getCurrentProdByName,
  getProductByCate,
} from "@/src/services/apiProduct";
import formatPetName from "@/src/services/formatPetName";

export async function generateStaticParams() {
  const Data = await getAllProduct();
  return Data.map((product) => ({
    productName: product.nameProduct,
  }));
}

export default async function ProductDetailPage({ params }) {
  const { productName } = params;
  const prodData = await getCurrentProdByName(formatPetName(productName));
  const similarProducts = await getProductByCate(prodData.category.nameCate);

  return (
    <ProductDetailComponent
      productName={productName}
      prodData={prodData}
      similarProducts={similarProducts}
    />
  );
}
