// SpeciesTable.js
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
import Image from "next/image";

const TableData = ({
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
          <TableCell>Image</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Species</TableCell>
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
            <TableCell>
              <Image
                src={item.imgBreed[0]}
                alt={item.nameBreed}
                width={80}
                height={80}
              ></Image>
            </TableCell>
            <TableCell>{item.nameBreed}</TableCell>
            <TableCell>{item.petSpecies.nameSpecies}</TableCell>
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
