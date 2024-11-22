import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Drawer,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { generateSlug } from "@/src/services/slugifyConfig";

const DrawerBreed = ({
  nameSpecies,
  isDrawerOpen,
  toggleDrawer,
  catData,
  dogData,
}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (nameSpecies === "dog") {
      setExpanded("panel1");
    } else if (nameSpecies === "cat") {
      setExpanded("panel2");
    } else {
      setExpanded(false);
    }
  }, [nameSpecies]);

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
      <Box sx={{ width: 250, padding: 2 }} role="presentation">
        {/* Accordion cho Dog */}
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
                sx={{ color: nameSpecies === "dog" ? "white" : "black" }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              backgroundColor: nameSpecies === "dog" ? "#FA5130" : "white",
              borderRadius: "10px",
            }}
          >
            <Typography
              component={Link}
              href="/shop/dog"
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                color: nameSpecies === "dog" ? "white" : "black",
              }}
            >
              DOG
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {dogData.map((dog) => (
              <Typography
                component={Link}
                href={`/shop/dog/${generateSlug(dog.nameBreed)}`}
                key={dog._id}
                sx={{
                  textDecoration: "none",
                  color: "black",
                  display: "block",
                  marginY: 0.5,
                }}
              >
                {dog.nameBreed}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ marginY: 2 }} />

        {/* Accordion cho Cat */}
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
                sx={{ color: nameSpecies === "cat" ? "white" : "black" }}
              />
            }
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              backgroundColor: nameSpecies === "cat" ? "#FA5130" : "white",
              borderRadius: "10px",
            }}
          >
            <Typography
              component={Link}
              href="/shop/cat"
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                color: nameSpecies === "cat" ? "white" : "black",
              }}
            >
              CAT
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {catData.map((cat) => (
              <Typography
                component={Link}
                href={`/shop/cat/${generateSlug(cat.nameBreed)}`}
                key={cat._id}
                sx={{
                  textDecoration: "none",
                  color: "black",
                  display: "block",
                  marginY: 0.5,
                }}
              >
                {cat.nameBreed}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Drawer>
  );
};

export default DrawerBreed;
