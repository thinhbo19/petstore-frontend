import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  Divider,
  Button,
  TextField,
  InputAdornment,
  Slider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Link from "next/link";
import { generateSlug } from "@/src/services/slugifyConfig";
import Loading from "../../Loading/Loading";

const DrawerAccessory = ({
  data,
  isDrawerOpen,
  toggleDrawer,
  priceRange,
  handlePriceChange,
}) => {
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

        <Box sx={{ width: 220, padding: 2 }}>
          <Typography gutterBottom>Giá</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={20000000}
            aria-labelledby="price-slider"
          />
          <Typography>
            {`Giá từ ${priceRange[0].toLocaleString()} đến ${priceRange[1].toLocaleString()} VND`}
          </Typography>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        <Box
          sx={{
            maxHeight: "400px",
            overflowY: "auto",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "5px",
              border: "2px solid #f1f1f1",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
          }}
        >
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
                        {product.price.toLocaleString("vi")} VND
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
              <Divider sx={{ marginY: 1 }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerAccessory;
