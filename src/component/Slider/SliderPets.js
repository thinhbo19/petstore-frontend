"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import styles from "./SliderPets.module.css";
import { useFetchPetsByBreedName } from "@/src/hooks/Pets/useFetchPetsByBreedName";
import { slugify } from "@/src/utils/slugify";

const SliderPets = ({ petName, breedName, speciesName }) => {
  const { petData } = useFetchPetsByBreedName(breedName);

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1700,
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {petData.map((pet) => (
          <div key={pet._id} className={styles.slideItem}>
            <Link
              href={`/Home/${speciesName}/${slugify(breedName)}/${slugify(
                petName
              )}`}
              className={styles.sliderLink}
            >
              <img
                src={pet.imgPet[0]}
                alt={pet.namePet}
                className={styles.sliderImage}
              />
              <div className={styles.sliderContent}>
                <h3 className={styles.petName}>{pet.namePet}</h3>
                <p className={styles.petPrice}>
                  {pet.price.toLocaleString("vi-VN")}₫
                </p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderPets;
