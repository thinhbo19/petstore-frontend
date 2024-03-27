import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { apiUrlSpecies } from "../../../services/config";
import Swal from "sweetalert2";

const EditFormSpecies = ({
  openEdit,
  handleCloseEdit,
  accessToken,
  fetchData,
  species,
}) => {
  const [speciesName, setSpeciesName] = useState("");

  const handleSpeciesNameChange = (event) => {
    setSpeciesName(event.target.value);
  };

  const handleSubmitEdit = async () => {
    try {
      await axios.put(
        `${apiUrlSpecies}/changeSpecies/${species._id}`,
        { nameSpecies: speciesName },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      Swal.fire({
        icon: "success",
        text: "Species updated successfully",
      });
    } catch (error) {
      console.log(error.response.data.message);
      Swal.fire({
        icon: "error",
        text: "Failed to update species",
      });
    }
    fetchData();
    handleCloseEdit();
  };

  return (
    <Dialog open={openEdit} onClose={handleCloseEdit}>
      <DialogTitle>Edit Species</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Species Name"
          type="text"
          fullWidth
          value={speciesName}
          onChange={handleSpeciesNameChange}
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

export default EditFormSpecies;
