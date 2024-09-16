import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
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
