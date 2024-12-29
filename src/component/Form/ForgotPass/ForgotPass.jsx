"use client";
import React, { useState } from "react";

export const metadata = {
  title: "ForgotPass",
};

const ForgotPass = ({ handleSubmitForgot, handleRemoveForgot }) => {
  const [email, setEmail] = useState("");

  return (
    <div className="form-container forgot">
      <form>
        <h1>Enter email</h1>
        <span>Please, entered your email to reset password</span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="link-signin-signup-forgot">
          <p className="link-forgot" onClick={() => handleRemoveForgot()}>
            Sign In?
          </p>
        </div>
        <button onClick={(e) => handleSubmitForgot(e, email)}>Confirm</button>
      </form>
    </div>
  );
};

export default ForgotPass;
