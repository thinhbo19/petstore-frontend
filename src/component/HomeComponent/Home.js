"use client";
import { useEffect, useState } from "react";
import "../../styles/Home.css";
import Slider from "../Slider/Slider";
import Loading from "../Loading/Loading";

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home__container">
      <Slider />
    </div>
  );
}
