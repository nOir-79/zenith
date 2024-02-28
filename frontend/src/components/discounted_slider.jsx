import React, { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import "../styles/discounted_slider.css";

const ProductSlider = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevProduct = () => {
    const newIndex =
      currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNextProduct = () => {
    const newIndex =
      currentIndex === products.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="discounted-product-slider">
      <button onClick={goToPrevProduct} className="prev">
        <GrFormPrevious />
      </button>
      <div className="discounted-product">
        <img src={"car.jpg"} alt={products[currentIndex].name} />
        <h2 className="product-name"> {products[currentIndex].name}</h2>
      </div>
      <button onClick={goToNextProduct} className="next">
        <MdOutlineNavigateNext />
      </button>
    </div>
  );
};

export default ProductSlider;
