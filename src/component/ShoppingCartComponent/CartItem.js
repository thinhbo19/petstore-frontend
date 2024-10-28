import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";

const CartItem = ({
  item,
  handleRemoveItem,
  handleIncrease,
  handleDecrease,
  handleSelect,
  isSelected,
}) => (
  <Paper
    sx={{
      p: 2,
      mb: 2,
      background: "rgba(255, 255, 255, 0.55)",
      boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      backdropFilter: "blur(8.5px)",
      WebkitBackdropFilter: "blur(8.5px)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
    }}
    elevation={3}
  >
    <Grid container alignItems="center">
      <Grid item xs={2} sm={1}>
        <Checkbox
          checked={isSelected}
          onChange={() => handleSelect(item.id, item)}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: { xs: "1rem", sm: "1.5rem" },
            },
          }}
        />
      </Grid>
      <Grid item xs={3} sm={2}>
        <Box
          sx={{
            width: { xs: "40px", sm: "60px", md: "80px" },
            height: { xs: "40px", sm: "60px", md: "80px" },
          }}
        >
          <Image
            src={item.images}
            alt={item.info.name}
            layout="responsive"
            width={100}
            height={100}
            style={{ borderRadius: 8, objectFit: "cover" }}
          />
        </Box>
      </Grid>
      <Grid item xs={5} sm={6}>
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
            fontWeight: "bold",
          }}
        >
          {item.info.name}
        </Typography>
        <Typography
          variant="caption"
          color="red"
          sx={{
            fontSize: { xs: "0.65rem", sm: "0.75rem" },
            fontWeight: "bold",
          }}
        >
          Price: {item.info.price.toLocaleString("vi")} VNĐ
        </Typography>
      </Grid>
      <Grid item xs={2} sm={3} sx={{ textAlign: "right" }}>
        <IconButton
          color="error"
          onClick={() => handleRemoveItem(item.id)}
          sx={{ mt: 0 }}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>

    <Box
      display="flex"
      justifyContent={{ xs: "space-between", sm: "right", md: "right" }}
      alignItems="center"
      sx={{
        borderRadius: 1,
        p: 0.5,
        mt: 1,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: "1rem", sm: "1rem", md: "1.2rem" },
          marginRight: "10px",
          color: "red",
          fontWeight: "bold",
        }}
      >
        {item.newPrice.toLocaleString("vi")} VNĐ
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        sx={{ backgroundColor: "#F84C2F", borderRadius: "15px" }}
      >
        <IconButton
          onClick={() => handleDecrease(item.id)}
          size="small"
          sx={{ color: "#fff" }}
        >
          <RemoveIcon />
        </IconButton>
        <Typography
          variant="body2"
          mx={1}
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
            color: "white",
          }}
        >
          {item.quantity}
        </Typography>
        <IconButton
          onClick={() => handleIncrease(item.id, item)}
          size="small"
          sx={{ color: "#fff" }}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  </Paper>
);

export default CartItem;
