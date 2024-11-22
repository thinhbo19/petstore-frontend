import { Box, Button } from "@mui/material";

export default function CustomButtons({ handleChangeStatus }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        marginBottom: "25px",
      }}
    >
      <Button
        sx={{
          background: "linear-gradient(to right, #34d399, #10b981)",
          color: "#fff",
          borderRadius: "8px",
          padding: "12px 24px",
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            background: "linear-gradient(to right, #10b981, #34d399)",
            transform: "translateY(-4px)",
            boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
        onClick={() => handleChangeStatus("All")}
      >
        All
      </Button>

      <Button
        sx={{
          background: "linear-gradient(to right, #ff7e5f, #feb47b)",
          color: "#fff",
          borderRadius: "8px",
          padding: "12px 24px",
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            background: "linear-gradient(to right, #feb47b, #ff7e5f)",
            transform: "translateY(-4px)",
            boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
        onClick={() => handleChangeStatus("Purchase")}
      >
        Purchase Invoice
      </Button>

      <Button
        sx={{
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          color: "#fff",
          borderRadius: "8px",
          padding: "12px 24px",
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            background: "linear-gradient(to right, #2575fc, #6a11cb)",
            transform: "translateY(-4px)",
            boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
        onClick={() => handleChangeStatus("Booking")}
      >
        Booking Invoice
      </Button>
    </Box>
  );
}
