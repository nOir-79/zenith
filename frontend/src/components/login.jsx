import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";
function login() {
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    name: "",
    phone_number: "",
    password: "",
  });
  const handleChangeSignUp = (e) => {
    const { id, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
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
      const customer_data = await response.json();
      console.log("Here");

      if (response.status == 200) {
        // Redirect to a new page upon successful login
        console.log("login successful");
        navigate("/customerProfile", { state: customer_data });
      } else {
        // Handle unsuccessful login (show error message, etc.)
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("here");
    try {
      const response = await fetch("http://localhost:3000/customerSignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        navigate("/afterSignup");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
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
          <form className="signup-form" onSubmit={handleSignup}>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className="input"
              type="text"
              name="user_name"
              placeholder="User name"
              id="name"
              value={signupData.name}
              required=""
              onChange={handleChangeSignUp}
            />
            <input
              className="input"
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              id="phone_number"
              value={signupData.phone_number}
              required=""
              onChange={handleChangeSignUp}
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              value={signupData.password}
              required=""
              onChange={handleChangeSignUp}
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
