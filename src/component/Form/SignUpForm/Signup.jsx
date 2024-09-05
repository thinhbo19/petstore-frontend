"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const metadata = {
  title: "Sign up",
};

const SignUp = ({ handleSignUp, handleRemoveActive }) => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container sign-up">
      <form
        onSubmit={(e) =>
          handleSignUp(e, username, phoneNumber, email, password)
        }
      >
        <h1>Create Account</h1>
        <div className="social-icons">
          <Link href="#" className="icon">
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
          <Link href="#" className="icon">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link href="#" className="icon">
            <FontAwesomeIcon icon={faLinkedin} />
          </Link>
          <Link href="#" className="icon">
            <FontAwesomeIcon icon={faGoogle} />
          </Link>
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
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash}
          className="password-toggle-icon-signup"
          onClick={togglePasswordVisibility}
        />

        <div className="link-signin-signup-forgot">
          <p onClick={() => handleRemoveActive()} className="link-signup">
            Sign in now
          </p>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
