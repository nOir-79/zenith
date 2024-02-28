import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useData } from "./Datacontext.jsx";

const ProductDetailsPage = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const { customerData, isLoggedIn } = useData();
  const phone_number = customerData[0].phone_number;
  console.log(customerData[0].phone_number);
  console.log(product);
  const { name, price, id, license_no } = product;
  console.log("product", product);
  const description = "This is a car";
  const Rating = 4.5;
  const image = "car.jpg";
  let reviews = [];
  const [opinion, setOpinion] = useState("");
  const [rating, setRating] = useState(0);
  const handleSubmit = async (event) => {
    if (isLoggedIn == false) {
      alert("Please login to submit review");
    } else {
      try {
        console.log("inside submit review");
        const response = await fetch("http://localhost:3000/submit_review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: id,
            shop_license: license_no,
            customer_phone: phone_number,
            opinion: opinion,
            rating: rating,
          }),
        });

        if (response.status !== 200) {
          throw new Error("Error submitting review");
        } else if (response.status == 200) {
          console.log("Review submitted successfully");
          setOpinion("");
          setRating("");
        }
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3000/show_reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id: id, shop_license: license_no }),
        });

        if (response.status === 200) {
          reviews = await response.json();
          console.log("reviews", reviews);
        } else {
          console.error("Error fetching reviews");
        }
      } catch (error) {
        console.error("Error during fetch reviews:", error);
      }
    };
    fetchReviews();
  }, []);
  return (
    <div>
      <div className="w-full flex justify-center items-center">
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
              <h1 className="text-2xl font-bold mb-2">{name}</h1>

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
      </div>
      <div className="show_review">
        <h2>Reviews</h2>
        <div>
          {reviews.map((review) => (
            <div key={review.id}>
              <h3>{review.opinion}</h3>
              <h4>{review.rating}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className="add_reviews">
        <form onSubmit={handleSubmit}>
          <label className="review-input  text-green-500">
            Review:
            <textarea
              className="bg-gray-100"
              value={opinion}
              onChange={(event) => setOpinion(event.target.value)}
            />
          </label>
          <label className="rating-input text-green-500">
            Rating:
            <input
              className="bg-gray-100"
              type="text"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            />
          </label>
          <button className="bg-blue-500" type="submit">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
