import PetDetailComponent from "@/src/component/PetDetailComponent/PetDetailComponent";
import {
  getAllPets,
  getCurrentPetsByName,
  getPetByBreed,
} from "@/src/services/apiPet";
import formatPetName from "@/src/services/formatPetName";

export async function generateStaticParams() {
  const Data = await getAllPets();
  return Data.map((pet) => ({
    petName: pet.namePet,
  }));
}

export default async function PetDetailPage({ params }) {
  const { petName } = params;
  const petData = await getCurrentPetsByName(formatPetName(petName));

  const breedData = await getPetByBreed(petData.pet.petBreed.nameBreed);

  return (
    <PetDetailComponent
      petName={petName}
      petData={petData.pet}
      similarProducts={breedData}
    />
  );
}
