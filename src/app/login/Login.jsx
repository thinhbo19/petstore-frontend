"use client";
import React, { useState } from "react";
import "../../styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const metadata = {
  title: "Login",
};

const Login = ({ loading, handleSubmit, handleAddActive }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container sign-in">
      <form>
        <h1>Sign In</h1>
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
        <span>or use your email password</span>
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
          className="password-toggle-icon"
          onClick={togglePasswordVisibility}
        />
        <div className="link-signin-signup-forgot">
          <Link className="link-forgot" href="/forgot">
            Forget Your Password?
          </Link>
          <Link
            onClick={() => handleAddActive()}
            className="link-signup"
            href="/register"
          >
            Register now
          </Link>
        </div>
        <button onClick={() => handleSubmit(email, password)}>
          {loading ? "currently logged......." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
