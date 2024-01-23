// LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory for redirection
import "../styles/login.css";

const LoginPage = () => {
  const [isShopLogin, setIsShopLogin] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    shopName: "",
    licenseNo: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLoginTypeChange = () => {
    setIsShopLogin((prevIsShopLogin) => !prevIsShopLogin);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Adjust the API endpoint accordingly
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok == "user") {
        // Redirect to another page on successful login
        navigate("/", { state: { user: "yes" } });
      } else if (response.ok == "shop") {
        navigate("/userDashboard");
      } else {
        // Handle unsuccessful login
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>{isShopLogin ? "Shop Login" : "User Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isShopLogin ? (
            <>
              <label htmlFor="shopName">Shop Name:</label>
              <input
                type="text"
                id="shopName"
                value={formData.shopName}
                onChange={handleChange}
                placeholder="Enter shop name"
              />

              <label htmlFor="licenseNo">License No:</label>
              <input
                type="text"
                id="licenseNo"
                value={formData.licenseNo}
                onChange={handleChange}
                placeholder="Enter license number"
              />
            </>
          ) : (
            <>
              <label htmlFor="userName">Name:</label>
              <input
                type="text"
                id="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </>
          )}

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <button onClick={handleLoginTypeChange}>
            {isShopLogin ? "Login as User" : "Login as Shop"}
          </button>

          <button type="submit">Submit</button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
