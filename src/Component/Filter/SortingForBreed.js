import React from "react";
import { sortingBreed } from "../../services/apiPet";

const SortingForBreed = ({ namePath, setBreedList, setShowFilter }) => {
  const handleSortChange = async (event) => {
    const sortValue = event.target.value;
    let sortQuery = "";

    switch (sortValue) {
      case "a-z":
        sortQuery = "a-z";
        break;
      case "z-a":
        sortQuery = "z-a";
        break;
      case "latest":
        sortQuery = "latest";
        break;
      case "oldest":
        sortQuery = "oldest";
        break;
      default:
        sortQuery = "";
    }

    try {
      const response = await sortingBreed(namePath, sortQuery);
      setBreedList(response);
      setShowFilter(false);
    } catch (error) {
      console.error("Failed to fetch sorted breeds:", error);
    }
  };

  return (
    <form className="filter-form">
      <h3>Sorting filter</h3>
      <div className="sorting__field">
        <select className="sorting__selc" onChange={handleSortChange}>
          <option value="none">none</option>
          <option value="a-z">Sort by letter: A to Z</option>
          <option value="z-a">Sort by letter: Z to A</option>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </form>
  );
};

export default SortingForBreed;
