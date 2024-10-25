// ActionButtons.js
import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ActionButtons = ({ selectedIds, onDeleteAll }) =>
  selectedIds.length > 0 && (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<DeleteIcon />}
      onClick={onDeleteAll}
    >
      Delete All
    </Button>
  );

export default ActionButtons;
