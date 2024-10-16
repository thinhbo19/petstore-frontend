// TableData.js
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
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import noAvatar from "../../../../public/avartar.jpg";

const TableData = ({
  dataList,
  selectedIds,
  onSelect,
  onSelectAll,
  onDelete,
  page,
  rowsPerPage,
  onRoleChange,
  onBlockChange,
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
          <TableCell>Avatar</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Status</TableCell>
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
                src={item.Avatar || noAvatar}
                alt={item.username}
                width={80}
                height={80}
              ></Image>
            </TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.mobile}</TableCell>
            <TableCell>
              {" "}
              <Select
                value={item.role}
                onChange={(e) => onRoleChange(item._id, e.target.value)}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Staff">Staff</MenuItem>
              </Select>
            </TableCell>
            <TableCell>
              {item.role !== "Admin" && (
                <Checkbox
                  checked={item.isBlocked}
                  sx={{
                    color: item.isBlocked ? "red" : "default",
                    "&.Mui-checked": {
                      color: "red",
                    },
                  }}
                  onChange={() => onBlockChange(item._id, !item.isBlocked)}
                />
              )}
            </TableCell>

            <TableCell>
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
