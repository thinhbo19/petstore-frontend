"use client";
import Image from "next/image";
import React from "react";

const Shop = ({ allBreed }) => {
  console.log(allBreed);
  return (
    <div className="allSpecies__container">
      <div className="fillter__shop"></div>
      {allBreed.map((breed) => (
        <div key={breed._id} className="item__species">
          <Image
            src={breed.imgBreed[0]}
            alt={breed.nameBreed}
            width={100}
            height={100}
          />
        </div>
      ))}
    </div>
  );
};

export default Shop;
