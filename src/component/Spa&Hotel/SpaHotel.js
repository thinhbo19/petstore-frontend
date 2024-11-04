import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import SpaIcon from "@mui/icons-material/Spa";
import BedIcon from "@mui/icons-material/Bed";
import Image from "next/image";

export function Spa({ spas }) {
  const [expandedService, setExpandedService] = useState(null);

  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petGender, setPetGender] = useState("");
  const [deworming, setDeworming] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [selectedSpas, setSelectedSpas] = useState([]);
  const [bookingDate, setBookingDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState("");
  const [publicPrice, setPublicPrice] = useState("");
  const [image, setImage] = useState([]);

  const handleSpasChange = (event) => {
    setSelectedSpas(event.target.value);
    calculateTotalPrice(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImage(files);
  };

  const calculateTotalPrice = (selectedSpas) => {
    const price = selectedSpas.reduce((total, spaId) => {
      const spa = spas.find((spa) => spa._id === spaId);
      return total + (spa ? spa.price : 0);
    }, 0);
    setTotalPrice(price);
    setPublicPrice(price.toLocaleString("vi"));
  };

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* info */}
      <Box sx={{ flex: "1" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SpaIcon
            sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" } }}
          />
          <Typography
            component="h1"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            SPA SERVICES
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" },
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.4)",
            color: "#6C6969",
            mt: 1,
          }}
        >
          Treat your pet to a luxurious spa day! Our professional groomers
          provide top-notch services to keep your furry friend looking and
          feeling their best.
        </Typography>
        {/* data spa */}
        <Box sx={{ flex: "1" }}>
          {spas.map((spa, index) => (
            <Box
              key={index}
              sx={{ margin: "10px 0", width: { xs: "100%", md: "80%" } }}
            >
              <Button
                onClick={() => toggleService(index)}
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  backgroundColor: expandedService === index ? "#ccc" : "#fff",
                  border: "1px solid #6C6969",
                  borderRadius: "8px",
                  padding: "10px",
                  color: "black",
                  textAlign: "left",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: { xs: "0.8rem", sm: "1.2rem" },
                  }}
                >
                  {spa.nameService}
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "0.6rem", sm: "1rem" },
                      marginLeft: "10px",
                      color: "red",
                    }}
                  >
                    ({spa.price.toLocaleString("vi")} VNĐ)
                  </Typography>
                </Typography>
                <Typography>{expandedService === index ? "▲" : "▼"}</Typography>
              </Button>
              {expandedService === index && (
                <Typography
                  sx={{
                    marginTop: "5px",
                    padding: "0 10px",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                  }}
                  dangerouslySetInnerHTML={{ __html: spa.description }}
                />
              )}
            </Box>
          ))}
        </Box>{" "}
      </Box>
      {/* spa form */}
      <Box
        component="form"
        sx={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 3,
          margin: "auto",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
        >
          Book a Spa Service for Your Pet
        </Typography>

        <TextField
          label="Pet Name"
          variant="outlined"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          required
        />

        {image.length > 0 && (
          <Box sx={{ marginTop: 2, display: "flex", flexWrap: "wrap" }}>
            {image.map((image, index) => (
              <Box key={index} sx={{ margin: 1 }}>
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Image preview ${index}`}
                  width={100}
                  height={100}
                />
              </Box>
            ))}
          </Box>
        )}

        <Button variant="contained" component="label">
          Upload Pet Image
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </Button>

        <TextField
          label="Breed"
          variant="outlined"
          value={petBreed}
          onChange={(e) => setPetBreed(e.target.value)}
          required
        />

        <TextField
          label="Age"
          variant="outlined"
          type="number"
          value={petAge}
          onChange={(e) => setPetAge(e.target.value)}
          required
        />

        <FormControl variant="outlined" fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            label="Gender"
            value={petGender}
            onChange={(e) => setPetGender(e.target.value)}
            required
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Deworming (months)"
          variant="outlined"
          type="number"
          value={deworming}
          onChange={(e) => setDeworming(e.target.value)}
        />

        <TextField
          label="Vaccination (months)"
          variant="outlined"
          type="number"
          value={vaccination}
          onChange={(e) => setVaccination(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Services</InputLabel>
          <Select
            label="Services"
            multiple
            value={selectedSpas}
            onChange={handleSpasChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected
                .map(
                  (spaId) => spas.find((spa) => spa._id === spaId)?.nameService
                )
                .join(", ")
            }
          >
            {spas.map((spa) => (
              <MenuItem key={spa._id} value={spa._id}>
                <Checkbox checked={selectedSpas.includes(spa._id)} />
                <ListItemText
                  primary={`${spa.nameService} (${spa.price.toLocaleString(
                    "vi"
                  )} VNĐ)`}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Booking Date"
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Total Price (VNĐ)"
          variant="outlined"
          type="number"
          value={publicPrice}
          InputProps={{ readOnly: true }}
        />

        <Button variant="contained" color="primary" type="submit">
          Confirm Booking
        </Button>
      </Box>
    </Box>
  );
}

export function Hotel({ hotels }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box sx={{ flex: "1" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BedIcon
            sx={{ fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}
          />
          <Typography
            component="h1"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            HOTEL SERVICES
          </Typography>
        </Box>
      </Box>
      <Box sx={{ flex: "1" }}>ad</Box>
    </Box>
  );
}
