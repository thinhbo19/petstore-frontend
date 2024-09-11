// SearchBar.js
import React from "react";
import { TextField, Button, ButtonGroup } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ActionButtons from "./ActionButtons";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  onAdd,
  selectedIds,
  onDeleteAll,
  selectedCategory,
  onSelectCategory,
}) => (
  <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
    <TextField
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={onSearchChange}
      style={{ marginRight: "10px" }}
    />
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={onAdd}
      style={{ marginRight: "10px" }}
    >
      Add
    </Button>
    <ActionButtons selectedIds={selectedIds} onDeleteAll={onDeleteAll} />

    <ButtonGroup style={{ marginLeft: "10px" }}>
      <Button
        variant={selectedCategory === "Dog" ? "contained" : "outlined"}
        color="primary"
        onClick={() => onSelectCategory("Dog")}
      >
        Dog
      </Button>
      <Button
        variant={selectedCategory === "Cat" ? "contained" : "outlined"}
        color="primary"
        onClick={() => onSelectCategory("Cat")}
      >
        Cat
      </Button>
    </ButtonGroup>
  </div>
);

export default SearchBar;
