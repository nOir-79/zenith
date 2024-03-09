import { message } from "antd";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useData } from "./Datacontext";
import CategoryMenu from "./categoryMenu";

const Header = ({ userPage }) => {
  const {
    showProduct,
    setShowProduct,
    isLoggedIn,
    setIsLoggedIn,
    searchText,
    setSearchText,
    isShopLoggedIn,
    setIsShopLoggedIn,
    shopData,
    setShopData,
    customerData,
    setCustomerData,
    showSubMenu,
    setShowSubMenu,
    categoryData,
    setCategoryData,
  } = useData();
  const [isUserIconHovered, setIsUserIconHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryClicked, setCategoryClicked] = useState(false);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
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
        setSearchText(searchTerm);

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
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleCategorySelect = (category, subcategory) => {
    console.log("Selected Category:", category);
    console.log("Selected Subcategory:", subcategory);
  };

  const handleUserProfileClick = () => {
    if (isLoggedIn) {
      navigate("/customerProfile");
    } else {
      message.error("Please login first");
    }
  };
  const handleCategoryClick = () => {
    setCategoryClicked(!categoryClicked);
  };
  const handleLogout = () => {
    if (isShopLoggedIn) {
      setIsShopLoggedIn(false);
      setShopData({});
      message.success("Logged out successfully");
    } else if (isLoggedIn) {
      message.success("Logged out successfully");
      setIsLoggedIn(false);
      setCustomerData({});
    }
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <>
      <header className="homepage-header">
        <div className="header-left-side">
          <div className="header-logo">
            <img
              src="project_logo.png"
              alt="This is the logo of the page"
              className="page-logo"
            />
          </div>
          <div className="left-side-buttons">
            <h2 onClick={handleHomeClick}>Home</h2>
            <h2>Deals</h2>
            <div>
              <h2 onClick={handleCategoryClick}>Categories</h2>
              {categoryClicked && <CategoryMenu />}
            </div>
          </div>
        </div>
        <div className="header-middle">
          <input
            type="text"
            placeholder=""
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <IoSearch onClick={handleSearch} className="header-search-logo" />
        </div>
        <div className="header-right-side">
          {isLoggedIn == false && isShopLoggedIn == false && (
            <div className="header-login">
              <RiLoginBoxLine onClick={handleLoginClick} />
            </div>
          )}
          <div className="header-shoppingCart">
            <FiShoppingCart onClick={handleCartClick} />
          </div>
          <div className="user-profile">
            <FaUserCircle onClick={handleUserProfileClick} />
          </div>
          {(isLoggedIn == true || isShopLoggedIn == true) && (
            <div className="header-user">
              <BiLogOut onClick={handleLogout} />
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
