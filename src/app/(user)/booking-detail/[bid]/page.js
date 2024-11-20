import BookingDetail from "@/src/component/BookingDetail/BookingDetail";

export default async function BookingDetailPage({ params }) {
  const { bid } = params;

  return <BookingDetail bookingId={bid} />;
}
