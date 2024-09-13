"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Avatar,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/src/services/Redux/useSlice";
import { getCurrentUser, updateUserInfo } from "@/src/services/apiUser";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const accessToken = useSelector(selectAccessToken);
  const [userID, setUserID] = useState("");
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState(new Date());
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogImage, setDialogImage] = useState("");

  const fetchDataUser = async () => {
    if (accessToken) {
      const res = await getCurrentUser(accessToken);
      setUserID(res._id);
      setAvatar(res.Avatar);
      setUsername(res.username);
      setEmail(res.email);
      setMobile(res.mobile);
      setDob(new Date(res.date) || new Date());
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, [accessToken]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setAvatar(fileUrl);
      setAvatarFile(file);
    }
  };

  const handleSubmit = async (file) => {
    const formData = new FormData();
    if (file) {
      formData.append("Avatar", file);
    }
    formData.append("username", username);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("date", dob);

    setLoading(true);

    try {
      const res = await updateUserInfo(accessToken, formData, userID);
      console.log(res);

      Swal.fire({
        title: "Success!",
        text: "Updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update information.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    if (!isNaN(date.getTime())) {
      setDob(date);
    }
  };

  const formatDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime())
      ? date.toISOString().split("T")[0]
      : "";
  };

  const handleAvatarClick = () => {
    setDialogImage(avatar);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <Box sx={{ position: "relative", marginBottom: "2rem" }}>
        <Avatar
          src={avatar}
          alt="Profile Avatar"
          sx={{ width: 100, height: 100, margin: "auto", cursor: "pointer" }}
          onClick={handleAvatarClick}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          style={{ display: "none" }}
          id="avatar-upload"
        />
        <label htmlFor="avatar-upload">
          <IconButton
            component="span"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "white",
              border: "2px solid white",
              borderRadius: "50%",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CameraAltIcon />
          </IconButton>
        </label>
      </Box>

      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mobile"
        type="tel"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date of Birth"
        type="date"
        value={formatDate(dob)}
        onChange={handleDateChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "1rem" }}
        onClick={() => handleSubmit(avatarFile)}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </Button>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <img
            src={dialogImage}
            alt="Profile Avatar"
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
