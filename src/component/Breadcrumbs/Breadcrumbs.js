"use client";
import React from "react";
import { Link, Typography, Breadcrumbs } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const BreadcrumbsComponent = () => {
  const router = useRouter();
  const pathName = usePathname();

  if (pathName.startsWith("/news/")) {
    return null; // Không render Breadcrumbs
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
    <Breadcrumbs
      sx={{
        marginBottom: "15px",
        marginTop: "6rem",
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
  );
};

export default BreadcrumbsComponent;
