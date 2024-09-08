import "../../../../styles/shop.css";
import { getAllBreeds, getAllCat, getAllDog } from "@/src/services/apiPet";
import ShopForm from "@/src/component/ShopComponent/ShopForm";

export async function generateStaticParams() {
  const Data = await getAllBreeds();
  return Data.map((breed) => ({
    nameSpecies: breed.petSpecies.nameSpecies,
  }));
}

export default async function ShopSpeciesPage({ params }) {
  const { nameSpecies } = params;
  let data = [];

  if (nameSpecies === "dog") {
    data = await getAllDog();
  } else if (nameSpecies === "cat") {
    data = await getAllCat();
  }

  return <ShopForm data={data} />;
}
