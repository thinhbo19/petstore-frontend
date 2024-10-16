import BreadcrumbsComponent from "@/src/component/Breadcrumbs/Breadcrumbs";
import Footer from "@/src/component/Footer/Footer";
import Header from "@/src/component/Header/Header";
import ScrollButton from "@/src/component/ScrollButton/ScrollButton";
import { getAllCat, getAllDog, getAllPets } from "@/src/services/apiPet";
import { getAllProduct } from "@/src/services/apiProduct";

export default async function NewsLayout({ children }) {
  const dogs = await getAllDog();
  const cats = await getAllCat();
  const allPets = await getAllPets();
  const allProds = await getAllProduct();

  return (
    <>
      <Header
        allDog={dogs}
        allCat={cats}
        allPets={allPets}
        allProds={allProds}
      />
      <BreadcrumbsComponent />
      {children}
      <Footer />
      <ScrollButton />
    </>
  );
}
