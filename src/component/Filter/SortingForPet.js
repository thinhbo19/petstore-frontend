import React from "react";
import { sortingPets } from "../../services/apiPet";

const SortingForPet = ({ breedName, setPetsList, setShowFilter }) => {
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
      const response = await sortingPets(breedName, sortQuery);
      setPetsList(response);
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
          <option value="price-low-to-high">Giá: thấp đến cao</option>
          <option value="price-high-to-low">Giá: cao xuống thấp</option>
        </select>
      </div>
    </form>
  );
};

export default SortingForPet;
