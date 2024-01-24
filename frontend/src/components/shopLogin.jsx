import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/shopLogin.css";
function login() {
  const [formData, setFormData] = useState({ license_no: "", password: "" });
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

    try {
      const response = await fetch("http://localhost/3000/shoplogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("login successful");
        // Redirect to a new page upon successful login
        navigate("/");
      } else {
        // Handle unsuccessful login (show error message, etc.)
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="shop-body">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form className="signup-form" onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className="input"
              type="text"
              name="txt"
              placeholder="Shop Name"
              required=""
            />
            <input
              className="input"
              type="text"
              name="license_no"
              placeholder="License NO"
              required=""
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              required=""
            />
            <button className="button">Sign up</button>
          </form>
        </div>
        <div className="login">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              className="input"
              type="text"
              name="license_no"
              id="license_no"
              placeholder="Email"
              value={formData.license_no}
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
            <button className="button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;
