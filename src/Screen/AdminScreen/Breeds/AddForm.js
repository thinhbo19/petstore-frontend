import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import axios from "axios";
import { apiUrlBreeds } from "../../../services/config";
import MenuItem from "@mui/material/MenuItem";
import { getAllSpecies } from "../../../services/api";

const AddForm = ({ open, handleClose, accessToken, fetchData }) => {
  const [speciesList, setSpeciesList] = useState([]);
  const [breedName, setBreedName] = useState("");
  const [selectedSpeciesId, setSelectedSpeciesId] = useState(null); // State to store selected species ID
  const Swal = require("sweetalert2");

  const handleBreedNameChange = (event) => {
    setBreedName(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedSpeciesId(event.target.value);
  };

  useEffect(() => {
    fetchDataSpecies();
  }, [accessToken]);

  const fetchDataSpecies = async () => {
    try {
      const data = await getAllSpecies(accessToken);
      setSpeciesList(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${apiUrlBreeds}/addNewBreed`,
        { nameBreed: breedName, species: selectedSpeciesId },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      Swal.fire({
        icon: "success",
        text: "Add successfully",
      });
      setBreedName("");
      setSelectedSpeciesId(null);
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
      <DialogTitle>Add New Breed</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Breed Name"
          type="text"
          fullWidth
          value={breedName}
          onChange={handleBreedNameChange}
        />
        <Select
          autoFocus
          margin="dense"
          label="Species"
          value={selectedSpeciesId || ""}
          onChange={handleSelectChange}
          fullWidth
        >
          {speciesList.map((species) => (
            <MenuItem key={species.id} value={species._id}>
              {species.nameSpecies}
            </MenuItem>
          ))}
        </Select>
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

export default AddForm;
