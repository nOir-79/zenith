import React from "react";
import { CiFilter } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import "../styles/productDisplay.css";
import { useData } from "./Datacontext.jsx";
import Footer from "./footer.jsx";
import Header from "./header.jsx";
import ProductCard from "./productCard";
const ProductDisplay = () => {
  let products;
  const navigate = useNavigate();
  const {
    showProduct,
    setShowProduct,
    subcategoryClicked,
    setClickedSubcategory,
    subProducts,
    setsubProducts,
    searchText,
    setSearchText,
  } = useData();
  console.log("inside product display component", subProducts);
  if (subcategoryClicked) {
    products = subProducts;
  } else {
    products = showProduct;
  }
  console.log("products", products);
  const handleBackButtonClick = () => {
    setShowProduct([]);
    setClickedSubcategory("");
    // setProductsundersubcategory([]);
    navigate("/");
  };
  console.log(products);
  return (
    <div className="product-display-outer">
      <Header />
      <div className="product-display-top">
        <button
          onClick={handleBackButtonClick}
          className="back-button-2 rounded"
        >
          Back
        </button>
        <h1>SEARCH RESULTS FOR "{searchText}"</h1>
        <div className="filter-search-result">
          <CiFilter />
          <p>FILTER</p>
        </div>
      </div>

      <div className="product-display">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDisplay;
