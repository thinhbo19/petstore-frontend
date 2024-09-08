import React from "react";
import { Link, Typography, Breadcrumbs } from "@mui/material";
import { useRouter } from "next/navigation";

const BreadcrumbsComponent = ({ pathName }) => {
  const router = useRouter();

  const breadcrumbsLinks = pathName
    .split("/")
    .filter((part) => part)
    .map((part, index, array) => {
      const href = "/" + array.slice(0, index + 1).join("/");
      return {
        label: part,
        href: href,
      };
    });

  return (
    <Breadcrumbs sx={{ marginBottom: "15px" }} aria-label="breadcrumb">
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
          sx={{ textDecoration: "none" }} // Tắt gạch dưới
        >
          <Typography
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
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
