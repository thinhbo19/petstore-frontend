import React from "react";
import "./Navbar.css";
import Logo from "../../../assets/logo.svg";
import Logout from "../../../assets/log-out.svg";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setLogout } from "../../../services/useSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();

  const HandleLogout = () => {
    dispatch(setLogout());
    navigation("/login");
  };

  return (
    <>
      <aside className="aside">
        <a href="#Species" className="nav__logo">
          <img src={Logo} alt="img" />
        </a>
        <nav className="nav">
          <div className="nav__menu__admin">
            <ul className="nav__list__admin">
              <li className="nav__item__admin">
                <a
                  href="#Species"
                  className={`nav__link__admin ${
                    location.hash === "#Species" ? "active" : ""
                  }`}
                >
                  Species
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#Breeds"
                  className={`nav__link__admin ${
                    location.hash === "#Breeds" ? "active" : ""
                  }`}
                >
                  Breeds
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#Pets"
                  className={`nav__link__admin ${
                    location.hash === "#Pets" ? "active" : ""
                  }`}
                >
                  Pets
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#Category"
                  className={`nav__link__admin ${
                    location.hash === "#Category" ? "active" : ""
                  }`}
                >
                  Category
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#Brands"
                  className={`nav__link__admin ${
                    location.hash === "#Brands" ? "active" : ""
                  }`}
                >
                  Brands
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#Product"
                  className={`nav__link__admin ${
                    location.hash === "#Product" ? "active" : ""
                  }`}
                >
                  Product
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="#Users"
                  className={`nav__link__admin ${
                    location.hash === "#Users" ? "active" : ""
                  }`}
                >
                  Users
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="dashboard/statistical"
                  // className={`nav__link__admin ${
                  //   location.hash === "#Users" ? "active" : ""
                  // }`}
                  className="nav__link__admin"
                >
                  Statistical
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
