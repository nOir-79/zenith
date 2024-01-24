import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/productDisplay.css";
import ProductCard from "./productCard";
const ProductDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const { products } = location.state;
  const handleBackButtonClick = () => {
    navigate("/");
  };
  console.log(products);
  return (
    <div className="product-display">
      <button
        onClick={handleBackButtonClick}
        className="absolute top-0 left-0 m-4 p-2 bg-blue-500 text-white rounded"
      >
        Back
      </button>
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductDisplay;
