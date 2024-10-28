"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import { apiUrlCategory, apiUrlVoucher } from "@/src/services/config";
import axios from "axios";
import SearchBar from "./SearchBar";
import TablePagination from "@mui/material/TablePagination";
import AddData from "./AddData";
import Swal from "sweetalert2";
import EditData from "./EditData";
import { getAllCategory } from "@/src/services/apiProduct";
import DataTable from "./DataTable";
import { getAllVouchers, getCurrentVoucher } from "@/src/services/apiVocher";

const VoucherAdminComp = () => {
  const accessToken = useSelector(selectAccessToken);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataList, setDataList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openAddDialogEdit, setOpenAddDialogEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getAllVouchers();
      setDataList(res.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleAdd = () => {
    setOpenAddDialog(true);
  };

  const handleEdit = async (id) => {
    setIdEdit(id);
    const res = await getCurrentVoucher(id);
    setEditData(res);
    setOpenAddDialogEdit(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };
  const handleCloseAddDialogEdit = () => {
    setOpenAddDialogEdit(false);
  };

  const handleDeleteAll = async () => {
    if (selectedIds.length === 0) {
      Swal.fire("Warning", "No items selected to delete.", "warning");
      return;
    }

    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete all selected species!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    });

    if (confirmation.isConfirmed) {
      setLoading(true);
      try {
        await Promise.all(
          selectedIds.map((id) =>
            axios.delete(`${apiUrlVoucher}/${id}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
          )
        );
        Swal.fire("Success", "All selected deleted successfully!", "success");
        fetchData();
        setSelectedIds([]);
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Failed to delete . Please try again.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrlVoucher}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      Swal.fire("Success", "Delete successfully!", "success");
      fetchData();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to delele. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((itemId) => itemId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectedIds(isChecked ? dataList.map((item) => item._id) : []);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredDataList = dataList.filter((item) =>
    item.nameVoucher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedDataList = filteredDataList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ textTransform: "uppercase" }}>Vouchers Management</h2>
      </div>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onAdd={handleAdd}
        selectedIds={selectedIds}
        onDeleteAll={handleDeleteAll}
      />
      <DataTable
        dataList={paginatedDataList}
        selectedIds={selectedIds}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        onEdit={handleEdit}
        onDelete={handleDelete}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredDataList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddData
        fetchData={fetchData}
        accessToken={accessToken}
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        loading={loading}
        setLoading={setLoading}
      />
      <EditData
        editData={editData}
        fetchData={fetchData}
        idEdit={idEdit}
        accessToken={accessToken}
        open={openAddDialogEdit}
        onClose={handleCloseAddDialogEdit}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default VoucherAdminComp;
