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
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiUrlPets } from "@/src/services/config";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import { getAllDog, getAllCat } from "@/src/services/apiPet";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";

const AddPetsPage = () => {
  const accessToken = useSelector(selectAccessToken);
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState([]);
  const [idBreed, setIdBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [deworming, setDeworming] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [characteristic, setCharacteristic] = useState("");
  const [htmlDescription, setHtmlDescription] = useState("");
  const editorRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (species) {
          const res = species === "dog" ? await getAllDog() : await getAllCat();
          setBreed(res);
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [species]);

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData();
    formData.append("namePet", name);
    formData.append("breed", idBreed);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("price", price);
    formData.append("deworming", deworming);
    formData.append("vaccination", vaccination);
    formData.append("characteristic", characteristic);
    formData.append("description", htmlDescription);
    images.forEach((image) => formData.append("imgPet", image));

    try {
      await axios.post(`${apiUrlPets}/addPets`, formData, {
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

      {/* Form Fields Box */}
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
              >
                <MenuItem value="dog">Dog</MenuItem>
                <MenuItem value="cat">Cat</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Breed</InputLabel>
              <Select
                value={idBreed} // Lưu id của breed đã chọn
                onChange={(e) => setIdBreed(e.target.value)} // Khi người dùng chọn, lưu id của breed
                label="Breed"
              >
                {Array.isArray(breed) &&
                  breed.map((b) => (
                    <MenuItem key={b._id} value={b._id}>
                      {b.nameBreed} {/* Hiển thị tên breed */}
                    </MenuItem>
                  ))}
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
