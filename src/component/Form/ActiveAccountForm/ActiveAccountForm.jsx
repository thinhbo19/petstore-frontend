"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ActiveAccountForm = ({ userId }) => {
  const router = useRouter();
  const Swal = require("sweetalert2");

  useEffect(() => {
    const activeAccount = async () => {
      if (userId) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/activate-account`,
          { userId: userId }
        );
        if (res.data.success === true) {
          setTimeout(() => {
            Swal.fire({
              title: "Success!",
              text: "Account active successfully!",
              icon: "success",
            });
            router.push("/login");
          }, 1000);
        }
      } else {
        router.push("/login");
      }
    };
    activeAccount();
  }, [userId]);

  return;
};

export default ActiveAccountForm;
