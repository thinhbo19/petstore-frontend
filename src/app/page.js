import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";
import Home from "../component/HomeComponent/Home";
import ScrollButton from "../component/ScrollButton/ScrollButton";
import { getAllCat, getAllDog } from "../services/apiPet";

export default async function HomePage() {
  const dogs = await getAllDog();
  const cats = await getAllCat();
  return (
    <>
      <Header allDog={dogs} allCat={cats} />
      <Home />
      <Footer />
      <ScrollButton />
    </>
  );
}
