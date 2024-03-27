import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { apiUrlSpecies } from "../../../services/config";

const AddSpeciesForm = ({ open, handleClose, accessToken, fetchData }) => {
  const [speciesName, setSpeciesName] = useState("");
  const Swal = require("sweetalert2");
  const handleSpeciesNameChange = (event) => {
    setSpeciesName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${apiUrlSpecies}/addNewSpecies`,
        { nameSpecies: speciesName },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      Swal.fire({
        icon: "success",
        text: "Add successfully",
      });
      setSpeciesName("");
    } catch (error) {
      console.log(error.response.data.message);
      Swal.fire({
        icon: "warning",
        text: error.response.data.message,
      });
    }
    fetchData();
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Species</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Species Name"
          type="text"
          fullWidth
          value={speciesName}
          onChange={handleSpeciesNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSpeciesForm;
