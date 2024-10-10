import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";
import Home from "../component/HomeComponent/Home";
import ScrollButton from "../component/ScrollButton/ScrollButton";
import { getAllCat, getAllDog, getAllPets } from "../services/apiPet";
import { getAllProduct } from "../services/apiProduct";

export default async function HomePage() {
  const dogs = await getAllDog();
  const cats = await getAllCat();
  const prods = await getAllProduct();
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
      <Home dogs={dogs} cats={cats} prods={prods} />
      <Footer />
      <ScrollButton />
    </>
  );
}
