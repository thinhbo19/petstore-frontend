import Statistical from "@/src/component/AdminComponent/Statistical/Statistical";
import { getAllOrders } from "@/src/services/apiOrder";
import { getAllUsers } from "@/src/services/apiUser";

export default async function StatisticalPage() {
  const users = await getAllUsers();

  const usersData = users.filter((e) => e.role === "User");

  return <Statistical users={usersData} />;
}
