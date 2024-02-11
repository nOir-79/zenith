import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/deleteProduct.css";
// Import CSS file for styling

const ObjectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product_id, license_no, shopData } = location.state || {};
  async function handleClick() {
    try {
      const response = await fetch("http://localhost:3000/deleteProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product_id,
          license_no: license_no,
        }),
      });

      if (response.status == 200) {
        console.log("Delete successful");
        navigate("/shopProfile", { state: { shopData: shopData } });
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  }

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <>
      <h1>Deletion</h1>
    </>
  );
};

export default ObjectPage;
