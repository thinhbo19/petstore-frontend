import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Drawer,
  Divider,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Link from "next/link";
import { generateSlug } from "@/src/services/slugifyConfig";

const CategoryAccessory = ({ data, isDrawerOpen, toggleDrawer }) => {
  const [expandedCategory, setExpandedCategory] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const formatString = (input) =>
    input
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const handleToggleCategory = (category) => {
    setExpandedCategory((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const newFilteredData = {};
    const newExpandedCategory = {};

    Object.keys(data).forEach((category) => {
      const filteredProducts = data[category].filter((product) =>
        product.nameProduct.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredProducts.length > 0) {
        newFilteredData[category] = filteredProducts;
        newExpandedCategory[category] = true;
      }
    });

    setFilteredData(newFilteredData);
    setExpandedCategory(newExpandedCategory);
  }, [searchQuery, data]);

  return (
    <Drawer
      sx={{ zIndex: "10000000" }}
      anchor="left"
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
    >
      <Box sx={{ width: 270, padding: 2 }} role="presentation">
        <TextField
          fullWidth
          placeholder="Tìm kiếm sản phẩm..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {Object.keys(filteredData).map((category, index) => (
          <Box key={index}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleToggleCategory(category)}
              endIcon={
                expandedCategory[category] ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )
              }
              sx={{
                textTransform: "none",
                backgroundColor: "black",
                color: "white",
                marginBottom: 1,
              }}
            >
              {formatString(category)}
            </Button>

            {expandedCategory[category] && (
              <Box sx={{ paddingLeft: 2 }}>
                {filteredData[category].map((product, index) => (
                  <Box
                    key={index}
                    sx={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "bold",
                      display: "block",
                      marginY: 0.5,
                      padding: 1,
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <Typography
                      component={Link}
                      href={`/accessory/${generateSlug(
                        product.category.nameCate
                      )}/${generateSlug(product.nameProduct)}`}
                      sx={{ textDecoration: "none", color: "black" }}
                    >
                      {formatString(product.nameProduct)}
                    </Typography>
                    <Typography sx={{ color: "red", fontWeight: "bold" }}>
                      {product.price.toLocaleString()} VND
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            <Divider sx={{ marginY: 1 }} />
          </Box>
        ))}
      </Box>
    </Drawer>
  );
};

export default CategoryAccessory;
