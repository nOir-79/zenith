import React from "react";

function login() {
  return (
    <>
      <div className="style.body">
        <div className="style.main">
          <input
            className="style.input"
            type="checkbox"
            id="chk"
            aria-hidden="true"
          />
        </div>
        <div className="style.signup">
          <form action="">
            <label
              className="style.label"
              htmlFor="style#chk"
              aria-hidden="true"
            >
              Sign up
            </label>
            <input
              className="style.input"
              type="text"
              name="txt"
              placeholder="User name"
              required=""
            />
            <input
              className="style.input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
            />
            <input
              className="style.input"
              type="password"
              name="password"
              placeholder="Password"
              required=""
            />
            <button className="style.button">Sign up</button>
          </form>
        </div>
        <div className="style.login">
          <form action="">
            <label className="style.label" htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              className="style.input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
            />
            <input
              className="style.input"
              type="password"
              name="password"
              placeholder="Password"
              required=""
            />
            <button className="style.button">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default login;
