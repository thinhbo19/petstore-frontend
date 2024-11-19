"use client";
import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { generateSlug } from "@/src/services/slugifyConfig";
import { useDispatch } from "react-redux";
import { setLogout } from "@/src/services/Redux/useSlice";
import ArticleIcon from "@mui/icons-material/Article";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import BarChartIcon from "@mui/icons-material/BarChart";
const drawerWidth = 240;

export default function AdminLayout({ children }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
    window.location.href = "/login";
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "3px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
            },
          },
        }}
        className="design_scrollbar"
      >
        <Toolbar />

        <Divider />
        <List>
          {["Statistical"].map((text) => (
            <ListItem
              button
              key={text}
              component={Link}
              href={`/dashboard/${generateSlug(text)}`}
            >
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Divider />
        <List>
          {["Species", "Breed", "Pets"].map((text) => (
            <ListItem
              button
              key={text}
              component={Link}
              href={`/dashboard/${generateSlug(text)}`}
            >
              <ListItemIcon>
                <PetsIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Categories", "Products", "Voucher"].map((text) => (
            <ListItem
              button
              key={text}
              component={Link}
              href={`/dashboard/${generateSlug(text)}`}
            >
              <ListItemIcon>
                {text === "Categories" ? (
                  <CategoryIcon />
                ) : text === "Products" ? (
                  <InventoryIcon />
                ) : (
                  <ReceiptIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["News", "Service", "Booking"].map((text) => (
            <ListItem
              button
              key={text}
              component={Link}
              href={`/dashboard/${generateSlug(text)}`}
            >
              <ListItemIcon>
                {text === "News" ? (
                  <ArticleIcon />
                ) : text === "Service" ? (
                  <MedicalServicesIcon />
                ) : (
                  <CalendarMonthIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Order"].map((text) => (
            <ListItem
              button
              key={text}
              component={Link}
              href={`/dashboard/${generateSlug(text)}`}
            >
              <ListItemIcon>
                <ReceiptLongIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Users", "Logout"].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={index % 2 === 1 ? handleLogout : undefined}
              component={index % 2 === 1 ? "div" : Link}
              href={
                index % 2 === 1 ? undefined : `/dashboard/${generateSlug(text)}`
              }
            >
              <ListItemIcon>
                {index % 2 === 0 ? <SupervisorAccountIcon /> : <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {children}
      </Box>
    </Box>
  );
}
