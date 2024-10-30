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
import { apiUrlVoucher } from "@/src/services/config";

const EditData = ({
  fetchData,
  accessToken,
  idEdit,
  open,
  onClose,
  loading,
  setLoading,
  editData,
}) => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [typeVoucher, setTypeVoucher] = useState("");
  const [exclusive, setExclusive] = useState(0);
  const [expiry, setExpiry] = useState(0);

  useEffect(() => {
    if (editData) {
      setName(editData.nameVoucher || "");
      setDiscount(editData.discount || 0);
      setExclusive(editData.exclusive || 0);
      setTypeVoucher(editData.typeVoucher);
      const today = new Date();
      const expiryDate = new Date(editData.expiry);
      const timeDifference = expiryDate - today;
      const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      setExpiry(daysRemaining > 0 ? daysRemaining : 0);
    }
  }, [editData, idEdit]);

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
      await axios.put(
        `${apiUrlVoucher}/${idEdit}`,
        {
          nameVoucher: name,
          typeVoucher,
          discount,
          exclusive,
          expiry,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Swal.fire("Success", "Edited successfully!", "success");
      fetchData();
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
      <DialogTitle>Edit Voucher</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
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
          {loading ? "Editing....." : "Change"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditData;
