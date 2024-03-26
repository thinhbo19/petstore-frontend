import React, { useEffect, useState } from "react";
import "./Home.css";
import Loading from "../../Component/Loading/Loading";

const Home = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <div className="home__container">Home</div>;
};

export default Home;
