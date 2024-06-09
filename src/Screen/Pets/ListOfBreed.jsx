import React, { useEffect, useState } from "react";
import "./ListOfBreed.css";
import { getBreedBySpecies } from "../../services/apiPet";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";

const Pets = () => {
  const [species, setSpecies] = useState("");
  const [breedList, setBreedList] = useState([]);
  const currentPath = useLocation().pathname;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const parts = currentPath.split("/");
    const species = parts[parts.length - 1];
    setSpecies(species);
  }, [currentPath]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getBreedBySpecies(species);
        setBreedList(data.reverse());
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1200);
      }
    };
    if (species) {
      fetchData();
    }
  }, [species]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="petlist__container">
      <div className="petlist__main">
        {breedList.length > 0 ? (
          breedList.map((breed, index) => (
            <Link
              key={breed._id}
              to={`/Home/${breed.petSpecies.nameSpecies}/${breed.nameBreed}`}
              className="linkbreed"
            >
              <div className="petlist__item" key={index}>
                <img src={breed.imgBreed[0]} alt={breed.nameBreed} />
                <h3>{breed.nameBreed}</h3>
              </div>
            </Link>
          ))
        ) : (
          <p>No breeds found</p>
        )}
      </div>
    </div>
  );
};

export default Pets;
