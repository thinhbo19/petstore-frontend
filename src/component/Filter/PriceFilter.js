import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { filterPetsByPrice } from "../../services/apiPet";
import "../../app/(user)/cua-hang/[SpeciesName]/[BreedName]/ListOfPet.css";

const PriceFilter = ({ bid, setPetsList, setShowFilter }) => {
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleFilterClick = async () => {
    const [minPrice, maxPrice] = priceRange;
    try {
      const res = await filterPetsByPrice(minPrice, maxPrice, bid);
      if (res.status === 200) {
        setPetsList(res.data);
      }
      setShowFilter(false);
    } catch (error) {
      console.log(error);
      setPetsList([]);
      setShowFilter(false);
    }
  };

  return (
    <Box sx={{ width: 250, padding: 2 }}>
      <Slider
        value={priceRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={10000000}
      />
      <div className="price-display">
        <span>Min : {priceRange[0].toLocaleString("vi-VN")} VNĐ</span>
        <span>Max : {priceRange[1].toLocaleString("vi-VN")} VNĐ</span>
      </div>
      <Button variant="contained" onClick={handleFilterClick}>
        OK
      </Button>
    </Box>
  );
};

export default PriceFilter;
