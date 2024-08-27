"use client";
import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import "./Breadcrumb.css";
import { usePathname } from "next/navigation";
import { slugify } from "@/src/utils/slugify";

function ActiveLastBreadcrumb() {
  const pathname = usePathname();

  const pathnames = pathname
    .split("/")
    .filter((x) => x)
    .map((x) => decodeURIComponent(x));

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <div className="breadcrumbs-container">
      <Breadcrumbs aria-label="breadcrumb">
        {/* {pathnames.map((value, index) => {
          if (value === "CỬA HÀNG") {
            to === "/";
          }
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const decodedValue = decodeURIComponent(value);
        })} */}
        <Link
          className="active-breadcrumb-item"
          href="ád"
          // key={to}
          underline="hover"
          color="inherit"
        >
          ads
        </Link>
      </Breadcrumbs>
    </div>
  );
}

export default ActiveLastBreadcrumb;
