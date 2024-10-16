"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic xử lý form ở đây
    console.log("Submitted data:", formData);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        color: "black",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Đặt thành cột trên màn hình nhỏ và hàng trên màn hình lớn
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          {/* Newsletter Section */}
          <Box>
            <Typography
              variant="h4"
              gutterBottom
              textAlign="left"
              fontWeight="bold"
              sx={{
                fontSize: {
                  xs: "1.5rem",
                  sm: "1.6rem",
                  md: "1.8rem",
                  lg: "2rem",
                  xl: "2.2rem",
                },
              }}
            >
              Newsletter
            </Typography>

            <Typography
              variant="body1"
              sx={{ marginBottom: "1rem", textAlign: "left" }}
            >
              Signup our newsletter to get update information, news, insight or
              promotions.
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
              width: "100%", // Đảm bảo form chiếm toàn bộ chiều rộng
              marginTop: { xs: "1rem", sm: "0" }, // Thêm khoảng cách phía trên trên màn hình nhỏ
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Đặt thành cột trên màn hình nhỏ và hàng trên màn hình lớn
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%", // Đảm bảo chiếm toàn bộ chiều rộng
                gap: "1rem",
              }}
            >
              <TextField
                label="Name"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#FCD039", // Màu viền bình thường
                    },
                    "&:hover fieldset": {
                      borderColor: "#FCD039", // Màu viền khi hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FCD039", // Không hiển thị viền khi focus
                    },
                  },
                }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#FCD039", // Màu viền bình thường
                    },
                    "&:hover fieldset": {
                      borderColor: "#FCD039", // Màu viền khi hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FCD039", // Không hiển thị viền khi focus
                    },
                  },
                }}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#FCD039",
                color: "black",
                maxWidth: "400px",
                width: { xs: "100%", sm: "100%" }, // Chiều rộng 100% trên màn hình nhỏ và auto cho màn hình lớn
                padding: { xs: "10px 0", sm: "12px 15px" }, // Padding cho các kích thước khác nhau
                fontSize: { xs: "0.875rem", sm: "1rem" }, // Kích thước chữ cho các kích thước khác nhau
                "&:hover": {
                  backgroundColor: "#e6c52d", // Màu nền khi hover
                },
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {/* About Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              textAlign={{ xs: "center", md: "left" }}
            >
              About Us
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "black", textAlign: { xs: "center", md: "left" } }}
            >
              We are a leading company providing the best services for your pets
              and ensuring their health and happiness.
            </Typography>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              textAlign={{ xs: "center", md: "left" }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "black", textAlign: { xs: "center", md: "left" } }}
            >
              Address: 123 Pet Street, City, Country
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "black", textAlign: { xs: "center", md: "left" } }}
            >
              Phone: +123 456 789
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "black", textAlign: { xs: "center", md: "left" } }}
            >
              Email: contact@pets.com
            </Typography>
          </Grid>

          {/* Useful Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              textAlign={{ xs: "center", md: "left" }}
            >
              Useful Links
            </Typography>
            <MuiLink
              href="/"
              color="inherit"
              underline="hover"
              sx={{ display: "block", textAlign: { xs: "center", md: "left" } }}
            >
              Home
            </MuiLink>
            <MuiLink
              href="/services"
              color="inherit"
              underline="hover"
              sx={{ display: "block", textAlign: { xs: "center", md: "left" } }}
            >
              Services
            </MuiLink>
            <MuiLink
              href="/about"
              color="inherit"
              underline="hover"
              sx={{ display: "block", textAlign: { xs: "center", md: "left" } }}
            >
              About Us
            </MuiLink>
            <MuiLink
              href="/contact"
              color="inherit"
              underline="hover"
              sx={{ display: "block", textAlign: { xs: "center", md: "left" } }}
            >
              Contact Us
            </MuiLink>
          </Grid>

          {/* Social Media Icons */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              textAlign={{ xs: "center", md: "left" }}
            >
              Follow Us
            </Typography>
            <Box
              display="flex"
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <IconButton
                component="a"
                href="https://facebook.com"
                sx={{ color: "black" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com"
                sx={{ color: "black" }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                sx={{ color: "black" }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                sx={{ color: "black" }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box
          sx={{
            textAlign: "center",
            marginTop: "2rem",
            borderTop: "1px solid #555",
            paddingTop: "1rem",
            color: "black",
          }}
        >
          <Typography variant="body2">
            © 2024 Pets Company. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
