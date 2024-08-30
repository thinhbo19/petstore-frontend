"use client";
import React, { useState } from "react";
import "../../styles/Login.css";
import ImageToggle from "../../../public/dog.jpg";
import axios from "axios";
import Loading from "@/src/component/Loading/Loading";
import { apiUrlUser } from "@/src/services/config";
import ForgotPass from "./ForgotPass";

const LoginSignup = () => {
  const Swal = require("sweetalert2");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (email) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrlUser}/forgotpassword?email=${email}`
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Successfully!",
          text: response.data.message,
          icon: "success",
        });
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
        <ForgotPass handleSubmit={handleSubmit} />

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
