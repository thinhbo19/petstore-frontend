import React, { useState, useEffect } from "react";
import "./Species.css";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../services/useSlice";
import axios from "axios";
import { apiUrlSpecies } from "../../../services/config";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddSpeciesForm from "./AddSpeciesForm";
import EditFormSpecies from "./EditFormSpecies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

const Species = ({ speciesList, fetchData }) => {
  const accessToken = useSelector(selectAccessToken);
  const [speciesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const Swal = require("sweetalert2");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenDialogEdit = (species) => {
    setOpenDialogEdit(true);
    setSelectedSpecies(species);
  };
  const handleCloseDialogEdit = () => setOpenDialogEdit(false);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredList(speciesList);
    } else {
      const filteredUsers = speciesList.filter((species) =>
        species.nameSpecies.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredList(filteredUsers);
    }
  }, [searchTerm, speciesList]);

  const deleteItem = async (sid) => {
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
      await axios.delete(`${apiUrlSpecies}/${sid}`, {
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
        selectedIds.map(async (sid) => {
          await axios.delete(`${apiUrlSpecies}/${sid}`, {
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

  const indexOfLastSpecies = currentPage * speciesPerPage;
  const indexOfFirstSpecies = indexOfLastSpecies - speciesPerPage;
  const currentSpecies = filteredList.slice(
    indexOfFirstSpecies,
    indexOfLastSpecies
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="Species maincontainer section" id="Species">
      <div className="species__container grip">
        <h2 className="section_title">Species Management</h2>
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
        <AddSpeciesForm
          open={openDialog}
          handleClose={handleCloseDialog}
          accessToken={accessToken}
          fetchData={fetchData}
        />
        <EditFormSpecies
          openEdit={openDialogEdit}
          handleCloseEdit={handleCloseDialogEdit}
          accessToken={accessToken}
          fetchData={fetchData}
          species={selectedSpecies}
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
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentSpecies.map((species, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    data-id={species._id}
                    onChange={handleSelect}
                  />{" "}
                </td>
                <td>{index + 1}</td>
                <td>{species.nameSpecies}</td>
                <td>
                  <FontAwesomeIcon
                    className="admin__icon"
                    onClick={() => handleOpenDialogEdit(species)}
                    icon={faPencil}
                  />
                  <FontAwesomeIcon
                    className="admin__icon"
                    onClick={() => deleteItem(species._id)}
                    icon={faTrash}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({
            length: Math.ceil(speciesList.length / speciesPerPage),
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

export default Species;
