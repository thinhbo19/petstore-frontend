import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import "../../Screen/Pets/ListOfBreed.css";
import { Link } from "react-router-dom";
import { getAllBreeds } from "../../services/apiPet";

const Filter = ({ namePath }) => {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  const [petList, setPetList] = useState([]);
  const [filterListState, setFilterListState] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const breedData = await getAllBreeds();
        const species = [
          ...new Set(breedData.map((breed) => breed.petSpecies.nameSpecies)),
        ];
        const filterList = {};
        species.forEach((species) => {
          filterList[species] = species === namePath;
        });
        setPetList(breedData);
        setFilterListState(filterList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [namePath]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowFilter(false);
  }, [namePath]);

  const handleChangeArrow = (species) => {
    setFilterListState({
      ...filterListState,
      [species]: !filterListState[species],
    });
  };

  return (
    <div className="filterBreed__container">
      <button
        className="filter-button"
        onClick={() => setShowFilter(!showFilter)}
      >
        <FontAwesomeIcon icon={faFilter} className="filter-icon" />
        Open Filter For {namePath}
      </button>{" "}
      <div
        ref={filterRef}
        className={`filter-panel ${showFilter ? "show" : ""}`}
      >
        {Object.keys(filterListState).map((species, index) => (
          <form key={index} className="filter-form">
            <div className="filter-field">
              <Link to={`/Home/${species}`} className="link-filter">
                All {species}s{" "}
              </Link>
              <FontAwesomeIcon
                icon={filterListState[species] ? faChevronUp : faChevronDown}
                className="filter-icon"
                onClick={() => handleChangeArrow(species)}
              />
            </div>
            <div
              className={`filter-list ${
                filterListState[species] ? "show" : ""
              }`}
            >
              {petList
                .filter((pet) => pet.petSpecies.nameSpecies === species)
                .map((pet, id) => (
                  <Link
                    to={`/Home/${species}/${pet.nameBreed}`}
                    key={id}
                    className="link-filter-items"
                  >
                    {pet.nameBreed}
                  </Link>
                ))}
            </div>
          </form>
        ))}
      </div>{" "}
    </div>
  );
};

export default Filter;
