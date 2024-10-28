// DataTable.js
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "@/src/hooks/useFormatTime";

const DataTable = ({
  dataList,
  selectedIds,
  onSelect,
  onSelectAll,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
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
          <TableCell>ID</TableCell>
          <TableCell>Name Voucher</TableCell>
          <TableCell>Discount</TableCell>
          <TableCell>Exclusive</TableCell>
          <TableCell>Expiry</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dataList.map((item, index) => (
          <TableRow key={item._id}>
            <TableCell>
              <Checkbox
                checked={selectedIds.includes(item._id)}
                onChange={() => onSelect(item._id)}
              />
            </TableCell>
            <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
            <TableCell>{item.nameVoucher}</TableCell>
            <TableCell>{item.discount}%</TableCell>
            <TableCell>{item.exclusive.toLocaleString("vi")} VNĐ</TableCell>
            <TableCell>{formatDate(item.expiry)}</TableCell>
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

export default DataTable;
