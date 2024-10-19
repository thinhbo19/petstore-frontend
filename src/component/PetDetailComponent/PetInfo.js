import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper as TablePaper,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState } from "react";
import { getFavorites } from "@/src/services/apiUser";
import axios from "axios";
import { apiUrlUser } from "@/src/services/config";
import {
  addFavorite,
  removeFavorite,
} from "@/src/services/Redux/FavoriteSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addCart } from "@/src/services/Redux/CartSlice";
import { generateSlug } from "@/src/services/slugifyConfig";

function isFavorite(product, favorites) {
  return favorites.some((favorite) => favorite.petID === product._id);
}

const PetInfo = ({ petData, accessToken }) => {
  const [mainImage, setMainImage] = useState(petData.imgPet[0]);
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const res = await getFavorites(accessToken);
          setFavorites(res?.favorites);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [accessToken]);

  const handleLikeClick = async () => {
    if (!accessToken) {
      Swal.fire({
        title: "LOGIN",
        text: "You are not logged in yet!!!",
        icon: "warning",
      });
    } else {
      setLoading(true);
      const isCurrentlyFavorite = isFavorite(petData, favorites);
      const updatedFavorites = isCurrentlyFavorite
        ? favorites.filter((f) => f.petID !== petData._id)
        : [...favorites, { petID: petData._id, ...petData }];

      setFavorites(updatedFavorites);
      try {
        const res = await axios.put(
          `${apiUrlUser}/favoritePet`,
          {
            petID: petData._id,
            imgPet: petData.imgPet[0],
            namePet: petData.namePet,
            nameBreed: petData.petBreed.nameBreed,
            nameSpecies: petData.petBreed.nameSpecies,
            age: petData.age,
            gender: petData.gender,
            price: petData.price,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (
          res.data.message ===
          "The pet has been successfully removed from your favorite list"
        ) {
          dispatch(removeFavorite(petData._id));
          toast.success(res.data.message);
        } else {
          dispatch(addFavorite(petData));
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCart = async () => {
    if (!accessToken) {
      Swal.fire({
        title: "LOGIN",
        text: "You are not logged in yet!!!",
        icon: "warning",
      });
    } else {
      setLoading(true);
      try {
        const res = await axios.put(
          `${apiUrlUser}/cart`,
          {
            id: petData._id,
            quantity: quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const item = res.data.cart;
        dispatch(
          addCart({
            id: item.id,
            info: item.info,
            quantity: item.quantity,
            newPrice: item.newPrice,
            images: item.images,
          })
        );
        toast.success(res.data.message);
        setQuantity(1);
      } catch (error) {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) =>
      prevQuantity < petData.quantity ? prevQuantity + 1 : prevQuantity
    );
  };
  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <Paper
      elevation={8}
      sx={{ padding: 3, marginBottom: 4, position: "relative" }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast-container"
      />
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "50%",
            zIndex: "1000",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Grid container spacing={4}>
        {/* Left side: images */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                gap: 2,
                overflowX: "auto",
                mb: 2,
                maxWidth: { xs: "100%", md: "100px" },
              }}
            >
              {petData.imgPet.map((image, index) => (
                <IconButton
                  key={index}
                  onClick={() => handleImageClick(image)}
                  sx={{
                    padding: 0,
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  <Image
                    src={image}
                    alt={petData.name}
                    width={100}
                    height={100}
                    style={{ borderRadius: "8px", cursor: "pointer" }}
                  />
                </IconButton>
              ))}
            </Box>
            <Box
              sx={{
                flex: 1,
                position: "relative",
                width: "100%",
                height: 0,
                paddingBottom: "100%",
              }}
            >
              <Image
                src={mainImage}
                alt={petData.namePet}
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: "8px" }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Right side: pet information */}
        <Grid item xs={12} md={6}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "1.2rem",
                sm: "1.4rem",
                md: "1.6rem",
                lg: "2rem",
              },
              textAlign: {
                xs: "center",
                sm: "center",
                md: "left",
                lg: "left",
              },
            }}
            variant="h3"
            gutterBottom
          >
            {petData.namePet}
          </Typography>
          <Divider></Divider>
          <Typography
            sx={{
              fontSize: {
                xs: "1.2rem",
                sm: "1.3rem",
                md: "1.4rem",
                lg: "1.5rem",
              },
            }}
            variant="h5"
            color="text.secondary"
            gutterBottom
          >
            {petData.petBreed.nameBreed}
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "1.2rem",
                sm: "1.3rem",
                md: "1.4rem",
                lg: "1.5rem",
              },
            }}
            variant="h5"
            color="red"
            gutterBottom
          >
            {petData.price.toLocaleString()} đ
          </Typography>

          {/* table info */}
          <TableContainer component={TablePaper} sx={{ marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Age
                  </TableCell>
                  <TableCell align="center">{petData.age} month</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Gender
                  </TableCell>
                  <TableCell align="center">{petData.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Characteristic
                  </TableCell>
                  <TableCell align="center">{petData.characteristic}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Deworming
                  </TableCell>
                  <TableCell align="center">{petData.deworming}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Vaccination
                  </TableCell>
                  <TableCell align="center">{petData.vaccination}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        color: petData.sold ? "red" : "green",
                        fontWeight: "bold",
                      }}
                    >
                      {petData.sold ? "Sold" : "Available"}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/*button buy now*/}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "left" },
              flexDirection: { xs: "row", md: "row" },
              gap: 2,
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#eeeeee",
                color: "black",
                display: "flex",
                alignItems: "center",
                borderRadius: "4px",
              }}
            >
              <IconButton
                onClick={handleDecrease}
                sx={{
                  color: "black",
                  "&:hover": { backgroundColor: "#f7f7f7" },
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                }}
                disabled={petData.sold}
              >
                <RemoveIcon />
              </IconButton>
              <Box
                sx={{
                  fontWeight: "bold",
                  margin: "0 12px",
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                }}
              >
                {petData.sold ? 0 : quantity}
              </Box>
              <IconButton
                onClick={handleIncrease}
                sx={{
                  color: "black",
                  "&:hover": { backgroundColor: "#f7f7f7" },
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                }}
                disabled={petData.sold}
              >
                <AddIcon />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              sx={{
                fontWeight: "bold",
                backgroundColor: "#F7482E",
                "&:hover": {
                  backgroundColor: "#D63A2E",
                },
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
              onClick={() => handleCart()}
              disabled={petData.sold}
            >
              Add To Cart <AddShoppingCartIcon sx={{ marginLeft: "10px" }} />
            </Button>
          </Box>

          {/* Buy Now and Favorite buttons */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "left" },
              flexDirection: { xs: "row", md: "row" },
              gap: 2,
              marginBottom: 2,
            }}
          >
            <Box>
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#0C89F7",
                  "&:hover": {
                    backgroundColor: "#0C89F2",
                  },
                  padding: { xs: "6px", sm: "8px", md: "10px" },
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                }}
                disabled={petData.sold}
              >
                Buy Now
              </Button>
            </Box>

            <IconButton onClick={() => handleLikeClick()}>
              <FontAwesomeIcon
                icon={
                  isFavorite(petData, favorites) ? solidHeart : regularHeart
                }
                size="lg"
                color={isFavorite(petData, favorites) ? "red" : "black"}
              />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PetInfo;
