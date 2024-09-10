import PetShopForm from "@/src/component/ShopComponent/PetShopForm";
import "../../../../../styles/shop.css";
import {
  getAllBreeds,
  getAllCat,
  getAllDog,
  getPetByBreed,
} from "@/src/services/apiPet";

export async function generateStaticParams() {
  const Data = await getAllBreeds();
  return Data.map((breed) => ({
    breedName: breed.nameBreed,
  }));
}

export default async function ShopBreedPage({ params }) {
  const { breedName } = params;
  const dataBreed = await getPetByBreed(breedName);
  const dogData = await getAllDog();
  const catData = await getAllCat();

  return (
    <PetShopForm
      breedName={breedName}
      dataBreed={dataBreed}
      dogData={dogData}
      catData={catData}
    />
  );
}
