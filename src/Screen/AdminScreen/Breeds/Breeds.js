import React, { useState, useEffect } from "react";
import "./Breeds.css";
import { getAllBreeds, getAllSpecies } from "../../../services/api";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../services/useSlice";

const Breeds = () => {
  const [breedList, setBreedList] = useState([]);
  const accessToken = useSelector(selectAccessToken);
  const [speciesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const breedData = await getAllBreeds(accessToken);
        const speciesData = await getAllSpecies(accessToken);
        const breedWithSpeciesName = breedData.map((breed) => {
          const matchedSpecies = speciesData.find(
            (species) => species._id === breed.species
          );
          if (matchedSpecies) {
            return {
              ...breed,
              speciesName: matchedSpecies.nameSpecies,
            };
          }
          return breed;
        });
        setBreedList(breedWithSpeciesName);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [accessToken]);
  const indexOfLastSpecies = currentPage * speciesPerPage;
  const indexOfFirstSpecies = indexOfLastSpecies - speciesPerPage;
  const currentSpecies = breedList.slice(
    indexOfFirstSpecies,
    indexOfLastSpecies
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="Breeds maincontainer section" id="Breeds">
      <div className="breeds__container">
        <h2 className="section_title">Breeds Management</h2>

        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Species</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentSpecies.map((breeds, index) => (
              <tr key={breeds.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{index + 1}</td>
                <td>{breeds.nameBreed}</td>
                <td>{breeds.speciesName}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({
            length: Math.ceil(breedList.length / speciesPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Breeds;
