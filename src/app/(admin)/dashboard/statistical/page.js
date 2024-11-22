import Statistical from "@/src/component/AdminComponent/Statistical/Statistical";
import { getAllUsers } from "@/src/services/apiUser";

export default async function StatisticalPage() {
  const users = await getAllUsers();

  return <Statistical users={users} />;
}
