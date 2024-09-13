import EditData from "@/src/component/AdminComponent/NewsComponent/EditData";
import EditPetsData from "@/src/component/AdminComponent/PetsComponent/EditData";
import { getAllNews } from "@/src/services/apiNews";

export async function generateStaticParams() {
  const Data = await getAllNews();
  return Data.map((news) => ({
    id: news._id,
  }));
}

export default function EditPetsPage({ params }) {
  const { id } = params;
  return <EditData newsId={id} />;
}
