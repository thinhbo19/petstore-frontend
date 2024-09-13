"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import { getCurrentNews, updateNews } from "@/src/services/apiNews";

const EditData = ({ newsId }) => {
  const accessToken = useSelector(selectAccessToken);
  const [title, setTile] = useState("");
  const [firstWord, setFirstWord] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [images, setImages] = useState([]);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrentNews(newsId);
        setTile(data.title || "");
        setFirstWord(data.firstWord || "");
        setHtmlContent(data.content || "");
        // Assuming data.images contains URLs or base64 strings
        setImages(data.images || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch news data.");
      }
    };
    fetchData();
  }, [newsId]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("firstWord", firstWord);
    formData.append("content", htmlContent);
    images.forEach((image) => formData.append("images", image));

    try {
      await updateNews(newsId, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
      // Redirect or perform other actions here
    } catch (err) {
      setError("Failed to update news. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit News
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
      <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 1 }}>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTile(e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          label="First Word"
          variant="outlined"
          value={firstWord}
          onChange={(e) => setFirstWord(e.target.value)}
        />
      </Box>

      {/* Description */}
      <Box sx={{ marginTop: 2 }}>
        <Editor
          value={htmlContent}
          onEditorChange={(content) => setHtmlContent(content)}
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
              <Alert severity="success">News updated successfully!</Alert>
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

export default EditData;
