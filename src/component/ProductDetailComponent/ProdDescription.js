import { Paper, Typography } from "@mui/material";

const ProdDescription = ({ description }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
      <Typography
        variant="body1"
        paragraph
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Paper>
  );
};

export default ProdDescription;
