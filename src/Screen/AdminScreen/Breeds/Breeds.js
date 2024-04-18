import React, { useState, useEffect } from "react";
import "./Breeds.css";
import { getAllBreeds, getAllSpecies } from "../../../services/api";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../services/useSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddForm from "./AddForm";
import EditForm from "./EditForm";

const Breeds = () => {
  const [breedList, setBreedList] = useState([]);
  const accessToken = useSelector(selectAccessToken);
  const [speciesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const Swal = require("sweetalert2");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenDialogEdit = (species) => {
    setOpenDialogEdit(true);
  };
  const handleCloseDialogEdit = () => setOpenDialogEdit(false);

  useEffect(() => {
    fetchData();
  }, [accessToken]);
  const fetchData = async () => {
    try {
      const breedData = await getAllBreeds(accessToken);
      const speciesData = await getAllSpecies(accessToken);
      const breedWithSpeciesName = breedData.map((breed) => {
        const matchedSpecies = speciesData.find(
          (species) => species._id === breed.species
        );
        if (matchedSpecies) {
          return {
            ...breed,
            speciesName: matchedSpecies.nameSpecies,
          };
        }
        return breed;
      });
      setBreedList(breedWithSpeciesName.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastSpecies = currentPage * speciesPerPage;
  const indexOfFirstSpecies = indexOfLastSpecies - speciesPerPage;
  const currentSpecies = breedList.slice(
    indexOfFirstSpecies,
    indexOfLastSpecies
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="Breeds maincontainer section" id="Breeds">
      <div className="breeds__container">
        <h2 className="section_title">Breeds Management</h2>
        <div className="action__from">
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab color="primary" aria-label="add" onClick={handleOpenDialog}>
              <AddIcon />
            </Fab>
          </Box>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            {/* {selectedIds.length >= 2 && ( */}
            <Fab color="primary" aria-label="delete">
              <DeleteIcon />
            </Fab>
            {/* )} */}
          </Box>
        </div>
        <AddForm
          open={openDialog}
          handleClose={handleCloseDialog}
          accessToken={accessToken}
          fetchData={fetchData}
        />
        <EditForm
          openEdit={openDialogEdit}
          handleCloseEdit={handleCloseDialogEdit}
          accessToken={accessToken}
          fetchData={fetchData}
        />
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Species</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentSpecies.map((breeds, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{index + 1}</td>
                <td>{breeds.nameBreed}</td>
                <td>{breeds.speciesName}</td>
                <td>
                  <FontAwesomeIcon
                    className="admin__icon"
                    // onClick={() => handleOpenDialogEdit(species)}
                    icon={faPencil}
                  />
                  <FontAwesomeIcon
                    className="admin__icon"
                    // onClick={() => deleteItem(species._id)}
                    icon={faTrash}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({
            length: Math.ceil(breedList.length / speciesPerPage),
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
