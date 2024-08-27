"use client";

import Footer from "../component/Footer/Footer";
import Navbar from "../component/Navbar/Navbar";
import ScrollButton from "../component/ScrollButton/ScrollButton";
import Home from "./Home";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
      <ScrollButton />
    </>
  );
}
