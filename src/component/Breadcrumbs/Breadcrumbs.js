"use client";
import React from "react";
import { Link, Typography, Breadcrumbs, Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const BreadcrumbsComponent = () => {
  const router = useRouter();
  const pathName = usePathname();

  if (pathName.startsWith("/news/")) {
    return null;
  } else if (pathName.startsWith("/cart")) {
    return null;
  } else if (pathName.startsWith("/payment")) {
    return null;
  } else if (pathName.startsWith("/order-detail")) {
    return null;
  } else if (pathName.startsWith("/voucher")) {
    return null;
  } else if (pathName.startsWith("/spa-services")) {
    return null;
  }
  const breadcrumbsLinks = pathName
    .split("/")
    .filter((part) => part)
    .map((part, index, array) => {
      const href = "/" + array.slice(0, index + 1).join("/");
      return {
        label: part.replace(/-/g, " "),
        href: href,
      };
    });

  return (
    <Box
      sx={{
        marginTop: { xs: "5rem", sm: "6rem" },
      }}
    >
      <Breadcrumbs
        sx={{
          display: { xs: "none", sm: "flex" },
          marginBottom: "15px",
          marginLeft: "2rem",
          fontSize: {
            xs: "0.75rem",
            sm: "0.875rem",
            md: "0.875rem",
            lg: "1rem",
          },
        }}
        aria-label="breadcrumb"
      >
        <Link
          color="inherit"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
          }}
          sx={{ textDecoration: "none" }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: {
                xs: "0.75rem",
                sm: "0.875rem",
                md: "0.875rem",
                lg: "1rem",
              },
            }}
            color="textPrimary"
          >
            HOME
          </Typography>
        </Link>
        {breadcrumbsLinks.map((link, index) => (
          <Link
            key={index}
            color="inherit"
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              router.push(link.href);
            }}
            sx={{ textDecoration: "none" }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.875rem",
                  md: "0.875rem",
                  lg: "1rem",
                },
              }}
              color="textPrimary"
            >
              {link.label}
            </Typography>
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbsComponent;
