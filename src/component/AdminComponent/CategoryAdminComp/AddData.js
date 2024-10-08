import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { apiUrlCategory, apiUrlSpecies } from "@/src/services/config";

const AddData = ({
  fetchData,
  accessToken,
  open,
  onClose,
  loading,
  setLoading,
}) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${apiUrlCategory}/addCate`,
        { nameCategory: name },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Swal.fire("Success", "Added successfully!", "success");
      fetchData();
      setName("");
      onClose();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to add. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Category</DialogTitle>
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
          onChange={handleChange}
        />
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
