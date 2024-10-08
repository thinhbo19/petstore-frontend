// SearchBar.js
import React from "react";
import { TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ActionButtons from "./ActionButtons";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  onAdd,
  selectedIds,
  onDeleteAll,
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
  </div>
);

export default SearchBar;
