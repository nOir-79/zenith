import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/shopLogin.css";
function login() {
  const [formData, setFormData] = useState({ license_no: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    license_no: "",
    phone_number: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSignupChange = (e) => {
    const { id, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/shopSignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      const response_json = await response.json();
      console.log("response", response_json);
      data = response_json[0];
      if (response.status == 200) {
        console.log("signup successful");
        navigate("/shopProfile", { state: { shopData: data[0] } });
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("here");

    try {
      const response = await fetch("http://localhost:3000/shopLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("data", data[0]);
      // console.log(data);
      if (response.status == 200) {
        console.log("login successful");
        // Redirect to a new page upon successful login
        navigate("/shopProfile", { state: { shopData: data[0] } });
      } else {
        // Handle unsuccessful login (show error message, etc.)
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:");
    }
  };

  return (
    <div className="shop-body">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="shop-signup">
          <form className="signup-form" onSubmit={handleSignup}>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className="input"
              type="text"
              name="txt"
              id="name"
              placeholder="Name"
              required=""
              value={signupData.name}
              onChange={handleSignupChange}
            />
            <input
              className="input"
              type="text"
              name="txt"
              id="license_no"
              placeholder="License NO"
              required=""
              value={signupData.license_no}
              onChange={handleSignupChange}
            />
            <input
              className="input"
              type="text"
              name="phone_number"
              id="phone_number"
              placeholder="Phone Number"
              required=""
              value={signupData.phone_number}
              onChange={handleSignupChange}
            />
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required=""
              value={signupData.password}
              onChange={handleSignupChange}
            />
            <button className="button" type="submit">
              Sign up
            </button>
          </form>
        </div>
        <div className="shop-login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              className="input"
              type="text"
              name="license_no"
              id="license_no"
              placeholder="License NO"
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
            <button className="button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;
