import React from "react";

const SortingForPet = () => {
  return (
    <form className="filter-form">
      <h3>Sorting filter</h3>
      <div className="sorting__field">
        <select className="sorting__selc">
          <option value="none">none</option>
          <option value="option1">Sort by letter: A to Z</option>
          <option value="option2">Sort by letter: Z to A</option>
          <option value="option3">Latest</option>
          <option value="option4">Oldest</option>
          <option value="option5">Steel price: from low to high</option>
          <option value="option5">Steel price: from high to low</option>
        </select>
      </div>
    </form>
  );
};

export default SortingForPet;
