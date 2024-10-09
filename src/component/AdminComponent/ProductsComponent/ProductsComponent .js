"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import { apiUrlPets, apiUrlProduct } from "@/src/services/config";
import axios from "axios";
import SearchBar from "./SearchBar";
import TableData from "./TableData";
import TablePagination from "@mui/material/TablePagination";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { getAllProduct } from "@/src/services/apiProduct";

const ProductsComponent = () => {
  const accessToken = useSelector(selectAccessToken);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [dataList, setDataList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Food");

  const fetchData = async () => {
    try {
      const res = await getAllProduct();
      setDataList(res.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken, selectedCategory]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleAdd = () => {
    router.push(`/dashboard/products/add`);
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/products/edit/${id}`);
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
            axios.delete(`${apiUrlProduct}/${id}`, {
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
      await axios.delete(`${apiUrlProduct}/${id}`, {
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

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };
  const filteredDataList = dataList
    .filter(
      (item) =>
        item.nameProduct.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.nameCate.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => item.category.nameCate === selectedCategory);

  const paginatedDataList = filteredDataList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ textTransform: "uppercase" }}>Products Management</h2>
      </div>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onAdd={handleAdd}
        selectedIds={selectedIds}
        onDeleteAll={handleDeleteAll}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
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

export default ProductsComponent;