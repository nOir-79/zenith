import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ProductDetailsPage = () => {
  const location = useLocation();
  const { product } = location.state || {};
  console.log(product);
  const { product_name, price } = product;
  const description = "This is a car";
  const Rating = 4.5;
  const image = "car.jpg";
  return (
    <body className="w-full flex justify-center items-center">
      <div className="container mx-auto mt-8 flex justify-center items-center w-1/2">
        {/* Product Image */}
        <div className="w-1/2">
          <img
            src={image}
            alt="Product"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Product Information */}
        <div className="w-1/2 bg-gray-100 p-4 rounded-lg flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product_name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 mr-2">⭐⭐⭐⭐⭐</span>
              <span className="text-gray-600">(5 reviews)</span>
            </div>

            {/* Price */}
            <p className="text-lg font-bold text-green-600 mb-2">${price}</p>

            {/* Description */}
            <p className="text-gray-700 mb-4">{description}</p>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 mb-2">
            Add to Cart
          </button>

          {/* Social Media Icons */}
          <div className="flex justify-between">
            <div className="flex">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-2xl text-pink-500 mr-2 cursor-pointer" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-2xl text-blue-600 mr-2 cursor-pointer" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-2xl text-blue-400 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default ProductDetailsPage;
