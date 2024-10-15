"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TakeLogin = ({ accesstoken }) => {
  const router = useRouter();
  const Swal = require("sweetalert2");

  useEffect(() => {
    const activeAccount = async () => {
      if (!accesstoken) {
        setTimeout(() => {
          Swal.fire({
            title: "Alert!",
            text: "You must log in to continue buying!",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Login",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/login");
            }
          });
        }, 1000);
      }
    };

    activeAccount();
  }, [accesstoken, router]);

  return null;
};

export default TakeLogin;
