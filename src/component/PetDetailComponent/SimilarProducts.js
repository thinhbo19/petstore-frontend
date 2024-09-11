import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const SimilarProducts = ({ similarProducts }) => {
  const router = useRouter();

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Sản phẩm tương tự
      </Typography>
      <Grid container spacing={2}>
        {similarProducts && similarProducts.length > 0 ? (
          similarProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Paper sx={{ padding: 2, textAlign: "center" }}>
                <Image
                  src={product.imgPet[0]}
                  alt={product.namePet}
                  width={150}
                  height={150}
                  style={{ borderRadius: "8px" }}
                />
                <Typography variant="subtitle1" gutterBottom>
                  {product.namePet}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price} VND
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => router.push(`/product/${product._id}`)}
                >
                  Xem chi tiết
                </Button>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">Không có sản phẩm tương tự</Typography>
        )}
      </Grid>
    </Paper>
  );
};

export default SimilarProducts;
