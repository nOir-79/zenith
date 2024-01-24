import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import "../styles/header.css";
import UserDropDown from "./userDropDown";

const Header = ({ userPage }) => {
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
      <header className="bg-gray-800 p-4 text-white">
        <div className="flex items-center">
          <div className="flex-1">
            <div className="search-bar flex items-center">
              <input
                type="text"
                placeholder="What can we help you to find?"
                className="search-input p-2 rounded-l-lg text-gray-950"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="search-icon bg-blue-500 text-white p-2 rounded-r-lg"
                onClick={handleSearch}
              >
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="logo">
            <img
              src="/path/to/logo.png"
              alt="E-commerce Logo"
              className="logo-image"
            />
          </div>

          <div className="user-icons flex items-center space-x-4">
            {!userPage && (
              <Link to="/login">
                <FaUser className="icon" />
              </Link>
            )}
            <FaShoppingCart className="icon" />
            {userPage && (
              <CiUser
                className="icon user"
                onMouseEnter={handleUserIconHover}
              />
            )}
          </div>

          {isUserIconHovered && <UserDropDown hovered={isUserIconHovered} />}
        </div>
      </header>
    </>
  );
};

export default Header;
