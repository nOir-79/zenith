// Header.jsx
import React from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa"; // Import icons from React Icons library
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  return (
    <>
      <header className="ecommerce-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="What can we help you to find?"
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="logo">
          <img
            src="/path/to/logo.png"
            alt="E-commerce Logo"
            className="logo-image"
          />{" "}
          {/* Replace with your actual logo path */}
        </div>
        <div className="user-icons">
          <Link to="/login">
            <FaUser className="icon" />
          </Link>
          <FaShoppingCart className="icon" />
          {/* Add more icons or components as needed */}
        </div>
      </header>
    </>
  );
};

export default Header;
