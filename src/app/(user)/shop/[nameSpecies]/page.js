import "../../../../styles/shop.css";
import { getAllBreeds, getAllCat, getAllDog } from "@/src/services/apiPet";
import BreedShopForm from "@/src/component/ShopComponent/BreedShopForm";

export async function generateStaticParams() {
  const Data = await getAllBreeds();
  return Data.map((breed) => ({
    nameSpecies: breed.petSpecies.nameSpecies,
  }));
}

export default async function ShopSpeciesPage({ params }) {
  const { nameSpecies } = params;
  let data = [];
  const dogData = await getAllDog();
  const catData = await getAllCat();

  if (nameSpecies === "dog") {
    data = await getAllDog();
  } else if (nameSpecies === "cat") {
    data = await getAllCat();
  }
  return (
    <BreedShopForm
      nameSpecies={nameSpecies}
      data={data}
      dogData={dogData}
      catData={catData}
    />
  );
}
