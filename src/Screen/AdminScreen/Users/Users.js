import "./Users.css";
import React, { useState, useEffect } from "react";
import NoAvatar from "../../../assets/avartar.jpg";
import { getAllUsers, patchIsBlockedUser } from "../../../services/appiUser";
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
import axios from "axios";
import { apiUrlBreeds } from "../../../services/config";

const Users = () => {
  const [userList, setUserList] = useState([]);
  const accessToken = useSelector(selectAccessToken);
  const [PerPage] = useState(5);
  const Swal = require("sweetalert2");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const fetchData = async () => {
    try {
      const userData = await getAllUsers(accessToken);
      setUserList(userData);
    } catch (error) {}
  };

  const handleChangeIsBlocked = async (userId, currentStatus) => {
    try {
      const updatedUser = await patchIsBlockedUser(
        accessToken,
        userId,
        currentStatus
      );

      const updatedUserList = userList.map((user) =>
        user._id === userId ? { ...user, isBlocked: !currentStatus } : user
      );
      setUserList(updatedUserList);
      Swal.fire("Success", "User status updated successfully", "success");
    } catch (error) {
      console.error("Error updating user status:", error);
      Swal.fire("Error", "Failed to update user status", "error");
    }
  };

  const indexOfLastSpecies = currentPage * PerPage;
  const indexOfFirstSpecies = indexOfLastSpecies - PerPage;
  const currentUser = userList.slice(indexOfFirstSpecies, indexOfLastSpecies);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="Users maincontainer section" id="Users">
      <div className="Users__container grip">
        <h2 className="section_title">Users</h2>
        <div className="action__from">
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab
              color="primary"
              aria-label="add"
              // onClick={handleOpenDialog}
            >
              <AddIcon />
            </Fab>
          </Box>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            {/* {selectedIds.length >= 2 && (
              <Fab color="primary" aria-label="delete" onClick={deleteManyItem}>
                <DeleteIcon />
              </Fab>
            )} */}
          </Box>
        </div>

        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  // checked={selectAll}
                  // onChange={handleSelectAll}
                />
              </th>
              <th>ID</th>
              <th>Avatar</th>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Block</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUser.map((users, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    data-id={users._id}
                    // onChange={handleSelect}
                  />
                </td>
                <td>{index + 1}</td>
                <td className="img__field">
                  {users.Avatar ? (
                    <img className="img__td" src={users.Avatar} alt="img" />
                  ) : (
                    "No Avatar"
                  )}
                </td>
                <td>{users.username}</td>
                <td>{users.email}</td>
                <td>{users.mobile}</td>
                <td>
                  <input
                    type="checkbox"
                    className="round-checkbox-role"
                    checked={users.role}
                    onChange={() =>
                      handleChangeIsBlocked(users._id, users.isBlocked)
                    }
                  />
                </td>
                <td>
                  {users.role === "Admin" ? (
                    <></>
                  ) : (
                    <input
                      type="checkbox"
                      className="round-checkbox"
                      checked={users.isBlocked}
                      onChange={() =>
                        handleChangeIsBlocked(users._id, users.isBlocked)
                      }
                    />
                  )}
                </td>

                <td>
                  <FontAwesomeIcon
                    className="admin__icon"
                    // onClick={() => deleteItem(breeds._id)}
                    icon={faTrash}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({
            length: Math.ceil(userList.length / PerPage),
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

export default Users;
