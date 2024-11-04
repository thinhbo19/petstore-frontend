import SpaService from "@/src/component/HomeComponent/SpaService";
import {
  getAllHotelServices,
  getAllSpaServices,
} from "@/src/services/apiBooking";

export default async function SpaServicesPage() {
  const spas = await getAllSpaServices();
  const hotels = await getAllHotelServices();

  return <SpaService spas={spas} hotels={hotels} />;
}
