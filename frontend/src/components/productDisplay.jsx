import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/productDisplay.css";
import ProductCard from "./productCard";
const ProductDisplay = () => {
  const location = useLocation();
  const { products } = location.state;
  console.log(products);
  return (
    <div className="product-display">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductDisplay;
