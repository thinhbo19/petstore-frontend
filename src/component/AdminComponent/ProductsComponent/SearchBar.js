import React from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ActionButtons from "./ActionButtons";
import Link from "next/link";

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
    {/* Search Input */}
    <TextField
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={onSearchChange}
      style={{ marginRight: "10px" }}
    />

    {/* Add Button */}
    <Link
      style={{ textDecoration: "none", color: "white" }}
      href="/dashboard/products/add"
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onAdd}
        style={{ marginRight: "10px" }}
      >
        Add
      </Button>
    </Link>

    {/* Action Buttons */}
    <ActionButtons selectedIds={selectedIds} onDeleteAll={onDeleteAll} />

    {/* Select Dropdown for Categories */}
    <FormControl
      variant="outlined"
      style={{ marginLeft: "10px", minWidth: 120 }}
    >
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
        label="Category"
      >
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Toys">Toys</MenuItem>
        <MenuItem value="Cage">Cage</MenuItem>
      </Select>
    </FormControl>
  </div>
);

export default SearchBar;
