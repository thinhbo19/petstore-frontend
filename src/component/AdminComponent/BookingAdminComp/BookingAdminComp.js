"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import { apiUrlBooking } from "@/src/services/config";
import axios from "axios";
import SearchBar from "./SearchBar";
import TableData from "./TableData";
import TablePagination from "@mui/material/TablePagination";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/toast.css";
import { Box, CircularProgress } from "@mui/material";
import { getAllBooking } from "@/src/services/apiBooking";
import BookingForm from "./BookingForm";
import { getAllUsers } from "@/src/services/apiUser";

const BookingAdminComp = ({ spas, hotels }) => {
  const accessToken = useSelector(selectAccessToken);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [dataList, setDataList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [openService, setOpenService] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getAllBooking();
      const resUsers = await getAllUsers(accessToken);
      const Users = resUsers.filter((user) => user.role === "User");

      setDataList(res.reverse());
      setUsers(Users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken, selectedStatus]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/booking/${id}`);
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
            axios.delete(`${apiUrlBooking}/${id}`, {
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
      await axios.delete(`${apiUrlBooking}/${id}`, {
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
    setSelectedIds(isChecked ? filteredDataList.map((item) => item._id) : []);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeStatus = async (oid, status) => {
    setLoading(true);
    try {
      await axios.put(
        `${apiUrlBooking}/status/${oid}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      fetchData();
      toast.success(`${status} successfully`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenService = (type) => {
    setOpenService(type);
  };

  const handleCloseService = () => {
    setOpenService(null);
  };

  const filteredDataList = dataList.filter((item) => {
    const matchesSearchTerm =
      item._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;

    return matchesSearchTerm && matchesStatus;
  });

  const paginatedDataList = filteredDataList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ textTransform: "uppercase" }}>Booking Management</h2>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast-container"
      />
      {openService && (
        <BookingForm
          type={openService}
          open={!!openService}
          onClose={handleCloseService}
          users={users}
          spas={spas}
          hotels={hotels}
        />
      )}

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedIds={selectedIds}
        onDeleteAll={handleDeleteAll}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        handleOpenService={handleOpenService}
      />
      <TableData
        dataList={paginatedDataList}
        selectedIds={selectedIds}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        onEdit={handleEdit}
        onDelete={handleDelete}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangeStatus={handleChangeStatus}
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
    </div>
  );
};

export default BookingAdminComp;
