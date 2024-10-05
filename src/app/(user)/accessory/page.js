import CategoryComponent from "@/src/component/AccessoryComponent/CategoryComponent";
import { getAllProduct } from "@/src/services/apiProduct";

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

export default async function AccessoryPage() {
  const data = await getAllProduct();
  const groupedProducts = groupByCategory(data);

  return <CategoryComponent groupedProducts={groupedProducts} />;
}
