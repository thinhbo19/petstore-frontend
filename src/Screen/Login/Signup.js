import React, { useState } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { apiUrlUser } from "../../services/config";

const SignUp = ({ setLoading }) => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
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
      return;
    }
    const SignUpData = {
      username: username,
      mobile: phoneNumber,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${apiUrlUser}/register`, SignUpData);
      if (response.status === 200) {
        Swal.fire({
          title: "Conratulation!",
          text: "You have successfully registered an account!",
          icon: "success",
        });
        setTimeout(() => {
          const container = document.getElementById("wrapper");
          container.classList.remove("active");
        }, 1200);
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
    }
  };

  return (
    <div className="form-container sign-up">
      <form>
        <h1>Create Account</h1>
        <div className="social-icons">
          <a href="#" className="icon">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#" className="icon">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" className="icon">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="#" className="icon">
            <FontAwesomeIcon icon={faGoogle} />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
