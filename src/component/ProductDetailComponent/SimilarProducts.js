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
    <Paper
      elevation={0}
      sx={{
        padding: 3,
        marginTop: "20px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Custom box shadow
        borderRadius: "8px", // Optional: add a subtle border-radius for smoother edges
      }}
    >
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
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)", // Shadow for inner Paper
                  borderRadius: "8px",
                }}
              >
                <Image
                  src={product.images[0]}
                  alt={product.nameProduct}
                  width={150}
                  height={150}
                  style={{
                    borderRadius: "8px",
                    display: "block",
                  }}
                />
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "150px", // Adjust the width as needed
                  }}
                  variant="subtitle1"
                  gutterBottom
                >
                  {product.nameProduct}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price} VND
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() =>
                    router.push(
                      `/shop/${generateSlug(product.category.nameCate)}
                      )}/${generateSlug(product.nameProduct)}`
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
