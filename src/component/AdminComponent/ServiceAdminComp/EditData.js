import React, { useRef, useState } from "react";
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
import { apiUrlService, apiUrlSpecies } from "@/src/services/config";
import { Editor } from "@tinymce/tinymce-react";

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
  const [price, setPrice] = useState("");
  const [htmlDescription, setHtmlDescription] = useState("");
  const editorRef = useRef(null);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(
        `${apiUrlService}/change/${idEdit}`,
        { nameService: name, price: price, description: htmlDescription },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Swal.fire("Success", "Edited successfully!", "success");
      fetchData();
      setName("");
      setPrice("");
      setHtmlDescription("");
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
      <DialogTitle>Edit New Species</DialogTitle>
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
        <TextField
          autoFocus
          margin="dense"
          name="price"
          label="Price"
          type="text"
          fullWidth
          variant="outlined"
          value={price}
          onChange={handleChangePrice}
        />
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
