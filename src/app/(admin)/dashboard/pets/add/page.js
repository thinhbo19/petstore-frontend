"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiUrlSpecies } from "@/src/services/config"; // Thay đổi theo cấu trúc dự án của bạn
import Image from "next/image";

const AddPetsPage = () => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [deworming, setDeworming] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [characteristic, setCharacteristic] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleNameChange = (event) => setName(event.target.value);
  const handleSpeciesChange = (event) => setSpecies(event.target.value);
  const handleAgeChange = (event) => setAge(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleDewormingChange = (event) => setDeworming(event.target.value);
  const handleVaccinationChange = (event) => setVaccination(event.target.value);
  const handleCharacteristicChange = (event) =>
    setCharacteristic(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("species", species);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("price", price);
    formData.append("deworming", deworming);
    formData.append("vaccination", vaccination);
    formData.append("characteristic", characteristic);
    formData.append("description", description);
    images.forEach((image) => formData.append("images", image));

    try {
      await axios.post(`${apiUrlSpecies}/addPet`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
      setTimeout(() => router.push("/pets"), 2000); // Redirect after success
    } catch (err) {
      setError("Failed to add pet. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Pet
      </Typography>

      {/* Image Upload */}
      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" component="label">
          Upload Images
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </Button>
        {images.length > 0 && (
          <Box sx={{ marginTop: 2, display: "flex", flexWrap: "wrap" }}>
            {images.map((image, index) => (
              <Box key={index} sx={{ margin: 1 }}>
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Image preview ${index}`}
                  width={100}
                  height={100}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Form Fields */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Breed</InputLabel>
              <Select
                value={species}
                onChange={handleSpeciesChange}
                label="Breed"
              >
                {/* Example species options */}
                <MenuItem value="dog">Dog</MenuItem>
                <MenuItem value="cat">Cat</MenuItem>
                <MenuItem value="bird">Bird</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Age"
              variant="outlined"
              value={age}
              onChange={handleAgeChange}
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={handleGenderChange}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Price"
              variant="outlined"
              value={price}
              onChange={handlePriceChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Deworming"
              variant="outlined"
              value={deworming}
              onChange={handleDewormingChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Vaccination"
              variant="outlined"
              value={vaccination}
              onChange={handleVaccinationChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Characteristic"
              variant="outlined"
              value={characteristic}
              onChange={handleCharacteristicChange}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Description */}
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={handleDescriptionChange}
      />

      {/* Submit Button */}
      <Box sx={{ marginTop: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {success && (
              <Alert severity="success">Pet added successfully!</Alert>
            )}
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default AddPetsPage;
