"use client";
import React, { useState } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export const metadata = {
  title: "Sign up",
};

const SignUp = ({ handleSignUp }) => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="form-container sign-up">
      <form>
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="link-signin-signup-forgot">
          <Link href="/login" className="link-signup">
            Sign in now
          </Link>
        </div>
        <button
          onClick={() => handleSignUp(username, phoneNumber, email, password)}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
