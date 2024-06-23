import React, { useState } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { apiUrlUser } from "../../services/config";
import {
  setAdmin,
  setLogin,
  setAccessToken,
  setUID,
} from "../../services/useSlice";
import { useDispatch } from "react-redux";

const Login = ({ setLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${apiUrlUser}/login`, loginData);
      setLoading(true);
      if (response.status === 200) {
        dispatch(setUID(response.data.userData._id));
        dispatch(setAdmin(response.data.userData.role));
        dispatch(setLogin(true));
        dispatch(setAccessToken(response.data.accessToken));
        setTimeout(() => {
          if (response.data.userData.role === "User") {
            navigation("/");
          } else if (response.data.userData.role === "Admin") {
            navigation("/dashboard");
          } else {
            navigation("/CustomerMessages");
          }
        }, 1200);
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
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container sign-in">
      <form>
        <h1>Sign In</h1>
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
        <a href="#">Forget Your Password?</a>
        <button onClick={handleSubmit}>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
