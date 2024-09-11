import BreedAdminComp from "@/src/component/AdminComponent/BreedComponent/BreedAdminComp";
import { getAllSpecies } from "@/src/services/apiPet";

const BreedAdminPage = async () => {
  const allSpecies = await getAllSpecies();
  return <BreedAdminComp allSpecies={allSpecies} />;
};

export default BreedAdminPage;
