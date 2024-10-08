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
import { apiUrlPets, apiUrlProduct } from "@/src/services/config";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import { getCurrentPets } from "@/src/services/apiPet";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import { getCurrentProduct } from "@/src/services/apiProduct";

const EditProductsData = ({ prodID }) => {
  const accessToken = useSelector(selectAccessToken);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [htmlDescription, setHtmlDescription] = useState("");
  const editorRef = useRef(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDataPet = async () => {
      try {
        const data = await getCurrentProduct(prodID);

        setName(data.nameProduct);
        setCategory(data.category.nameCate);
        setQuantity(data.quantity);
        setPrice(data.price);
        setShortTitle(data.shortTitle);
        setHtmlDescription(data.description);
        setCurrentImages(data.imgPet || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataPet();
  }, [prodID]);

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const res = await axios.put(
        `${apiUrlProduct}/${prodID}`,
        {
          namePet: name,
          quantity: quantity,
          description: htmlDescription,
          price: price,
          shortTitle: shortTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSuccess(true);
      // setTimeout(() => router.push("/dashboard/pets"), 1000);
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
        Edit New Pet
      </Typography>

      {/* Image Upload */}
      <Box sx={{ marginBottom: 2 }}>
        <Box sx={{ marginTop: 2, display: "flex", flexWrap: "wrap" }}>
          {currentImages.length > 0 &&
            currentImages.map((image, index) => (
              <Box key={index} sx={{ position: "relative", margin: 1 }}>
                <Image
                  src={image}
                  alt={`Current image ${index}`}
                  width={100}
                  height={100}
                />
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
              <InputLabel>Categories</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Categories"
                disabled
              >
                <MenuItem value={category}>{category}</MenuItem>
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
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Quantity"
              variant="outlined"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>
      <TextField
        fullWidth
        margin="normal"
        label="ShortTitle"
        variant="outlined"
        value={shortTitle}
        onChange={(e) => setShortTitle(e.target.value)}
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

export default EditProductsData;
