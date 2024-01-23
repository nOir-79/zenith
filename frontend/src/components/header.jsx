// Header.jsx
import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import UserDropDown from "./userDropDown";
const Header = ({ userPage }) => {
  // const dispatch = useDispatch();
  const [isUserIconHovered, setIsUserIconHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleUserIconHover = () => {
    setIsUserIconHovered((prevIsUserIconHovered) => !prevIsUserIconHovered);
  };
  const handleSearch = async () => {
    try {
      console.log("Search term:", searchTerm);
      // Adjust the API endpoint accordingly
      const response = await fetch("http://localhost:3000/searchbar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: searchTerm }),
      });

      if (response.status === 200) {
        const searchResults = await response.json();

        // const result = JSON.parse(searchResults);
        // console.log(result);
        console.log(typeof searchResults);
        console.log(searchResults);
        // const sendProductData = () => {
        //   const productData = {
        //     type: "SET_PRODUCT_DATA",
        //     payload: searchResults,
        //   };
        //   dispatch(setProductData(sendProductData));
        // };

        // Navigate to the search results page with the products as a prop
        navigate("/searchbar", { state: { products: searchResults } });
      } else {
        console.error("Error fetching search results");
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <>
      <header className="ecommerce-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="What can we help you to find?"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" onClick={handleSearch} />
        </div>
        <div className="logo">
          <img
            src="/path/to/logo.png"
            alt="E-commerce Logo"
            className="logo-image"
          />
        </div>
        {!userPage && (
          <div className="user-icons">
            <Link to="/login">
              <FaUser className="icon" />
            </Link>
            <FaShoppingCart className="icon" />
          </div>
        )}
        {userPage && (
          <div className="user-icons">
            <CiUser className="icon user" onMouseEnter={handleUserIconHover} />
            <FaShoppingCart className="icon" />
          </div>
        )}
        {isUserIconHovered && <UserDropDown hovered={isUserIconHovered} />}
      </header>
    </>
  );
};

export default Header;
