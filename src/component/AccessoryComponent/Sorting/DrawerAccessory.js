import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  TextField,
  InputAdornment,
  Slider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { generateSlug } from "@/src/services/slugifyConfig";

const DrawerAccessory = ({
  data,
  isDrawerOpen,
  toggleDrawer,
  priceRange,
  handlePriceChange,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // Chuyển đổi chuỗi thành dạng Title Case
  const formatString = (input) => {
    return input
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Xử lý tìm kiếm sản phẩm
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setFilteredData(
      data.filter((acc) =>
        acc.nameProduct.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  useEffect(() => {
    // Mở accordion khi có dữ liệu lọc
    setExpanded(filteredData.length > 0 ? "panel1" : false);
  }, [searchQuery, filteredData]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Drawer
      sx={{ zIndex: "10000000" }}
      anchor="left"
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
    >
      <Box sx={{ width: 270, padding: 2 }} role="presentation">
        {/* Trường tìm kiếm */}
        <TextField
          fullWidth
          placeholder="Tìm kiếm..."
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

        {/* Slider lọc theo giá */}
        <Box sx={{ width: 220, padding: 2 }}>
          <Typography gutterBottom>Giá</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={20000000} // Thay đổi giá trị tối đa nếu cần
            aria-labelledby="price-slider"
          />
          <Typography>
            {`Price from ${priceRange[0].toLocaleString()} to ${priceRange[1].toLocaleString()}`}
          </Typography>
        </Box>

        {/* Accordion cho danh sách phụ kiện */}
        {filteredData.length > 0 && (
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                component={Link}
                href="/shop/accessory"
                sx={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                ACCESSORIES
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {filteredData.map((acc) => (
                <Typography
                  component={Link}
                  href={`/shop/accessory/${generateSlug(acc.nameProduct)}`}
                  key={acc._id}
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                    display: "block",
                    marginY: 0.5,
                  }}
                >
                  {formatString(acc.nameProduct)}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        )}

        <Divider sx={{ marginY: 2 }} />
      </Box>
    </Drawer>
  );
};

export default DrawerAccessory;
