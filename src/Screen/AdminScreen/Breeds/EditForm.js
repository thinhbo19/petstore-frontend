import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { apiUrlBreeds } from "../../../services/config";
import Swal from "sweetalert2";

const EditForm = ({
  openEdit,
  handleCloseEdit,
  accessToken,
  fetchData,
  breeds,
}) => {
  const [breedName, setBreedName] = useState("");
  const handleNameChange = (event) => {
    setBreedName(event.target.value);
  };

  const handleSubmitEdit = async () => {
    try {
      await axios.patch(
        `${apiUrlBreeds}/changeBreed/${breeds._id}`,
        { nameBreed: breedName },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      Swal.fire({
        icon: "success",
        text: "Breeds updated successfully",
      });
      setBreedName("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Failed to update Breeds",
      });
    }
    fetchData();
    handleCloseEdit();
  };

  return (
    <Dialog open={openEdit} onClose={handleCloseEdit}>
      <DialogTitle>Edit Breed</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Breed Name"
          type="text"
          fullWidth
          value={breedName}
          onChange={handleNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEdit}>Cancel</Button>
        <Button onClick={handleSubmitEdit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditForm;
