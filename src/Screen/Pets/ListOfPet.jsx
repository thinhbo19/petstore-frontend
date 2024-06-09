import React, { useEffect, useState } from "react";
import "./ListOfPet.css";
import { getPetByBreed } from "../../services/apiPet";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";

const ListOfPet = () => {
  const [breed, setBreed] = useState("");
  const [petList, setPetList] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentPath = useLocation().pathname;

  useEffect(() => {
    const parts = currentPath.split("/");
    const breed = parts[parts.length - 1];
    setBreed(breed);
  }, [currentPath]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getPetByBreed(breed);
        setPetList(data.reverse());
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1200);
      }
    };

    if (breed) {
      fetchData();
    }
  }, [breed]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="petlist__container">
      <div className="petlist__main">
        {petList.length > 0 ? (
          petList.map((pet) => (
            <Link
              key={pet._id}
              to={`/Home/${pet.petBreed.nameSpecies}/${pet.petBreed.nameBreed}/${pet.namePet}`}
              className="linkbreed"
            >
              <div className="petlist__item">
                <img src={pet.imgPet[0]} alt={pet.namePet} />
                <h3>{pet.namePet}</h3>
                <p>{pet.price.toLocaleString("vi-VN")} VNĐ</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="not__found">
            <h3>Sincerely apologize to you.</h3>
            <p>Currently, the shop does not sell pets of this breed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListOfPet;
