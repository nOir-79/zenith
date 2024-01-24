import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowProduct from "../components/productDisplay";

const ShowProduct = ({ licenseNo }) => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const handleNavigateToShowProduct = () => {
    navigate("/productDetails", { state: { license_no: `licenserNo` } });
  };

  useEffect(() => {
    // Fetch product data based on the provided licenseNo
    fetch("http://localhost:3000/shop/show_products")
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error("Error fetching product data:", error));
  }, [licenseNo]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
    </div>
  );
};

export default ShowProduct;
