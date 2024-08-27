import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer__container">
      <div className="footer__content">
        <div className="footer__section">
          <h4>About Us</h4>
          <p>
            We are a company dedicated to providing the best services and
            products.
          </p>
        </div>
        <div className="footer__section">
          <h4>Contact Us</h4>
          <p>Email: contact@company.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer__section">
          <h4>Follow Us</h4>
          <div className="footer__socials">
            <a href="#" className="footer__social-link">
              Facebook
            </a>
            <a href="#" className="footer__social-link">
              Twitter
            </a>
            <a href="#" className="footer__social-link">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2024 Company Name. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
