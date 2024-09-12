"use client";
import React, { useEffect, useRef, useState } from "react";
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
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiUrlPets } from "@/src/services/config";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import { getCurrentPets } from "@/src/services/apiPet";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the DeleteIcon component

const EditPetsData = ({ petId }) => {
  const accessToken = useSelector(selectAccessToken);
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [deworming, setDeworming] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [characteristic, setCharacteristic] = useState("");
  const [htmlDescription, setHtmlDescription] = useState("");
  const editorRef = useRef(null);
  const [images, setImages] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDataPet = async () => {
      try {
        const petData = await getCurrentPets(petId);

        setName(petData.namePet);
        setSpecies(petData.petBreed.nameSpecies);
        setBreed(petData.petBreed.nameBreed);
        setAge(petData.age);
        setGender(petData.gender);
        setPrice(petData.price);
        setDeworming(petData.deworming);
        setVaccination(petData.vaccination);
        setCharacteristic(petData.characteristic);
        setHtmlDescription(petData.description);
        setCurrentImages(petData.imgPet || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataPet();
  }, [petId]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => {
      // Xóa ảnh khỏi danh sách ảnh
      const newImages = prevImages.filter((_, i) => i !== index);
      console.log("Updated images:", newImages); // In giá trị mới của images để kiểm tra
      return newImages;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData();
    formData.append("namePet", name);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("price", price);
    formData.append("deworming", deworming);
    formData.append("vaccination", vaccination);
    formData.append("characteristic", characteristic);
    formData.append("description", htmlDescription);
    images.forEach((image) => formData.append("imgPet", image));

    try {
      await axios.put(`${apiUrlPets}/${petId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
      setTimeout(() => router.push("/dashboard/pets"), 1000);
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
        <Box sx={{ marginTop: 2, display: "flex", flexWrap: "wrap" }}>
          {images.length > 0 &&
            images.map((image, index) => (
              <Box key={index} sx={{ position: "relative", margin: 1 }}>
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Image preview ${index}`}
                  width={100}
                  height={100}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                  onClick={() => handleDeleteImage(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          {currentImages.length > 0 &&
            currentImages.map((image, index) => (
              <Box key={index} sx={{ position: "relative", margin: 1 }}>
                <Image
                  src={image}
                  alt={`Current image ${index}`}
                  width={100}
                  height={100}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                  onClick={() => handleDeleteImage(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
        </Box>
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
              onChange={(e) => setName(e.target.value)}
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Species</InputLabel>
              <Select
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                label="Species"
                disabled
              >
                <MenuItem value={species}>{species}</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Breed</InputLabel>
              <Select
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                disabled
                label="Breed"
              >
                <MenuItem value={breed}>{breed}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Age"
              variant="outlined"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 1 }}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Price"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Deworming"
              variant="outlined"
              value={deworming}
              onChange={(e) => setDeworming(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Vaccination"
              variant="outlined"
              value={vaccination}
              onChange={(e) => setVaccination(e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>

      <TextField
        fullWidth
        margin="normal"
        label="Characteristic"
        variant="outlined"
        value={characteristic}
        onChange={(e) => setCharacteristic(e.target.value)}
      />

      {/* Description */}
      <Box sx={{ marginTop: 2 }}>
        <Editor
          value={htmlDescription}
          onEditorChange={(content) => setHtmlDescription(content)}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          apiKey="06txmbmjzqjj2tbcgqgwvs8xzubupbhjzun5zodh0as2q07u"
          initialValue="<p>Description.</p>"
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap preview anchor",
            ],
            toolbar:
              "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat",
          }}
        />
      </Box>

      {/* Submit Button */}
      <Box sx={{ marginTop: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {success && (
              <Alert severity="success">Pet updated successfully!</Alert>
            )}
            {error && <Alert severity="error">{error}</Alert>}
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default EditPetsData;
