// ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { product_name, price } = product;
  const name = product_name;
  const image = "car.jpg";
  const rating = 4.5;
  const description = "This is a car";
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/productDetails", { state: { product } });
  };

  return (
    <div
      className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
      onClick={handleCardClick}
    >
      <div className="max-w-md rounded overflow-hidden shadow-lg">
        <img src={image} alt={name} className="w-full h-48 object-cover" />

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>

        <div className="px-6 pt-2 pb-2 flex justify-between items-center">
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            Rating: {rating}
          </span>
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            ${price}
          </span>
        </div>

        <div className="px-6 py-2">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
