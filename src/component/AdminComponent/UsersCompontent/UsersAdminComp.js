"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import { apiUrlSpecies, apiUrlUser } from "@/src/services/config";
import axios from "axios";
import SearchBar from "./SearchBar";
import TableData from "./TableData";
import TablePagination from "@mui/material/TablePagination";
import Swal from "sweetalert2";
import { getAllUsers } from "@/src/services/apiUser";
import CircularProgress from "@mui/material/CircularProgress";

const UsersAdminComp = () => {
  const accessToken = useSelector(selectAccessToken);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataList, setDataList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await getAllUsers();
      setDataList(res.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken, dataList]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
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
            axios({
              method: "DELETE",
              url: `${apiUrlUser}`,
              data: {
                uid: id,
              },
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
      await axios({
        method: "DELETE",
        url: `${apiUrlUser}`,
        data: {
          uid: id,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      Swal.fire("Success", "Delete successfully!", "success");
      fetchData();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to delete. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    setLoading(true);
    try {
      await axios.patch(
        `${apiUrlUser}/changeRole`,
        { userId: id, newRole: newRole },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Swal.fire("Success", "Successfully!", "success");
      fetchData();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockChange = async (userId, newBlockStatus) => {
    setLoading(true);
    try {
      await axios.patch(
        `${apiUrlUser}/adminUpdate`,
        { userId: userId, isBlocked: newBlockStatus },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Swal.fire("Success", "User block status updated!", "success");
      fetchData();
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "Failed to update user block status. Please try again.",
        "error"
      );
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

  const filteredDataList = dataList.filter(
    (item) =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedDataList = filteredDataList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ textTransform: "uppercase" }}>Users Management</h2>
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            selectedIds={selectedIds}
            onDeleteAll={handleDeleteAll}
          />
          <TableData
            dataList={paginatedDataList}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
            onDelete={handleDelete}
            page={page}
            rowsPerPage={rowsPerPage}
            onRoleChange={handleRoleChange}
            onBlockChange={handleBlockChange}
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
        </>
      )}
    </div>
  );
};

export default UsersAdminComp;
