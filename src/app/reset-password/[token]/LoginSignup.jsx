"use client";
import React, { useState } from "react";
import "../../../styles/Login.css";
import ImageToggle from "../../../../public/dog.jpg";
import axios from "axios";
import Loading from "@/src/component/Loading/Loading";
import { apiUrlUser } from "@/src/services/config";
import { useRouter } from "next/navigation";
import ResetPass from "@/src/component/Form/ResetPass/ResetPass";

const LoginSignup = ({ token }) => {
  const Swal = require("sweetalert2");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (password) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${apiUrlUser}/resetpassword`, {
        password: password,
        token: token,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Successfully!",
          text: "Change password successfully",
          icon: "success",
        });
        router.push("/login");
      }
      if (response.status === 500) {
        Swal.fire({
          title: "Error!",
          text: "Email is not register",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "An error occurred.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="loginregisterForm">
      <div className="wrapper" id="wrapper">
        <ResetPass handleSubmit={handleSubmit} />

        <div className="toggle-container">
          <div
            className="toggle"
            style={{ backgroundImage: `url(${ImageToggle})` }}
          >
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Please, entered your email to reset password.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
