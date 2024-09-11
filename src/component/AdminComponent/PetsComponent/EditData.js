import React, { useEffect, useState } from "react";
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
import { apiUrlBreeds, apiUrlSpecies } from "@/src/services/config";

const EditData = ({
  fetchData,
  accessToken,
  idEdit,
  open,
  onClose,
  loading,
  setLoading,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (idEdit) {
      const fetchDataForEdit = async () => {
        try {
          const response = await axios.get(
            `${apiUrlBreeds}/getCurrentBreed/${idEdit}`
          );
          const data = response.data.breed;
          setName(data.nameBreed);
        } catch (error) {
          console.log(error);
          Swal.fire("Error", "Failed to fetch data.", "error");
        }
      };
      fetchDataForEdit();
    }
  }, [idEdit]);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(
        `${apiUrlBreeds}/changeBreed/${idEdit}`,
        { nameBreed: name },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Swal.fire("Success", "Edited successfully!", "success");
      fetchData();
      setName("");
      onClose();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to edit. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit New Breed</DialogTitle>
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
          {loading ? "Editing....." : "Change"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditData;
