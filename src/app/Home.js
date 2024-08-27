"use client";
import styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog, faCat, faCrow } from "@fortawesome/free-solid-svg-icons";
import Shipping from "../../public/shifting-services.png";
import Gift from "../../public/git-services.png";
import Sure from "../../public/sure-services.png";
import Health from "../../public/healthcare-services.png";
import Image from "next/image";
import SliderImg from "@/src/component/Slider/Slider";

export default function Home() {
  return (
    <div className={styles.home__container}>
      <section className={`${styles.home__section} ${styles.slider}`}>
        <SliderImg />
      </section>
      <section className={`${styles.home__section} ${styles.intro}`}>
        <div className={styles.intro__container}>
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
          <div className={styles.intro__icon__main}>
            <FontAwesomeIcon icon={faDog} className={styles.intro__icon} />
            <FontAwesomeIcon icon={faCat} className={styles.intro__icon} />
            <FontAwesomeIcon icon={faCrow} className={styles.intro__icon} />
          </div>
        </div>
      </section>
      <section className={`${styles.home__section} ${styles.services}`}>
        <div className={styles.services__top}>
          <div className={styles.services__item}>
            <Image src={Shipping} alt="Shipping Services" />
            <h4>FREE SHIPPING NATIONWIDE</h4>
            <p>DELIVERY: PLANE, TRAIN, TAXI...</p>
          </div>
          <div className={styles.services__item}>
            <Image src={Gift} alt="Gift Services" />
            <h4>ATTRACTIVE GIFTS</h4>
            <p>COMES WITH NECESSARY ACCESSORIES FOR PETS</p>
          </div>
          <div className={styles.services__item}>
            <Image src={Sure} alt="Sure Services" />
            <h4>100% COMMITMENT TO SUPERIORITY</h4>
            <p>COMMITTED TO PUREBREECHED PETS NON-BREWED.</p>
          </div>
          <div className={styles.services__item}>
            <Image src={Health} alt="Health Services" />
            <h4>COMPREHENSIVE HEALTH WARRANTY</h4>
            <p>DELIVER TO CUSTOMERS HEALTHY PETS</p>
          </div>
        </div>
        <div className={styles.services__down}>
          <button className={styles.hotline__btn}>Hotline: 000.000.000</button>
        </div>
      </section>
    </div>
  );
}
