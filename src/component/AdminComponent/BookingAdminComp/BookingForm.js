import { selectUid } from "@/src/services/Redux/useSlice";
import {
  Box,
  Button,
  Dialog,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormControlLabel,
  CircularProgress,
  TextField,
  MenuItem,
  Checkbox,
  Select,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Autocomplete,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import VNPayImg from "../../../../public/VNpay.png";
import Swal from "sweetalert2";
import axios from "axios";
import Pay from "../../Pay/Pay";
import CloseIcon from "@mui/icons-material/Close";
import { apiUrlBooking } from "@/src/services/config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
        // router.push(`/booking-detail/${response.data.data._id}`);
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
        // router.push(`/booking-detail/${res.data.data._id}`);
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

const BookingForm = ({ type, open, onClose, spas, hotels, users }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      fullScreen
      onClose={handleClose}
      open={open}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Close
          </Typography>
        </Toolbar>
      </AppBar>
      {type === "Hotel Booking" ? (
        <Hotel hotels={hotels} users={users} />
      ) : (
        <Spa spas={spas} users={users} />
      )}
    </Dialog>
  );
};

export default BookingForm;

export function Spa({ spas, users }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petGender, setPetGender] = useState("");
  const [deworming, setDeworming] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [selectedSpas, setSelectedSpas] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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
      const spa = spas?.find((spa) => spa._id === spaId);
      return total + (spa ? spa.price : 0);
    }, 0);
    setTotalPrice(price);
    setPublicPrice(price);
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
      component="form"
      sx={{
        width: "60%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 5,
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

      <Autocomplete
        options={users}
        getOptionLabel={(user) => user.username}
        filterOptions={(options, state) =>
          options.filter((user) =>
            user.username.toLowerCase().includes(state.inputValue.toLowerCase())
          )
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search user"
            variant="outlined"
            fullWidth
          />
        )}
        onChange={(event, value) => setSelectedUser(value._id)}
      />
      <TextField
        label="Deworming (time)"
        variant="outlined"
        type="number"
        value={deworming}
        onChange={(e) => setDeworming(e.target.value)}
      />
      <TextField
        label="Vaccination (time)"
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
                  (spaId) => spas?.find((spa) => spa._id === spaId)?.nameService
                )
                .join(",\n")}
            </div>
          )}
        >
          {spas?.map((spa) => (
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
              selectedUser,
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
              selectedUser,
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
                selectedUser,
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
  );
}

export function Hotel({ hotels, users }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petGender, setPetGender] = useState("");
  const [deworming, setDeworming] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [selectedSpas, setSelectedSpas] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [Note, setNote] = useState("");
  const [bookingDate, setBookingDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState("");
  const [publicPrice, setPublicPrice] = useState("");
  const [image, setImage] = useState([]);
  console.log(selectedUser);
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
      const spa = hotels?.find((hot) => hot._id === spaId);
      return total + (spa ? spa.price : 0);
    }, 0);
    setTotalPrice(price);
    setPublicPrice(price);
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
        display: "flex",
        flexDirection: "column",
        padding: 3,
        width: "60%",
        gap: 2,
        margin: "auto",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
      >
        Book a Hotel For Your Pet
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
      <Autocomplete
        options={users}
        getOptionLabel={(user) => user.username}
        filterOptions={(options, state) =>
          options.filter((user) =>
            user.username.toLowerCase().includes(state.inputValue.toLowerCase())
          )
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search user"
            variant="outlined"
            fullWidth
          />
        )}
        onChange={(event, value) => setSelectedUser(value._id)}
      />

      <TextField
        label="Deworming (time)"
        variant="outlined"
        type="number"
        value={deworming}
        onChange={(e) => setDeworming(e.target.value)}
      />
      <TextField
        label="Vaccination (time)"
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
                    hotels?.find((hot) => hot._id === spaId)?.nameService
                )
                .join(",\n")}
            </div>
          )}
        >
          {hotels?.map((hot) => (
            <MenuItem key={hot._id} value={hot._id}>
              <Checkbox checked={selectedSpas.includes(hot._id)} />
              <ListItemText
                primary={`${hot.nameService} (${hot.price.toLocaleString(
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
              selectedUser,
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
              selectedUser,
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
                selectedUser,
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
  );
}
