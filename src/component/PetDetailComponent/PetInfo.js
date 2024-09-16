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

function isFavorite(product, favorites) {
  return favorites.some((favorite) => favorite.petID === product._id);
}

const PetInfo = ({ petData, accessToken }) => {
  const [mainImage, setMainImage] = useState(petData.imgPet[0]);
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
        } else {
          dispatch(addFavorite(petData));
        }
        Swal.fire({
          title: "SUCCESSFULLY",
          text: res.data.message,
          icon: "success",
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "ERROR",
          text: "Something went wrong",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  return (
    <Paper
      elevation={8}
      sx={{ padding: 3, marginBottom: 4, position: "relative" }}
    >
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
                    alt={`Thumbnail ${index}`}
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
                xs: "1.8rem",
                sm: "1.8rem",
                md: "1.8rem",
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
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {petData.petBreed.nameBreed}
          </Typography>
          <Typography variant="h5" color="red" gutterBottom>
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
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              marginBottom: 2,
            }}
          >
            <Box>
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  fontSize: {
                    xs: "1rem",
                    sm: "1rem",
                    md: "1rem",
                    lg: "1rem",
                  },
                  marginRight: 2,
                  backgroundColor: "#F7482E",
                  "&:hover": {
                    backgroundColor: "#D63A2E",
                  },
                }}
              >
                Buy Now
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  fontSize: {
                    xs: "1rem",
                    sm: "1rem",
                    md: "1rem",
                    lg: "1rem",
                  },
                  marginRight: 2,
                  backgroundColor: "#F7482E",
                  "&:hover": {
                    backgroundColor: "#D63A2E",
                  },
                }}
              >
                Add To Cart <AddShoppingCartIcon sx={{ marginLeft: "10px" }} />
              </Button>
              <IconButton>
                <FontAwesomeIcon
                  icon={
                    isFavorite(petData, favorites) ? solidHeart : regularHeart
                  }
                  size="lg"
                  color={isFavorite(petData, favorites) ? "red" : "black"}
                  onClick={() => handleLikeClick()}
                />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PetInfo;
