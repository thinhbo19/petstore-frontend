import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import "./Breadcrumb.css";
function ActiveLastBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumbs-container">
      <Breadcrumbs aria-label="breadcrumb">
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const decodedValue = decodeURIComponent(value);
          return isLast ? (
            <Link
              className="active-breadcrumb-item"
              href={to}
              key={to}
              underline="hover"
              color="inherit"
            >
              {decodedValue}
            </Link>
          ) : (
            <Link
              className="breadcrumb-item"
              href={to}
              key={to}
              underline="hover"
              color="inherit"
            >
              {decodedValue}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}

export default ActiveLastBreadcrumb;
