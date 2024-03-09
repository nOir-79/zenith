import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./Datacontext.jsx";

import "../styles/login.css";
function login() {
  const {
    customerData,
    setCustomerData,
    isLoggedIn,
    setIsLoggedIn,
    shopData,
    setShopData,
    isShopLoggedIn,
    setIsShopLoggedIn,
  } = useData();
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });
  const [loginClicked, setLoginClicked] = useState(false);
  const [shopLogin, setShopLogin] = useState({
    license_no: "",
    password: "",
  });
  const handleChangeShopLogin = (e) => {
    const { id, value } = e.target;
    setShopLogin((prevData) => ({
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

  const handleShopSignup = () => {
    navigate("/shopSignup");
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
      console.log("phone number", customer_data[0].phone_number);

      if (response.status == 200) {
        // Redirect to a new page upon successful login
        console.log("login successful");
        setIsLoggedIn(true);
        message.success("Login successful");

        console.log("customer_data", customer_data);
        setCustomerData(customer_data);
        navigate("/");
      } else {
        // Handle unsuccessful login (show error message, etc.)
        console.error("Login failed");
        message.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      message.error("Login failed");
    }
  };
  const handleSignup = async (e) => {
    // e.preventDefault();
    // console.log("here");
    // try {
    //   const response = await fetch("http://localhost:3000/customerSignUp", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(signupData),
    //   });
    //   const data = await response.json();
    //   console.log(data);
    //   if (response.status == 200) {
    //     navigate("/afterSignup");
    //   } else {
    //     console.error("Signup failed");
    //   }
    // } catch (error) {
    //   console.error("Error during signup:", error);
    // }

    e.preventDefault();
    console.log("here");

    try {
      const response = await fetch("http://localhost:3000/shopLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopLogin),
      });
      const data = await response.json();
      console.log("data", data[0]);
      // console.log(data);
      if (response.status == 200) {
        console.log("login successful");
        message.success("Login successful");
        // Redirect to a new page upon successful login
        setShopData(data[0]);
        setIsShopLoggedIn(true);
        navigate("/shopProfile");
      } else {
        // Handle unsuccessful login (show error message, etc.)
        console.error("Login failed");
        message.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:");
      message.error("Login failed");
    }
  };
  const handleUserSignup = () => {
    navigate("/userSignup");
  };
  const handleUserLoginClicked = () => {
    setLoginClicked(!loginClicked);
  };
  const handleShopLogin = () => {
    navigate("/shopLogin");
  };
  const handleBackButton = () => {
    navigate("/");
  };

  return (
    <div className="customer-login">
      <button onClick={handleBackButton} className="back-button">
        Back
      </button>
      {/* {!loginClicked && <button className="shopLogin">LOGIN AS AHOP</button>}

      {loginClicked && <button className="shopLogin">login</button>} */}

      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          {/* <form className="signup-form" onSubmit={handleSignup}>
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
          </form> */}
          <form className="signup-form" onSubmit={handleSignup}>
            <label htmlFor="chk" aria-hidden="true">
              SHOP LOGIN
            </label>
            <input
              className="input"
              type="text"
              name="license_no"
              placeholder="License No"
              id="license_no"
              value={shopLogin.license_no}
              required=""
              onChange={handleChangeShopLogin}
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              value={shopLogin.password}
              required=""
              onChange={handleChangeShopLogin}
            />
            <button className="button" type="submit">
              LOGIN
            </button>
            <div className="shop-signup">
              <p>Don't have an account yet?</p>
              <p id="start-here-shop" onClick={handleShopSignup}>
                Create Account
              </p>
            </div>
          </form>
        </div>
        <div className="login">
          <form onSubmit={handleLogin} onClick={handleUserLoginClicked}>
            <label htmlFor="chk" aria-hidden="true">
              USER LOGIN
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
            <button className="button lgbtn" id="customer-login" type="submit">
              Login
            </button>
            <div className="user-signup">
              <p>Don't have an account yet?</p>
              <p onClick={handleUserSignup} id="start-here-user">
                Create Account
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;
