import EditPetsData from "@/src/component/AdminComponent/PetsComponent/EditData";
import { getAllPets } from "@/src/services/apiPet";

export async function generateStaticParams() {
  const Data = await getAllPets();
  return Data.map((pet) => ({
    id: pet._id,
  }));
}

export default function EditPetsPage({ params }) {
  const { id } = params;
  return <EditPetsData petId={id} />;
}
