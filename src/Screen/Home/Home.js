import React, { useEffect, useState } from "react";
import "./Home.css";
import Loading from "../../Component/Loading/Loading";
import Slider from "../../Component/Slider/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog, faCat, faCrow } from "@fortawesome/free-solid-svg-icons";
import Shipping from "../../assets/shifting-services.png";
import Gift from "../../assets/git-services.png";
import Sure from "../../assets/sure-services.png";
import Health from "../../assets/healthcare-services.png";

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

  return (
    <div className="home__container">
      <section className="home__section slider">
        <Slider />
      </section>
      <section className="home__section intro">
        <div className="intro__container">
          <h1>Overview of Pet Shop</h1>
          <p>
            Pet Shop is a pet farm in Vietnam and is also a chain of stores
            providing accessories, pet beauty care services and pet hotels.
          </p>
          <p>
            With a variety of dog and cat breeds, we ensure quality breeds and
            standard genetic resources. At Pet Shop, all breeds are purebred,
            carefully cared for and in good health, ready for new homes.
          </p>
          <div className="intro__icon__main">
            <FontAwesomeIcon className="intro__icon" icon={faDog} />
            <FontAwesomeIcon className="intro__icon" icon={faCat} />
            <FontAwesomeIcon className="intro__icon" icon={faCrow} />
          </div>
        </div>
      </section>
      <section className="home__section services">
        <div className="services__top">
          <div className="services__item">
            <img src={Shipping} alt="img" />
            <h4>FREE SHIPPING NATIONWIDE</h4>
            <p>DELIVERY: PLANE, TRAIN, TAXI...</p>
          </div>
          <div className="services__item">
            <img src={Gift} alt="img" />
            <h4>ATTRACTIVE GIFTS</h4>
            <p>COMES WITH NECESSARY ACCESSORIES FOR PETS</p>
          </div>
          <div className="services__item">
            <img src={Sure} alt="img" />
            <h4>100% COMMITMENT TO SUPERIORITY</h4>
            <p>COMMITTED TO PUREBREECHED PETS NON-BREWED.</p>
          </div>
          <div className="services__item">
            <img src={Health} alt="img" />
            <h4>COMPREHENSIVE HEALTH WARRANTY</h4>
            <p>DELIVER TO CUSTOMERS HEALTHY PETS</p>
          </div>
        </div>
        <div className="services__down">
          <button className="hotline__btn">Hotline: 000.000.000</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
