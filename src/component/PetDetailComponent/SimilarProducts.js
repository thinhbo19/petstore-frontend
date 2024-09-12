import { Box, Paper, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { generateSlug } from "@/src/services/slugifyConfig";

const SimilarProducts = ({ similarProducts }) => {
  const router = useRouter();

  // Cấu hình slider
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Bật tính năng tự động lướt
    autoplaySpeed: 2000, // Thời gian giữa các lần lướt (2 giây)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Paper elevation={0} sx={{ padding: 3, marginTop: "20px" }}>
      <Typography
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase",
          textAlign: "center",
        }}
        variant="h6"
        gutterBottom
      >
        Similar Products
      </Typography>
      <Slider {...settings}>
        {similarProducts && similarProducts.length > 0 ? (
          similarProducts.map((product) => (
            <Box
              key={product._id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <Image
                  src={product.imgPet[0]}
                  alt={product.namePet}
                  width={150}
                  height={150}
                  style={{
                    borderRadius: "8px",
                    display: "block",
                  }}
                />
                <Typography variant="subtitle1" gutterBottom>
                  {product.namePet}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price} VND
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() =>
                    router.push(
                      `/shop/${generateSlug(
                        product.petBreed.nameSpecies
                      )}/${generateSlug(
                        product.petBreed.nameBreed
                      )}/${generateSlug(product.namePet)}`
                    )
                  }
                >
                  Xem chi tiết
                </Button>
              </Paper>
            </Box>
          ))
        ) : (
          <Typography variant="body1" align="center">
            Không có sản phẩm tương tự
          </Typography>
        )}
      </Slider>
    </Paper>
  );
};

export default SimilarProducts;
