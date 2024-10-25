import OrderDetail from "@/src/component/OrderDetail/OrderDetail";

export default async function OrderDetailPage({ params }) {
  const { oid } = params;

  return <OrderDetail orderId={oid} />;
}
