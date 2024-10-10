// SearchResults.js
import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import Image from "next/image";

const SearchResults = ({ results, handleChangePage }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        zIndex: 9999,
        maxHeight: "300px",
        overflowY: "auto",
        bgcolor: "background.paper",
        borderRadius: "4px",
      }}
    >
      {results.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: 2,
          }}
        >
          <Typography variant="body1">No results for that search</Typography>
        </Box>
      ) : (
        results.map((item, index) => (
          <Button
            key={index}
            sx={{
              width: "100%",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: 1,
              borderBottom: "1px solid #ccc",
              "&:last-child": {
                borderBottom: "none",
              },
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
            className="search-result-item"
            onClick={() => handleChangePage(item.slug)}
          >
            <Image
              src={item.img}
              alt={item.name}
              width={50}
              height={50}
              style={{ borderRadius: "4px", marginRight: "10px" }}
            />
            <Box>
              <Typography
                sx={{
                  textAlign: "left",
                  color: "black",
                  fontSize: {
                    xs: "0.6rem",
                    sm: "0.7rem",
                    md: "0.8rem",
                    lg: "1rem",
                    xl: "1rem",
                  },
                }}
                variant="body1"
                noWrap
              >
                {item.name}
              </Typography>
              <Typography
                sx={{
                  textAlign: "left",
                  color: "red",
                  fontSize: {
                    xs: "0.7rem",
                    sm: "0.9rem",
                    md: "0.9rem",
                    lg: "0.9rem",
                    xl: "0.9rem",
                  },
                }}
                variant="body2"
                color="text.secondary"
              >
                {item.price} VNĐ
              </Typography>
            </Box>
          </Button>
        ))
      )}
    </Paper>
  );
};

export default SearchResults;
