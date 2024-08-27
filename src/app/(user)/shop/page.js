import Shop from "@/src/component/Shop/Shop";
import { getAllBreeds } from "@/src/services/apiPet";

export default async function ShopPage() {
  const allBreed = await getAllBreeds();

  return (
    <>
      <Shop allBreed={allBreed} />
    </>
  );
}
