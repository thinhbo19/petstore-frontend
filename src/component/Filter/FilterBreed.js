import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getAllBreeds } from "../../services/apiPet";
import SortingForBreed from "./SortingForBreed";
import { slugify } from "@/src/utils/slugify";
import { handleGetBreeds, handleGetSpecies } from "@/src/utils/hanleGet";
import { useDispatch } from "react-redux";

const FilterBreed = ({ namePath, setBreedList }) => {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  const [petList, setPetList] = useState([]);
  const dispatch = useDispatch();
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
        Filter cho {decodeURIComponent(namePath)}
      </button>
      <div
        ref={filterRef}
        className={`filter-panel ${showFilter ? "show" : ""}`}
      >
        <SortingForBreed
          namePath={namePath}
          setBreedList={setBreedList}
          setShowFilter={setShowFilter}
        />

        {Object.keys(filterListState).map((species, index) => (
          <form key={index} className="filter-form">
            <div className="filter-field">
              <Link
                href={`/cua-hang/${slugify(species)}`}
                className="link-filter"
                onClick={() => {
                  const speciesData = petList.find(
                    (pet) => pet.petSpecies.nameSpecies === species
                  );
                  handleGetSpecies(
                    dispatch,
                    speciesData.petSpecies.speciesID,
                    species
                  );
                }}
              >
                Tất cả {species}
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
                    href={`/cua-hang/${slugify(species)}/${slugify(
                      pet.nameBreed
                    )}`}
                    key={id}
                    className="link-filter-items"
                    onClick={() => {
                      const speciesData = petList.find(
                        (pet) => pet.petSpecies.nameSpecies === species
                      );
                      handleGetBreeds(
                        dispatch,
                        speciesData.petSpecies.speciesID,
                        species,
                        pet._id,
                        pet.nameBreed
                      );
                    }}
                  >
                    {pet.nameBreed}
                  </Link>
                ))}
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};

export default FilterBreed;
