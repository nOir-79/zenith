// ProductCard.jsx
import { Image } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/productCard.css";
import { useData } from "./Datacontext";
const ProductCard = ({ product }) => {
  const cartData = async () => {
    const response = await fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product,
      }),
    });
  };
  const {
    isLoggedIn,
    setIsLoggedIn,
    cartProducts,
    setCartProducts,
    clickedProduct,
    setClickedProduct,
  } = useData();
  console.log("product", product);
  const { product_name, price, image } = product;
  const name = product_name;
  const ratings = 4.5;
  const description = "This is a car";
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    console.log("product", product);
    setClickedProduct(product);
    navigate("/productDetails");
  };

  const handleAddToCart = () => {
    if (isLoggedIn == false) {
      alert("Please login to add to cart");
    } else {
      setCartProducts([...cartProducts, product]);
    }
  };
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  const handleHoverEnter = () => {
    setIsHovered(true);
    console.log("Hovered");
  };
  const handleHoverLeave = () => {
    setIsHovered(false);
    console.log("Not hovered");
  };

  return (
    <div className="product-card">
      <div
        className="product-card-image"
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
      >
        {/* <img src={image} alt="" /> */}
        <Image width={280} src={image} />
        {isHovered && (
          <div className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </div>
        )}
      </div>
      <div className="product-card-details" onClick={handleCardClick}>
        <h1>{truncateText(name, 25)}</h1>
        <h3>{price}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
