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
        <Grid item xs={12} md={2}>
          <NavbarUser />
        </Grid>

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
