// LoginPage.jsx

import React, { useState } from "react";
import "../styles/login.css"; // Import the corresponding CSS file

const LoginPage = () => {
  const [isShopLogin, setIsShopLogin] = useState(false);

  const handleLoginTypeChange = () => {
    setIsShopLogin((prevIsShopLogin) => !prevIsShopLogin);
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>{isShopLogin ? "Shop Login" : "User Login"}</h2>
        {isShopLogin ? (
          <>
            <label htmlFor="shopName">Shop Name:</label>
            <input type="text" id="shopName" placeholder="Enter shop name" />

            <label htmlFor="licenseNo">License No:</label>
            <input
              type="text"
              id="licenseNo"
              placeholder="Enter license number"
            />
          </>
        ) : (
          <>
            <label htmlFor="userName">Name:</label>
            <input type="text" id="userName" placeholder="Enter your name" />
          </>
        )}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
        />

        <button onClick={handleLoginTypeChange}>
          {isShopLogin ? "Login as User" : "Login as Shop"}
        </button>

        <button>Submit</button>
      </div>
    </div>
  );
};

export default LoginPage;
