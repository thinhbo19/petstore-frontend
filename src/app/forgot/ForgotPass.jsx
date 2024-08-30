"use client";
import React, { useState } from "react";
import Link from "next/link";

export const metadata = {
  title: "ForgotPass",
};

const ForgotPass = ({ handleSubmit }) => {
  const [email, setEmail] = useState("");

  return (
    <div className="form-container sign-in">
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
          <Link href="/login">Sign In?</Link>
        </div>
        <button onClick={() => handleSubmit(email)}>Confirm</button>
      </form>
    </div>
  );
};

export default ForgotPass;
