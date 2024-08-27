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
      <h3>Sắp xếp</h3>
      <div className="sorting__field">
        <select className="sorting__selc" onChange={handleSortChange}>
          <option value="none">Tất cả</option>
          <option value="a-z">Từ: A đến Z</option>
          <option value="z-a">Từ: Z đến A</option>
          <option value="latest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>
    </form>
  );
};

export default SortingForBreed;
