import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { apiUrlBreeds } from "@/src/services/config";
import Image from "next/image";

const AddData = ({
  allSpecies,
  fetchData,
  accessToken,
  open,
  onClose,
  loading,
  setLoading,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("nameBreed", name);
    formData.append("speciesID", category);
    if (image) {
      formData.append("imgBreed", image);
    }

    try {
      await axios.post(`${apiUrlBreeds}/addNewBreed`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire("Success", "Species added successfully!", "success");
      fetchData();
      setName("");
      setCategory("");
      setImage(null);
      setImagePreview(null); // Reset image preview
      onClose();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to add species. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Breed</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={handleNameChange}
        />
        <FormControl fullWidth variant="outlined" margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            label="Category"
          >
            {allSpecies.map((species) => (
              <MenuItem key={species._id} value={species._id}>
                {species.nameSpecies}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" component="label" fullWidth margin="dense">
          Choose Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
        {imagePreview && (
          <div style={{ marginTop: 16 }}>
            <Image src={imagePreview} alt="Preview" width={100} height={100} />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {loading ? "Adding....." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddData;
