import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import axios from "axios";
import { apiUrlPets } from "../../../services/config";
import MenuItem from "@mui/material/MenuItem";
import Loading from "../../../Component/Loading/Loading";
import { getAllBreeds } from "../../../services/api";

const AddForm = ({ open, handleClose, accessToken, fetchData }) => {
  const [breedList, setBreedList] = useState([]);
  const [productName, setProductName] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deworming, setDeworming] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [characteristic, setCharacteristic] = useState("");
  const Swal = require("sweetalert2");
  const [loading, setLoading] = useState(false);

  const handleBreedNameChange = (event) => {
    setProductName(event.target.value);
  };
  const handleSelectChange = (event) => {
    setSelectedId(event.target.value);
  };
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const limitedFiles = files.slice(0, 3);
    setSelectedFile(limitedFiles);
  };
  const handleAgeChange = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, "");
    setAge(inputValue);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handlePriceChange = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, "");
    setPrice(inputValue);
  };
  const handleDewormingChange = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, "");
    setDeworming(inputValue);
  };
  const handleVaccinationChange = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, "");
    setVaccination(inputValue);
  };
  const handleCharacteristicChange = (event) => {
    setCharacteristic(event.target.value);
  };
  useEffect(() => {
    fetchDataBreed();
  }, [accessToken]);

  const fetchDataBreed = async () => {
    try {
      const data = await getAllBreeds(accessToken);
      setBreedList(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("namePet", productName);
      formData.append("breed", selectedId);
      for (let i = 0; i < selectedFile.length; i++) {
        formData.append("imgPet", selectedFile[i]);
      }
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("description", description);
      formData.append("price", price);

      await axios.post(`${apiUrlPets}/addPets`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        text: "Add successfully",
      });
      setProductName("");
      setSelectedId(null);
      setSelectedFile(null);
      setAge("");
      setGender("");
      setDescription("");
      setPrice("");
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: error.response.data.message,
      });
    }
    fetchData();
    setLoading(false);
    handleClose();
  };

  const renderImagePreview = () => {
    if (selectedFile && selectedFile.length > 0) {
      return (
        <div className="image-preview">
          {selectedFile.map((file, index) => (
            <img
              className="img__des"
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
            />
          ))}
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
      <DialogTitle>Add New Pet</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Pet Name"
          type="text"
          fullWidth
          value={productName}
          onChange={handleBreedNameChange}
        />
        <div className="file-input-container">
          <input
            className="custom-file-input"
            type="file"
            onChange={handleFileChange}
            multiple
          />
          {renderImagePreview()}{" "}
        </div>
        <Select
          autoFocus
          margin="dense"
          label="Choose Breed"
          value={selectedId || ""}
          onChange={handleSelectChange}
          fullWidth
        >
          {breedList.map((breeds) => (
            <MenuItem key={breeds.id} value={breeds._id}>
              {breeds.nameBreed} - {breeds.petSpecies.nameSpecies}
            </MenuItem>
          ))}
        </Select>
        <TextField
          autoFocus
          margin="dense"
          label="Age"
          type="text"
          fullWidth
          value={age}
          onChange={handleAgeChange}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Gender (Male, Female or Castrated)"
          type="text"
          fullWidth
          value={gender}
          onChange={handleGenderChange}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Price (VNĐ)"
          type="text"
          fullWidth
          value={price}
          onChange={handlePriceChange}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Deworming"
          type="text"
          fullWidth
          value={deworming}
          onChange={handleDewormingChange}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Vaccination"
          type="text"
          fullWidth
          value={vaccination}
          onChange={handleVaccinationChange}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Characteristic"
          type="text"
          fullWidth
          value={characteristic}
          onChange={handleCharacteristicChange}
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

export default AddForm;
