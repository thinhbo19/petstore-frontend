import BreadcrumbsComponent from "@/src/component/Breadcrumbs/Breadcrumbs";
import Footer from "@/src/component/Footer/Footer";
import Header from "@/src/component/Header/Header";
import ScrollButton from "@/src/component/ScrollButton/ScrollButton";
import { getAllCat, getAllDog } from "@/src/services/apiPet";

export default async function NewsLayout({ children }) {
  const dogs = await getAllDog();
  const cats = await getAllCat();
  return (
    <>
      <Header allDog={dogs} allCat={cats} />
      <BreadcrumbsComponent />
      {children}
      <Footer />
      <ScrollButton />
    </>
  );
}
