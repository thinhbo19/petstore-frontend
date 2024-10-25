import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Checkbox,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "@/src/hooks/useFormatTime";

const getStatusColor = (status) => {
  switch (status) {
    case "Processing":
      return "blue";
    case "Cancelled":
      return "red";
    case "Shipping":
      return "#FB5631";
    case "Success":
      return "green";
    default:
      return "default";
  }
};

const TableData = ({
  dataList,
  selectedIds,
  onSelect,
  onSelectAll,
  onEdit,
  onDelete,
  handleChangeStatus,
}) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              checked={selectedIds.length === dataList.length}
              onChange={onSelectAll}
              indeterminate={
                selectedIds.length > 0 && selectedIds.length < dataList.length
              }
            />
          </TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>OrderID</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Order By</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Payment Method</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
          <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
            Action
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dataList.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <Checkbox
                checked={selectedIds.includes(item._id)}
                onChange={() => onSelect(item._id)}
              />
            </TableCell>
            <TableCell>{item._id}</TableCell>
            <TableCell>{item.OrderBy.username}</TableCell>
            <TableCell>{item.paymentMethod}</TableCell>
            <TableCell>{formatDate(item.updatedAt)}</TableCell>
            <TableCell
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.status === "Processing" ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleChangeStatus(item._id, "Shipping")}
                  sx={{ "&:hover": { backgroundColor: "#0056b3" } }}
                >
                  Confirmation
                </Button>
              ) : (
                <Typography
                  sx={{
                    color: getStatusColor(item.status),
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  {item.status}
                </Typography>
              )}
            </TableCell>
            <TableCell>
              <IconButton color="primary" onClick={() => onEdit(item._id)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => onDelete(item._id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TableData;
