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
import { usePathname } from "next/navigation";

const DrawerPet = ({
  breedName,
  isDrawerOpen,
  toggleDrawer,
  catData,
  dogData,
  priceRange,
  handlePriceChange,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDogData, setFilteredDogData] = useState(dogData);
  const [filteredCatData, setFilteredCatData] = useState(catData);
  const pathName = usePathname();
  const parts = pathName.split("/");
  const category = parts[2];

  const formatString = (input) => {
    return input
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formattedBreedName = formatString(breedName);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    setFilteredDogData(
      dogData?.filter((dog) =>
        dog.nameBreed.toLowerCase().includes(query.toLowerCase())
      ) || []
    );

    setFilteredCatData(
      catData?.filter((cat) =>
        cat.nameBreed.toLowerCase().includes(query.toLowerCase())
      ) || []
    );
  };

  useEffect(() => {
    if (category === "dog" && filteredDogData.length) {
      setExpanded("panel1");
    } else if (category === "cat" && filteredCatData.length) {
      setExpanded("panel2");
    } else {
      setExpanded(false);
    }
  }, [category, filteredDogData, filteredCatData]);

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
        <Box sx={{ width: 220, padding: 2 }}>
          <Typography gutterBottom>Giá</Typography>
          <Slider
            value={priceRange || [0, 20000000]}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={20000000}
            aria-labelledby="price-slider"
          />

          <Typography>
            {`Price from ${priceRange[0].toLocaleString(
              "vi"
            )} to ${priceRange[1].toLocaleString("vi")}`}
          </Typography>
        </Box>
        {/* Accordion cho Dog */}
        {filteredDogData.length > 0 && (
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{
              borderRadius: "10px",
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{ color: category === "dog" ? "white" : "black" }}
                />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                backgroundColor: category === "dog" ? "#FA5130" : "white",
                borderRadius: "10px",
              }}
            >
              <Typography
                component={Link}
                href="/shop/dog"
                sx={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: category === "dog" ? "white" : "black",
                }}
              >
                DOG
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {filteredDogData.map((dog) => (
                <Typography
                  component={Link}
                  href={`/shop/dog/${generateSlug(dog.nameBreed)}`}
                  key={dog._id}
                  sx={{
                    textDecoration: "none",
                    color:
                      dog.nameBreed === formattedBreedName ? "black" : "grey",
                    fontWeight:
                      dog.nameBreed === formattedBreedName ? "bold" : "normal",
                    display: "block",
                    marginY: 0.5,
                  }}
                >
                  {dog.nameBreed}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        )}
        <Divider sx={{ marginY: 2 }} />
        {filteredCatData.length > 0 && (
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={{
              borderRadius: "10px",
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{ color: category === "cat" ? "white" : "black" }}
                />
              }
              aria-controls="panel2a-content"
              id="panel2a-header"
              sx={{
                backgroundColor: category === "cat" ? "#FA5130" : "white",
                borderRadius: "10px",
              }}
            >
              <Typography
                component={Link}
                href="/shop/cat"
                sx={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: category === "cat" ? "white" : "black",
                }}
              >
                CAT
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {filteredCatData.map((cat) => (
                <Typography
                  component={Link}
                  href={`/shop/cat/${generateSlug(cat.nameBreed)}`}
                  key={cat._id}
                  sx={{
                    textDecoration: "none",
                    color:
                      cat.nameBreed === formattedBreedName ? "black" : "grey",
                    fontWeight:
                      cat.nameBreed === formattedBreedName ? "bold" : "normal",
                    display: "block",
                    marginY: 0.5,
                  }}
                >
                  {cat.nameBreed}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        )}{" "}
      </Box>
    </Drawer>
  );
};

export default DrawerPet;
