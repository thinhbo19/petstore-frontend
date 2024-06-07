import "./Breeds.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../services/useSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import axios from "axios";
import { apiUrlBreeds } from "../../../services/config";

const Breeds = ({ speciesList, breedList, fetchData }) => {
  const [filteredUserList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const accessToken = useSelector(selectAccessToken);
  const [PerPage] = useState(5);
  const Swal = require("sweetalert2");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenDialogEdit = (breeds) => {
    setOpenDialogEdit(true);
    setSelected(breeds);
  };
  const handleCloseDialogEdit = () => setOpenDialogEdit(false);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredList(breedList);
    } else {
      const filteredBreeds = breedList.filter(
        (breed) =>
          breed.nameBreed.toLowerCase().includes(searchTerm.toLowerCase()) ||
          breed.petSpecies.nameSpecies
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredList(filteredBreeds);
    }
  }, [searchTerm, breedList]);

  const deleteItem = async (bid) => {
    const confirmResult = await Swal.fire({
      text: "You want to delete?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (!confirmResult.isConfirmed) {
      return;
    }
    try {
      await axios.delete(`${apiUrlBreeds}/${bid}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      Swal.fire({
        icon: "success",
        text: "Delete successfully",
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteManyItem = async () => {
    if (selectedIds.length === 0) {
      Swal.fire({
        icon: "warning",
        text: "Please select items to delete",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      text: "You want to delete selected items?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    try {
      await Promise.all(
        selectedIds.map(async (bid) => {
          await axios.delete(`${apiUrlBreeds}/${bid}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        })
      );

      Swal.fire({
        icon: "success",
        text: "Delete successfully",
      });
      setSelectedIds([]);
      setSelectAll(false);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelect = (event) => {
    const id = event.target.getAttribute("data-id");
    const isChecked = event.target.checked;
    let newSelectedIds = [...selectedIds];

    if (isChecked) {
      newSelectedIds.push(id);
    } else {
      newSelectedIds = newSelectedIds.filter((selectedId) => selectedId !== id);
    }
    setSelectedIds(newSelectedIds);
  };
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const ids = [];
    const checkboxes = document.querySelectorAll(
      "tbody input[type='checkbox']"
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
      ids.push(checkbox.getAttribute("data-id"));
    });
    setSelectedIds(isChecked ? ids : []);
  };

  const indexOfLastSpecies = currentPage * PerPage;
  const indexOfFirstSpecies = indexOfLastSpecies - PerPage;
  const currentSpecies = filteredUserList.slice(
    indexOfFirstSpecies,
    indexOfLastSpecies
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="Breeds maincontainer section" id="Breeds">
      <div className="breeds__container ">
        <h2 className="section_title">Breeds Management</h2>
        <div className="action__from">
          <Box
            sx={{
              "& > :not(style)": { m: 2, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              sx={{ flexGrow: 1 }}
            />
          </Box>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab color="primary" aria-label="add" onClick={handleOpenDialog}>
              <AddIcon />
            </Fab>
          </Box>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            {selectedIds.length >= 2 && (
              <Fab color="primary" aria-label="delete" onClick={deleteManyItem}>
                <DeleteIcon />
              </Fab>
            )}
          </Box>
        </div>
        <AddForm
          open={openDialog}
          handleClose={handleCloseDialog}
          accessToken={accessToken}
          fetchData={fetchData}
          speciesList={speciesList}
        />
        <EditForm
          openEdit={openDialogEdit}
          handleCloseEdit={handleCloseDialogEdit}
          accessToken={accessToken}
          fetchData={fetchData}
          breeds={selected}
        />
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th>ID</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Species</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentSpecies.map((breeds, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    data-id={breeds._id}
                    onChange={handleSelect}
                  />
                </td>
                <td>{index + 1}</td>
                <td className="img__field">
                  <img className="img__td" src={breeds.imgBreed} alt="img" />
                </td>
                <td>{breeds.nameBreed}</td>
                <td>{breeds.petSpecies.nameSpecies}</td>
                <td>
                  <FontAwesomeIcon
                    className="admin__icon"
                    onClick={() => handleOpenDialogEdit(breeds)}
                    icon={faPencil}
                  />
                  <FontAwesomeIcon
                    className="admin__icon"
                    onClick={() => deleteItem(breeds._id)}
                    icon={faTrash}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({
            length: Math.ceil(breedList.length / PerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Breeds;
