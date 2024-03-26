import React from "react";
import "./Navbar.css";
import Logo from "../../../assets/logo.svg";
import Logout from "../../../assets/log-out.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../../services/useSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const HandleLogout = () => {
    dispatch(setLogout());
    navigation("/login");
  };

  return (
    <>
      <aside className="aside">
        <a href="#Home" className="nav__logo">
          <img src={Logo} alt="img" />
        </a>
        <nav className="nav">
          <div className="nav__menu__admin">
            <ul className="nav__list__admin">
              <li className="nav__item__admin">
                <a href="#Dog" className="nav__link__admin">
                  asd <i className="icon-home"></i>
                </a>
              </li>
              <li className="nav__item">
                <a href="#About" className="nav__link">
                  asd <i className="icon-user"></i>
                </a>
              </li>
              <li className="nav__item">
                <a href="#Portfolio" className="nav__link">
                  asd <i className="icon-layers"></i>
                </a>
              </li>
              <li className="nav__item">
                <a href="#Portfolio" className="nav__link">
                  asd <i className="icon-layers"></i>
                </a>
              </li>
              <li className="nav__item">
                <a href="#Portfolio" className="nav__link">
                  asd <i className="icon-layers"></i>
                </a>
              </li>
              <li className="nav__item">
                <a href="#Portfolio" className="nav__link">
                  asd <i className="icon-layers"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="nav__footer">
          <img
            className="nav__img__logout"
            src={Logout}
            alt="img"
            onClick={HandleLogout}
          />
        </div>
      </aside>
    </>
  );
};

export default Navbar;
