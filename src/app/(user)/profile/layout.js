import NavbarUser from "@/src/component/NavbarUser/NavbarUser";
import { Box, Grid } from "@mui/material";

export default function ProfileLayout({ children }) {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Grid container spacing={2}>
        {/* Bên phải - NavbarUser chiếm 20% */}
        <Grid item xs={12} md={2}>
          <NavbarUser />
        </Grid>

        {/* Bên trái - Phần nội dung chiếm 80% */}
        <Grid
          item
          xs={12}
          md={10}
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}
