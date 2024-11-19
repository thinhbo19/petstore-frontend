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
    case "Confirmed":
      return "#FB5631";
    case "Completed":
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
          <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Type </TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Booking Date</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
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
            <TableCell>{item.user?.username}</TableCell>
            <TableCell>{item.paymentMethod}</TableCell>
            <TableCell sx={{ color: "red" }}>
              {item.totalPrice.toLocaleString("vi")} VNĐ
            </TableCell>
            <TableCell>{item.services[0].type}</TableCell>
            <TableCell>{formatDate(item.bookingDate)}</TableCell>
            <TableCell>
              {item.status === "Processing" ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleChangeStatus(item._id, "Confirmed")}
                  sx={{
                    fontSize: "0.8rem",
                    "&:hover": { backgroundColor: "#0056b3" },
                  }}
                >
                  Confirmation
                </Button>
              ) : item.status === "Confirmed" ? (
                <Button
                  onClick={() => handleChangeStatus(item._id, "Completed")}
                  sx={{
                    backgroundColor: "green",
                    fontSize: "0.8rem",
                    color: "white",
                    "&:hover": { backgroundColor: "#008E00" },
                  }}
                >
                  Completed
                </Button>
              ) : (
                <Typography
                  sx={{
                    color: getStatusColor(item.status),
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
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
