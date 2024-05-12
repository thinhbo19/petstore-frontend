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
import "./Breeds.css";
import Loading from "../../../Component/Loading/Loading";

const AddForm = ({ open, handleClose, accessToken, fetchData }) => {
  const [speciesList, setSpeciesList] = useState([]);
  const [breedName, setBreedName] = useState("");
  const [selectedSpeciesId, setSelectedSpeciesId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const Swal = require("sweetalert2");
  const [loading, setLoading] = useState(false);

  const handleBreedNameChange = (event) => {
    setBreedName(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedSpeciesId(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nameBreed", breedName);
      formData.append("speciesID", selectedSpeciesId);
      formData.append("imgBreed", selectedFile);

      await axios.post(`${apiUrlBreeds}/addNewBreed`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        text: "Add successfully",
      });
      setBreedName("");
      setSelectedSpeciesId(null);
      setSelectedFile(null);
    } catch (error) {
      // console.log(error.response.data.message);
      Swal.fire({
        icon: "warning",
        text: error.response.data.message,
      });
      console.log(error);
    }
    fetchData();
    setLoading(false);
    handleClose();
  };

  const renderImagePreview = () => {
    if (selectedFile) {
      return (
        <div className="image-preview">
          <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <Loading />;
  }

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
        <div className="file-input-container">
          <input
            className="custom-file-input"
            type="file"
            onChange={handleFileChange}
          />
          {renderImagePreview()}
        </div>
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
