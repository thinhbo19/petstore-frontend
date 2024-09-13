import News from "@/src/component/HomeComponent/News";
import { getAllNews } from "@/src/services/apiNews";

export default async function NewsPage() {
  const allNews = await getAllNews();
  return <News allNews={allNews} />;
}
