import React, { useState } from "react";
<<<<<<< HEAD
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";
=======
import { CiUser } from "react-icons/ci";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useData } from "./Datacontext.jsx";
import UserDropDown from "./userDropDown";
>>>>>>> context

const Header = ({ userPage }) => {
  const { showProduct, setShowProduct } = useData();
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
        setShowProduct(searchResults);

        console.log(typeof searchResults);
        console.log("searchResults:", searchResults);
        // Navigate to the search results page with the products as a prop
        // navigate("/searchbar", { state: { products: searchResults } });
        navigate("/searchbar");
      } else {
        console.error("Error fetching search results");
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <>
<<<<<<< HEAD
      <header className="homepage-header">
        <div className="header-left-side">
          <div className="header-logo">
=======
      <header className=" p-4 text-white ecommerce-header">
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
>>>>>>> context
            <img
              src="project_logo.png"
              alt="This is the logo of the page"
              className="page-logo"
            />
          </div>
<<<<<<< HEAD
          <div className="left-side-buttons">
            <h2>Deals</h2>
            <h2>Categories</h2>
          </div>
        </div>
        <div className="header-middle">
          <input type="text" placeholder="" />
          <IoSearch className="header-search-logo" />
        </div>
        <div className="header-right-side">
          <div className="header-login">
            <RiLoginBoxLine />
          </div>
          <div className="header-shoppingCart">
            <FiShoppingCart />
=======

          <div className="user-icons flex items-center space-x-4">
            {!userPage && (
              <Link to="/login">
                <FaUser className="header-icon" />
              </Link>
            )}
            <FaShoppingCart className="header-icon" />
            {userPage && (
              <CiUser
                className="icon user"
                onMouseEnter={handleUserIconHover}
              />
            )}
>>>>>>> context
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
