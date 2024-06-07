import React, { useState, useEffect } from "react";
import "./Pets.css";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../services/useSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddForm from "./AddForm";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrlPets } from "../../../services/config";

const Pets = ({ breedList, pettList, fetchData }) => {
  const [PerPage] = useState(5);
  const accessToken = useSelector(selectAccessToken);
  const Swal = require("sweetalert2");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  useEffect(() => {
    if (!searchTerm) {
      setFilteredList(pettList);
    } else {
      const filtered = pettList.filter(
        (pet) =>
          pet.namePet.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.petBreed.nameBreed
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          pet.petBreed.nameSpecies
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredList(filtered);
    }
    fetchData();
  }, [searchTerm, pettList]);

  const indexOfLastSpecies = currentPage * PerPage;
  const indexOfFirstSpecies = indexOfLastSpecies - PerPage;
  const current = filteredList.slice(indexOfFirstSpecies, indexOfLastSpecies);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteItem = async (pid) => {
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
      await axios.delete(`${apiUrlPets}/${pid}`, {
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
        selectedIds.map(async (pid) => {
          await axios.delete(`${apiUrlPets}/${pid}`, {
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
  return (
    <section className="Pets maincontainer section" id="Pets">
      <div className="pets__container">
        <h2 className="section_title">Pets</h2>
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
          breedList={breedList}
          fetchData={fetchData}
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
              <th>Breed</th>
              <th>Species</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {current.map((pets, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    data-id={pets._id}
                    onChange={handleSelect}
                  />
                </td>
                <td>{index + 1}</td>
                <td className="img__field">
                  <img className="img__td" src={pets.imgPet[0]} alt="img" />
                </td>
                <td>{pets.namePet}</td>
                <td>{pets.petBreed.nameBreed}</td>
                <td>{pets.petBreed.nameSpecies}</td>
                <td>{pets.age}</td>
                <td>{pets.gender}</td>
                <td>{pets.price.toLocaleString()}</td>
                <td>{pets.sold ? "Sold" : "Still for sale"}</td>
                <td>
                  <Link to={`/edit/${pets._id}`}>
                    <FontAwesomeIcon className="admin__icon" icon={faPencil} />
                  </Link>
                  <FontAwesomeIcon
                    className="admin__icon"
                    onClick={() => deleteItem(pets._id)}
                    icon={faTrash}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({
            length: Math.ceil(pettList.length / PerPage),
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

export default Pets;
