import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/productDisplay.css";
import { useData } from "./Datacontext.jsx";
import ProductCard from "./productCard";
const ProductDisplay = () => {
  let products;
  const navigate = useNavigate();
  const {
    showProduct,
    setShowProduct,
    subcategoryClicked,
    setClickedSubcategory,
    productsundersubcategory,
    setProductsundersubcategory,
  } = useData();
  if (subcategoryClicked) {
    products = productsundersubcategory;
  } else {
    products = showProduct;
  }
  const handleBackButtonClick = () => {
    setShowProduct([]);
    setClickedSubcategory("");
    setProductsundersubcategory([]);
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
