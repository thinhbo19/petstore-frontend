import ArticleComp from "@/src/component/HomeComponent/ArticleComp";
import { getAllNews, getCurrentNewsByName } from "@/src/services/apiNews";

// export async function generateStaticParams() {
//   const Data = await getAllNews();
//   return Data.map((news) => ({
//     newsName: news.title,
//   }));
// }

export default async function NewsArticlePage({ params }) {
  const { newsName } = params;
  const articleData = await getCurrentNewsByName(newsName);
  return <ArticleComp articleData={articleData} />;
}
