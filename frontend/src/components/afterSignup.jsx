import React from "react";
import { useNavigate } from "react-router-dom";

function afterSignup() {
  navigate = useNavigate();

  const handleBack = () => {
    navigate("/login");
  };
  return (
    <>
      <button onClick={handleBack}>back</button>
      <div>
        <h1>Signup Successful</h1>
      </div>
    </>
  );
}

export default afterSignup;
