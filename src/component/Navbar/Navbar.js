"use client";
import "./Navbar.css";
import { useState, useMemo, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Image from "next/image";
import Logo from "../../../public/logo.svg";
import ListIcons from "./ListIcons";
import Searchbox from "./Searchbox";
import PagesNav from "./PagesNav";
import PageItem from "./PageItem";
import Box from "@mui/material/Box";

const Navbar = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }
    setLastScrollY(window.scrollY);
  };

  const logo = useMemo(
    () => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexGrow: 0.2,
        }}
      >
        <Image src={Logo} alt="logo" className="nav__img" />
        <div className="flip-animation">
          <span>P</span>
          <span>E</span>
          <span>T</span>
          <span>S</span>
          <span>H</span>
          <span>O</span>
          <span>P</span>
          <span>.</span>
        </div>
      </Box>
    ),
    []
  );

  return (
    <div
      className={`nav__main ${scrollDirection === "down" ? "hide" : "show"}`}
    >
      <AppBar
        sx={{ backgroundColor: "white" }}
        position="static"
        className="nav__container"
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <PageItem
              anchorElNav={anchorElNav}
              handleOpenNavMenu={handleOpenNavMenu}
              handleCloseNavMenu={handleCloseNavMenu}
            />

            {logo}

            <PagesNav handleCloseNavMenu={handleCloseNavMenu} />

            <Searchbox />

            <ListIcons
              anchorElUser={anchorElUser}
              handleOpenUserMenu={handleOpenUserMenu}
              handleCloseUserMenu={handleCloseUserMenu}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
