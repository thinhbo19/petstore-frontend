"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import parse from "html-react-parser";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ArticleComp = ({ articleData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Kiểm tra xem articleData có dữ liệu không
  if (!articleData) {
    return (
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h6">No Article Data Available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Hình ảnh nền và tiêu đề */}
      <Box
        sx={{
          width: "100%",
          height: isMobile ? "300px" : "400px",
          position: "relative",
          backgroundImage: `url(${articleData.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "10px",
            borderRadius: "5px",
            maxWidth: "90%",
            wordBreak: "break-word",
          }}
        >
          {articleData.title}
        </Typography>
      </Box>

      {/* Mô tả ngắn và nội dung bài viết */}
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography
          variant="body1"
          sx={{ marginBottom: "20px", fontStyle: "italic" }}
        >
          {articleData.firstWord}
        </Typography>

        <Box
          sx={{
            maxWidth: "100%",
            "& img": {
              width: "60%",
              height: "auto",
              maxWidth: "100%",
              margin: "10px auto",
              borderRadius: "5px",
            },
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {/* Đọc nội dung HTML */}
          <Typography
            variant="body1"
            paragraph
            sx={{ textAlign: "justify", lineHeight: "1.6" }}
          >
            {parse(articleData.content)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleComp;
