import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Avatar,
} from "@mui/material";

const RatingForm = ({ onSubmit, onClose }) => {
  const [star, setRatingValue] = useState(0);
  const [comment, setReviewText] = useState("");
  const [feedback_img, setSelectedImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(star, comment, feedback_img);
    onClose();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  return (
    <Box
      sx={{
        padding: 3,
        width: 300,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Leave a Review
      </Typography>
      <Rating
        value={star}
        onChange={(e, newValue) => setRatingValue(newValue)}
      />
      <TextField
        fullWidth
        label="Review"
        multiline
        rows={3}
        value={comment}
        onChange={(e) => setReviewText(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
        Add Images
        <input type="file" hidden multiple onChange={handleImageChange} />
      </Button>

      {feedback_img.length > 0 && (
        <Box
          mt={2}
          display="flex"
          flexWrap="wrap"
          gap={1}
          justifyContent="center"
        >
          {feedback_img.map((image, index) => (
            <Avatar
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Selected ${index + 1}`}
              sx={{ width: 80, height: 80 }}
            />
          ))}
        </Box>
      )}

      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default RatingForm;
