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
import { apiUrlService } from "@/src/services/config";
import { Editor } from "@tinymce/tinymce-react";

const AddData = ({
  fetchData,
  accessToken,
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
      await axios.post(
        `${apiUrlService}/`,
        { nameService: name, price: price, description: htmlDescription },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Swal.fire("Success", "Added successfully!", "success");
      fetchData();
      setName("");
      setPrice("");
      setHtmlDescription("");
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
      <DialogTitle>Add New Service</DialogTitle>
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
          {loading ? "Adding....." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddData;
