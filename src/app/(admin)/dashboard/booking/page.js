import BookingAdminComp from "@/src/component/AdminComponent/BookingAdminComp/BookingAdminComp";
import {
  getAllHotelServices,
  getAllSpaServices,
} from "@/src/services/apiBooking";

export default async function BookingAdminPage() {
  const spas = await getAllSpaServices();
  const hotels = await getAllHotelServices();

  return <BookingAdminComp spas={spas} hotels={hotels} />;
}
