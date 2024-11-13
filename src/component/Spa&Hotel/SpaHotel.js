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
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import SpaIcon from "@mui/icons-material/Spa";
import BedIcon from "@mui/icons-material/Bed";
import Image from "next/image";
import Pay from "../Pay/Pay";
import VNPayImg from "../../../public/VNpay.png";
import { selectUid } from "@/src/services/Redux/useSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import { apiUrlBooking } from "@/src/services/config";

const handlePayOCD = async (
  setLoading,
  router,
  user,
  pet,
  image,
  services,
  Note,
  bookingDate,
  totalPrice,
  paymentMethod
) => {
  try {
    setLoading(true);
    const formData = new FormData();

    formData.append("user", user);
    formData.append("pet[name]", pet.name);
    formData.append("pet[breed]", pet.breed);
    formData.append("pet[age]", pet.age);
    formData.append("pet[gender]", pet.gender);
    formData.append("pet[deworming]", pet.deworming);
    formData.append("pet[vaccination]", pet.vaccination);
    formData.append("Note", Note);
    formData.append("bookingDate", bookingDate);
    formData.append("totalPrice", totalPrice);
    formData.append("paymentMethod", paymentMethod);

    services.forEach((serviceId) => {
      formData.append("services", serviceId);
    });

    image.forEach((img) => {
      formData.append("images", img);
    });

    const response = await axios.post(`${apiUrlBooking}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.success) {
      Swal.fire({
        title: "Successfully!",
        text: "You have successfully placed your order!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        router.push(`/booking-detail/${response.data.data._id}`);
      });
    } else {
      Swal.fire({
        title: "Failed",
        text: response.data.message || "Something went wrong.",
        icon: "error",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: error.response?.data?.message || "Server error occurred.",
      icon: "error",
    });
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};

const handlePayPal = async (
  setLoading,
  router,
  user,
  pet,
  image,
  services,
  Note,
  bookingDate,
  totalPrice,
  paymentMethod
) => {
  setLoading(true);
  try {
    const formData = new FormData();

    formData.append("user", user);
    formData.append("pet[name]", pet.name);
    formData.append("pet[breed]", pet.breed);
    formData.append("pet[age]", pet.age);
    formData.append("pet[gender]", pet.gender);
    formData.append("pet[deworming]", pet.deworming);
    formData.append("pet[vaccination]", pet.vaccination);
    formData.append("Note", Note);
    formData.append("bookingDate", bookingDate);
    formData.append("totalPrice", totalPrice);
    formData.append("paymentMethod", paymentMethod);

    services.forEach((serviceId) => {
      formData.append("services", serviceId);
    });

    image.forEach((img) => {
      formData.append("images", img);
    });

    const res = await axios.post(`${apiUrlBooking}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      Swal.fire({
        title: "Successfully!",
        text: "You have successfully placed your order.!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        router.push(`/booking-detail/${res.data.data._id}`);
      });
    } else {
      Swal.fire({
        title: "Failed",
        icon: "error",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const handleVNPay = async (
  setLoading,
  router,
  user,
  pet,
  image,
  services,
  Note,
  bookingDate,
  totalPrice,
  paymentMethod,
  accessToken
) => {
  setLoading(true);
  try {
    const formData = new FormData();

    formData.append("user", user);
    formData.append("pet[name]", pet.name);
    formData.append("pet[breed]", pet.breed);
    formData.append("pet[age]", pet.age);
    formData.append("pet[gender]", pet.gender);
    formData.append("pet[deworming]", pet.deworming);
    formData.append("pet[vaccination]", pet.vaccination);
    formData.append("Note", Note);
    formData.append("bookingDate", bookingDate);
    formData.append("totalPrice", totalPrice);
    formData.append("paymentMethod", paymentMethod);
    formData.append("bankCode", "NCB");

    services.forEach((serviceId) => {
      formData.append("services", serviceId);
    });

    image.forEach((img) => {
      formData.append("images", img);
    });

    const res = await axios.post(`${apiUrlBooking}/createUrl`, formData, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    router.push(res.data.paymentUrl);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export function Spa({ spas }) {
  const [expandedService, setExpandedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const uid = useSelector(selectUid);
  const router = useRouter();

  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petGender, setPetGender] = useState("");
  const [deworming, setDeworming] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [selectedSpas, setSelectedSpas] = useState([]);
  const [Note, setNote] = useState("");
  const [bookingDate, setBookingDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState("");
  const [publicPrice, setPublicPrice] = useState("");
  const [image, setImage] = useState([]);

  const pet = {
    name: petName,
    breed: petBreed,
    age: petAge,
    gender: petGender,
    deworming: deworming,
    vaccination: vaccination,
  };

  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [onlinePayment, setOnlinePayment] = useState(false);

  const handleCashOnDeliveryChange = (event) => {
    setCashOnDelivery(event.target.checked);
    if (event.target.checked) {
      setOnlinePayment(false);
    }
  };

  const handleOnlinePaymentChange = (event) => {
    setOnlinePayment(event.target.checked);
    if (event.target.checked) {
      setCashOnDelivery(false);
    }
  };

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
    setPublicPrice(price);
  };

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

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
            renderValue={(selected) => (
              <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {selected
                  .map(
                    (spaId) =>
                      spas.find((spa) => spa._id === spaId)?.nameService
                  )
                  .join(",\n")}
              </div>
            )}
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
        <TextField
          label="Note"
          variant="outlined"
          type="text"
          value={Note}
          onChange={(e) => setNote(e.target.value)}
        />

        <Typography variant="h5" gutterBottom>
          Payment Method
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={cashOnDelivery}
              onChange={handleCashOnDeliveryChange}
            />
          }
          label="Payment upon receipt"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={onlinePayment}
              onChange={handleOnlinePaymentChange}
            />
          }
          label="Electronic payment"
        />
        {cashOnDelivery && (
          <Button
            onClick={() =>
              handlePayOCD(
                setLoading,
                router,
                uid,
                pet,
                image,
                selectedSpas,
                Note,
                bookingDate,
                totalPrice,
                "PaymentDelivery"
              )
            }
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
          >
            Confirm Booking
          </Button>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mt: 2,
            justifyContent: { xs: "center", md: "left" },
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Pay
            isElectronicEnabled={onlinePayment}
            paymentSuccess={() =>
              handlePayPal(
                setLoading,
                router,
                uid,
                pet,
                image,
                selectedSpas,
                Note,
                bookingDate,
                totalPrice,
                "PayPal"
              )
            }
            amount={Math.round(totalPrice / 25000)}
            currency={"USD"}
          />
          {onlinePayment && (
            <Box
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              onClick={() =>
                handleVNPay(
                  setLoading,
                  router,
                  uid,
                  pet,
                  image,
                  selectedSpas,
                  Note,
                  bookingDate,
                  totalPrice,
                  "VNPay"
                )
              }
            >
              <Image src={VNPayImg} width={120} height={50} alt="VNPay" />
            </Box>
          )}
        </Box>
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
