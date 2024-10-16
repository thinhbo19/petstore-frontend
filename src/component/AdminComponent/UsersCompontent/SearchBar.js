// SearchBar.js
import React from "react";
import { TextField } from "@mui/material";
import ActionButtons from "./ActionButtons";

const SearchBar = ({
  searchTerm,
  onSearchChange,
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

    <ActionButtons selectedIds={selectedIds} onDeleteAll={onDeleteAll} />
  </div>
);

export default SearchBar;
