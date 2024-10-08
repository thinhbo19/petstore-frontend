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
import { apiUrlCategory, apiUrlProduct } from "@/src/services/config";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import { getAllCategory, getAllProduct } from "@/src/services/apiProduct";

const AddProductsPage = () => {
  const accessToken = useSelector(selectAccessToken);
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [shortTitle, setShortTitle] = useState("");
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
        const res = await getAllCategory();
        setCategory(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [accessToken]);

  useEffect(() => {
    const hanldeCreateCode = async () => {
      if (idCategory) {
        try {
          const res = await axios.get(
            `${apiUrlCategory}/current/${idCategory}`
          );
          const categoryName = res.data.category.nameCategory;

          const initials = categoryName
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase();

          const index = category.length + 1;
          const code = `${initials}${index}`;

          setNameCategory(code);
        } catch (error) {
          console.error("Error creating cate code:", error);
        }
      }
    };
    hanldeCreateCode();
  }, [idCategory]);

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    const resData = await getAllProduct();

    const newNameProduct = name + " Code " + nameCategory + resData.length;
    const formData = new FormData();
    formData.append("nameProduct", newNameProduct);
    formData.append("category", idCategory);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("shortTitle", shortTitle);
    formData.append("description", htmlDescription);
    images.forEach((image) => formData.append("images", image));

    try {
      await axios.post(`${apiUrlProduct}/addProduct`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
      // setTimeout(() => router.push("/dashboard/products"), 1000);
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
        Add New Product
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
              <InputLabel>Category</InputLabel>
              <Select
                value={idCategory}
                onChange={(e) => setIdCategory(e.target.value)}
                label="Category"
              >
                {Array.isArray(category) &&
                  category.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.nameCategory}
                    </MenuItem>
                  ))}
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
        label="Short Title"
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

export default AddProductsPage;
