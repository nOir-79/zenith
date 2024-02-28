import React, { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import "../styles/slider.css";
const Slider = ({ products }) => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    const newIndex =
      index === 0 ? Math.max(products.length - 3, 0) : Math.max(index - 1, 0);
    setIndex(newIndex);
    console.log("prevSlide", index);
  };
  const nextSlide = () => {
    const newIndex =
      index === products.length - 4
        ? 0
        : Math.min(index + 1, products.length - 3);
    setIndex(newIndex);
  };

  return (
    <div className="product-slider">
      <div className="product">
        <div className="prev" onClick={prevSlide}>
          <GrFormPrevious />
        </div>
        {products.slice(index, index + 3).map((product, index) => {
          return (
            <div className="product" key={index}>
              <div className="product-inside">
                <img src="car.jpg" alt="" />
                <div className="description">
                  <h2 className="product-name">{product.name}</h2>
                </div>
              </div>
            </div>
          );
        })}
        <div className="next" onClick={nextSlide}>
          <MdOutlineNavigateNext />
        </div>
      </div>
    </div>
  );
};

export default Slider;
