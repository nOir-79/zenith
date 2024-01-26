import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";
function login() {
  const [formData, setFormData] = useState({ phone_number: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("here");

    try {
      const response = await fetch("http://localhost:3000/customerlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Here");

      if (response.ok) {
        // Redirect to a new page upon successful login
        console.log("login successful");
        navigate("/");
      } else {
        // Handle unsuccessful login (show error message, etc.)
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const handleShopLogin = () => {
    navigate("/shopLogin");
  };
  const handleBackButton = () => {
    navigate("/");
  };

  return (
    <div className="login-body">
      <button onClick={handleBackButton} className="back-button">
        Back
      </button>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form className="signup-form">
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className="input"
              type="text"
              name="txt"
              placeholder="User name"
              required=""
            />
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              required=""
            />
            <button className="button" type="submit">
              Sign up
            </button>
          </form>
        </div>
        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              className="input"
              type="text"
              name="phone_number"
              id="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
            />
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button className="button lgbtn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
      <button onClick={handleShopLogin} className="shopLogin">
        login as shop
      </button>
    </div>
  );
}

export default login;
