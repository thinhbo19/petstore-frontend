import React from "react";
import { sortingPets } from "../../services/apiPet";

const SortingForPet = ({ namePath, setPetsList, setShowFilter }) => {
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
      case "price-low-to-high":
        sortQuery = "price-low-to-high";
        break;
      case "price-high-to-low":
        sortQuery = "price-high-to-low";
        break;
      default:
        sortQuery = "";
    }

    try {
      const response = await sortingPets(namePath, sortQuery);
      setPetsList(response);
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
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
        </select>
      </div>
    </form>
  );
};

export default SortingForPet;
