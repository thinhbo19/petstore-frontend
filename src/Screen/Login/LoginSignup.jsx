import React, { useEffect, useState } from "react";
import "./Login.css";
import Login from "./Login";
import SignUp from "./Signup";
import Loading from "../../Component/Loading/Loading";

const LoginSignup = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleAddActive = () => {
    const container = document.getElementById("wrapper");
    container.classList.add("active");
  };
  const handleRemoveActive = () => {
    const container = document.getElementById("wrapper");
    container.classList.remove("active");
  };

  return (
    <div className="loginregisterForm">
      <div className="wrapper" id="wrapper">
        <Login setLoading={setLoading} />
        <SignUp setLoading={setLoading} />
        <div className="toggle-container">
          <div className="toggle">
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
