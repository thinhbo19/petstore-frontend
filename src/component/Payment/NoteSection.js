import React from "react";
import { Paper, Typography, TextField } from "@mui/material";

const NoteSection = ({ note, setNote }) => {
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  console.log(note);
  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
      <Typography variant="h5" gutterBottom>
        Note
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={note}
        onChange={handleNoteChange}
        placeholder="Enter notes..."
        sx={{ marginBottom: 3 }}
      />
    </Paper>
  );
};

export default NoteSection;
