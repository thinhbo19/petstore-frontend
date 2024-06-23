import "./Users.css";
import React, { useState, useEffect } from "react";
import { patchChangeRole, patchIsBlockedUser } from "../../../services/apiUser";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../services/useSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { apiUrlUser } from "../../../services/config";

const Users = ({ userList, setUserList, fetchData }) => {
  const accessToken = useSelector(selectAccessToken);
  const [PerPage] = useState(5);
  const Swal = require("sweetalert2");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUserList(userList);
    } else {
      const filteredUsers = userList.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUserList(filteredUsers);
    }
    fetchData();
  }, [searchTerm, userList, filteredUserList]);

  const handleChangeIsBlocked = async (userId, currentStatus) => {
    try {
      await patchIsBlockedUser(accessToken, userId, currentStatus);
      const updatedUserList = userList.map((user) =>
        user._id === userId ? { ...user, isBlocked: !currentStatus } : user
      );
      setUserList(updatedUserList);

      fetchData();
      Swal.fire("Success", "User status updated successfully", "success");
    } catch (error) {
      console.error("Error updating user status:", error);
      Swal.fire("Error", "Failed to update user status", "error");
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await patchChangeRole(accessToken, userId, newRole);
      fetchData();
      Swal.fire("Success", "Change role user successfully", "success");
    } catch (error) {
      console.error("Error updating user role:", error);
      Swal.fire("Error", "Failed to update user role", "error");
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
  const deleteItem = async (uid) => {
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
      await axios.delete(`${apiUrlUser}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { uid: uid },
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
        selectedIds.map(async (uid) => {
          await axios.delete(`${apiUrlUser}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            data: { uid: uid },
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

  const indexOfLastSpecies = currentPage * PerPage;
  const indexOfFirstSpecies = indexOfLastSpecies - PerPage;
  const currentUser = filteredUserList.slice(
    indexOfFirstSpecies,
    indexOfLastSpecies
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="Users maincontainer section" id="Users">
      <div className="Users__container grip">
        <h2 className="section_title">Users</h2>
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
            {selectedIds.length >= 2 && (
              <Fab color="primary" aria-label="delete" onClick={deleteManyItem}>
                <DeleteIcon />
              </Fab>
            )}
          </Box>
        </div>

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
                    onChange={handleSelect}
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
                  <select
                    onChange={(event) =>
                      handleChangeRole(users._id, event.target.value)
                    }
                    name="userRole"
                    value={users.role}
                    id="userRole"
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="CSD">CSD</option>
                  </select>
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
                    onClick={() => deleteItem(users._id)}
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
