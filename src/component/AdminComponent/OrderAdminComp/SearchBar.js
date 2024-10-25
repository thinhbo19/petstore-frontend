import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ActionButtons from "./ActionButtons";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  selectedIds,
  onDeleteAll,
  selectedStatus,
  onStatusChange,
}) => (
  <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
    <TextField
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={onSearchChange}
      style={{ marginRight: "10px" }}
    />

    <FormControl
      variant="outlined"
      style={{ marginRight: "10px", minWidth: 120 }}
    >
      <InputLabel>Status</InputLabel>
      <Select value={selectedStatus} onChange={onStatusChange} label="Status">
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Processing">Processing</MenuItem>
        <MenuItem value="Cancelled">Cancelled</MenuItem>
        <MenuItem value="Shipping">Shipping</MenuItem>
        <MenuItem value="Success">Success</MenuItem>
      </Select>
    </FormControl>

    <ActionButtons selectedIds={selectedIds} onDeleteAll={onDeleteAll} />
  </div>
);

export default SearchBar;
