"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const metadata = {
  title: "ForgotPass",
};

const ResetPass = ({ handleSubmit }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container sign-in">
      <form>
        <h1>Enter new password</h1>
        <span>Please, entered new password to reset password</span>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash}
          className="password-toggle-icon-forgot"
          onClick={togglePasswordVisibility}
        />
        <button onClick={() => handleSubmit(password)}>Confirm</button>
      </form>
    </div>
  );
};

export default ResetPass;
