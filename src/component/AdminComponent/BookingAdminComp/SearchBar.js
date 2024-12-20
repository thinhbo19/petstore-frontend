import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import ActionButtons from "./ActionButtons";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  selectedIds,
  onDeleteAll,
  selectedStatus,
  onStatusChange,
  handleOpenService,
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
        <MenuItem value="Confirmed">Confirmed</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
        <MenuItem value="Cancelled">Cancelled</MenuItem>
      </Select>
    </FormControl>

    <Button
      variant="contained"
      color="primary"
      onClick={() => handleOpenService("Hotel Booking")}
      style={{ marginRight: "20px" }}
    >
      Create Hotel Booking
    </Button>

    <Button
      variant="contained"
      color="secondary"
      onClick={() => handleOpenService("Spa Service")}
      style={{ marginRight: "20px" }}
    >
      Create Spa Service
    </Button>

    <ActionButtons selectedIds={selectedIds} onDeleteAll={onDeleteAll} />
  </div>
);

export default SearchBar;
