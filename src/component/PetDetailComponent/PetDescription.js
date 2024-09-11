import { Paper, Typography } from "@mui/material";

const PetDescription = ({ description }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="body1" paragraph>
        {description}
      </Typography>
    </Paper>
  );
};

export default PetDescription;
