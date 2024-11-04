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
  selectedType,
  onSelectType,
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

    <ButtonGroup style={{ marginLeft: "10px" }}>
      <Button
        variant={selectedType === "Spa" ? "contained" : "outlined"}
        color="primary"
        onClick={() => onSelectType("Spa")}
      >
        Spa
      </Button>
      <Button
        variant={selectedType === "Hotel" ? "contained" : "outlined"}
        color="primary"
        onClick={() => onSelectType("Hotel")}
      >
        Hotel
      </Button>
    </ButtonGroup>
    <ActionButtons selectedIds={selectedIds} onDeleteAll={onDeleteAll} />
  </div>
);

export default SearchBar;
