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
import { apiUrlVoucher } from "@/src/services/config";

const AddData = ({
  fetchData,
  accessToken,
  open,
  onClose,
  loading,
  setLoading,
}) => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [typeVoucher, setTypeVoucher] = useState("");
  const [exclusive, setExclusive] = useState(0);
  const [expiry, setExpiry] = useState(0);

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleTypeVoucherChange = (event) => {
    setTypeVoucher(event.target.value);
  };
  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };
  const handleExclusiveChange = (event) => {
    setExclusive(event.target.value);
  };
  const handleExpiryChange = (event) => {
    setExpiry(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${apiUrlVoucher}/`,
        { nameVoucher: name, typeVoucher, discount, exclusive, expiry },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Swal.fire("Success", "Added successfully!", "success");
      fetchData();
      setName("");
      setTypeVoucher("");
      setDiscount(0);
      setExclusive(0);
      setExpiry(0);
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
      <DialogTitle>Add New Voucher</DialogTitle>
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
          name="type"
          label="Type"
          type="text"
          fullWidth
          variant="outlined"
          value={typeVoucher}
          onChange={handleTypeVoucherChange}
        />
        <TextField
          margin="dense"
          label="Discount (%)"
          type="number"
          fullWidth
          variant="outlined"
          value={discount}
          onChange={handleDiscountChange}
        />
        <TextField
          margin="dense"
          label="Exclusive Amount (VNĐ)"
          type="number"
          fullWidth
          variant="outlined"
          value={exclusive}
          onChange={handleExclusiveChange}
        />
        <TextField
          margin="dense"
          label="Expiry (Days)"
          type="number"
          fullWidth
          variant="outlined"
          value={expiry}
          onChange={handleExpiryChange}
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
