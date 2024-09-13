// SearchBar.js
import React from "react";
import { TextField, Button, ButtonGroup } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ActionButtons from "./ActionButtons";
import Link from "next/link";

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
    <Link
      style={{ textDecoration: "none", color: "white" }}
      href="/dashboard/news/add"
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={{ marginRight: "10px" }}
      >
        Add
      </Button>
    </Link>
    <ActionButtons selectedIds={selectedIds} onDeleteAll={onDeleteAll} />
  </div>
);

export default SearchBar;
