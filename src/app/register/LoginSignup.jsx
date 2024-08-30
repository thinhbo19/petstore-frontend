"use client";
import React, { useEffect, useState } from "react";
import "../../styles/Login.css";
import Login from "./Login";
import SignUp from "./Signup";
import ImageToggle from "../../../public/dog.jpg";
import axios from "axios";
import {
  setAdmin,
  setLogin,
  setAccessToken,
  setUID,
} from "../../services/Redux/useSlice";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/src/component/Loading/Loading";
import { createChat } from "../../services/apiChat";
import { apiUrlUser } from "@/src/services/config";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const Swal = require("sweetalert2");
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === "/register") {
      handleAddActive();
    }
    if (pathName === "/login") {
      handleRemoveActive();
    }
  }, [pathName]);

  const handleAddActive = () => {
    const container = document.getElementById("wrapper");
    container.classList.add("active");
  };
  const handleRemoveActive = () => {
    const container = document.getElementById("wrapper");
    container.classList.remove("active");
  };

  const handleSubmit = async (email, password) => {
    setLoading(true);
    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${apiUrlUser}/login`, loginData);
      if (response.status === 200) {
        dispatch(setUID(response.data.userData._id));
        dispatch(setAdmin(response.data.userData.role));
        dispatch(setLogin(true));
        dispatch(setAccessToken(response.data.accessToken));

        setTimeout(() => {
          if (response.data.userData.role === "User") {
            router.push("/");
          } else if (response.data.userData.role === "Admin") {
            router.push("/dashboard");
          } else {
            router.push("/CustomerMessages");
          }
        }, 600);
        Swal.fire({
          title: "Success!",
          text: "Login successfully!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Wrong email or pass!",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "An error occurred.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (username, phoneNumber, email, password) => {
    setLoading(true);
    const errors = [];
    if (username === "") {
      errors.push("You have not entered a username!");
    }
    if (phoneNumber === "") {
      errors.push("You have not entered a phoneNumber!");
    }
    if (email === "") {
      errors.push("You have not entered an email!");
    }
    if (password === "") {
      errors.push("You have not entered a password!");
    }
    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: errors.join("<br>"),
      });
      setLoading(false);
      return;
    } else {
      try {
        const SignUpData = {
          username: username,
          mobile: phoneNumber,
          email: email,
          password: password,
        };
        const response = await axios.post(`${apiUrlUser}/register`, SignUpData);
        if (response.status === 200) {
          Swal.fire({
            title: "Conratulation!",
            text: "You have successfully registered an account!",
            icon: "success",
          });
          const userId = response.data.data._id;
          await createChat(userId);
          setTimeout(() => {
            const container = document.getElementById("wrapper");
            container.classList.remove("active");
          }, 2200);
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        if (error.response) {
          console.error("Server Error:", error.response.data);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        } else if (error.request) {
          console.error("Network Error:", error.request);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Network Error. Please check your internet connection.",
          });
        } else {
          console.error("Client Error:", error.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An unexpected error occurred. Please try again later.",
          });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="loginregisterForm">
      <div className="wrapper" id="wrapper">
        <Login
          handleAddActive={handleAddActive}
          loading={loading}
          handleSubmit={handleSubmit}
        />
        <SignUp
          handleRemoveActive={handleRemoveActive}
          loading={loading}
          handleSignUp={handleSignUp}
        />
        <div className="toggle-container">
          <div
            className="toggle"
            style={{ backgroundImage: `url(${ImageToggle})` }}
          >
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button
                onClick={handleRemoveActive}
                className="hidden"
                id="login"
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button
                onClick={handleAddActive}
                className="hidden"
                id="register"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
