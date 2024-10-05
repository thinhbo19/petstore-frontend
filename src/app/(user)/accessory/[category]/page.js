import AccessoryComponent from "@/src/component/AccessoryComponent/AccessoryComponent";
import { getAllProduct } from "@/src/services/apiProduct";

export async function generateStaticParams() {
  const Data = await getAllProduct();
  return Data.map((product) => ({
    category: product.category.nameCate,
  }));
}

const groupByCategory = (products) => {
  return products.reduce((acc, product) => {
    const category = product.category.nameCate;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(product);

    return acc;
  }, {});
};

export default async function CategoryPage({ params }) {
  const { category } = params;

  const data = await getAllProduct();
  const categoryData = data.filter(
    (product) => product.category.nameCate.toLowerCase() === category
  );
  const groupedProducts = groupByCategory(data);

  return (
    <AccessoryComponent
      categoryData={categoryData}
      allProduct={data}
      groupedProducts={groupedProducts}
    />
  );
}
