import { message } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import "../styles/product_details.css";
import { useData } from "./Datacontext.jsx";
import Footer from "./footer.jsx";
import Header from "./header.jsx";
const ProductDetailsPage = () => {
  const {
    customerData,
    isLoggedIn,
    clickedProduct,
    setClickedProduct,
    cartProducts,
    setCartProducts,
  } = useData();
  const product = clickedProduct;
  const phone_number = customerData[0].phone_number;
  console.log(customerData[0].phone_number);
  console.log("clicked product:", product);
  const {
    product_name,
    brand_name,
    price,
    id,
    shop_license,
    image,
    discounted_price,
    discount,
    description,
    specification,
  } = product;
  console.log("product", product);
  const name = product_name;
  const Rating = 4.5;
  const [reviews, setReviews] = useState([]);
  const [opinion, setOpinion] = useState("");
  const [rating, setRating] = useState(0);
  const [quantityCounter, setQuantityCounter] = useState(1);
  const handleAddQuantity = () => {
    setQuantityCounter(quantityCounter + 1);
    console.log("quantityCounter", quantityCounter);
  };
  const handleReduceQuantity = () => {
    if (quantityCounter > 1) {
      setQuantityCounter(quantityCounter - 1);
    }
  };
  const handleSubmit = async (event) => {
    console.log("inside submit review", phone_number);
    event.preventDefault();
    if (isLoggedIn == false) {
      alert("Please login to submit review");
      return;
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
            shop_license: shop_license,
            customer_phone: phone_number,
            opinion: opinion,
            rating: rating,
          }),
        });

        if (response.status !== 200) {
          throw new Error("Error submitting review");
        } else if (response.status == 200) {
          console.log("Review submitted successfully");
          setReviews([...reviews, { phone_number, name, opinion, rating }]);
          setOpinion("");
          setRating("");
        }
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  const handleAddToCart = async () => {
    if (isLoggedIn == false) {
      message.error("Please login to add to cart");
      return;
    } else {
      try {
        const response = await fetch("http://localhost:3000/add_to_cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_phone: phone_number,
            products: [
              {
                product_id: id,
                license: shop_license,
                quantity: quantityCounter,
              },
            ],
          }),
        });
        if (response.status == 200) {
          console.log("Product added to cart");
          message.success("Product added to cart");
        } else {
          message.error("error");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        message.error("Error adding to cart");
      }
    }
  };
  useEffect(() => {
    console.log("inside the function");
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3000/show_reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id: id, shop_license: license_no }),
        });
        console.log("response", response.status);

        if (response.status === 200) {
          const res = await response.json();
          console.log("res", res);
          setReviews(res);
        } else {
          console.error("Error fetching reviews");
        }
      } catch (error) {
        console.error("Error during fetch reviews:", error);
      }
    };
    console.log("Inside use effect");
    fetchReviews();
  }, []);
  return (
    <div>
      <Header />
      <div className="top-product">
        <div className="top-left-product">
          <div className="product-name-top">
            <h1>{name}</h1>
          </div>
          <h2>{brand_name}</h2>
        </div>
        <div className="top-middle-product">
          <img src={image} alt="" />
        </div>
        <div className="top-right-product">
          <div className="top-right-product-inner">
            <div className="top-right-product-reviews">
              <p>Reviews:</p>
              <p className="second">{Rating}</p>
            </div>
            <div className="top-right-product-price">
              <p>Price:</p>
              <p className="second">{price}</p>
            </div>
            <div className="top-right-product-quantity">
              <p>Quantity</p>
              <div className="product-quantity-counter">
                <button>
                  <FiMinus className="icons" onClick={handleReduceQuantity} />
                </button>

                <p className="second">{quantityCounter}</p>
                <button>
                  <GoPlus className="icons" onClick={handleAddQuantity} />
                </button>
              </div>
            </div>
            <p className="add-to-cart-product" onClick={handleAddToCart}>
              ADD TO CART
            </p>
          </div>
        </div>
      </div>
      <div className="bottom-product">
        {/* <div className="product-details">
          <h2>Product Details</h2>
          <p>{description}</p>
        </div> */}

        <div className="product-reviews">
          <h2>REVIEWS</h2>
          <div className="product-reviews-list">
            {reviews.map((review, index) => (
              <div className="actual-reviews" key={index}>
                <p className="reviewer-rating">Rating: {review.rating}</p>
                <h3 className="reviewer-name">{review.name}</h3>
                <p className="reviewer-opinion">{review.opinion}</p>
                <div className="product-review-report">
                  <p>Helpful?</p>
                  <AiOutlineLike className="like-icon" />
                  <AiOutlineDislike className="dislike-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="add-review">
          <h1>Add Review</h1>
          <form className="add-review-form" onSubmit={handleSubmit}>
            <div className="add-rating">
              <label className="add-review-label" htmlFor="rating">
                Rating:
              </label>
              <input
                className="add-review-rating"
                type="number"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
                required
              />
            </div>
            <div className="add-opinion">
              <label className="add-review-label" htmlFor="opinion">
                Opinion:
              </label>
              <input
                placeholder="Opinion on the product"
                className="add-review-opinion"
                type="text"
                id="opinion"
                value={opinion}
                onChange={(e) => setOpinion(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-review-form">
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* <div>
        <h2>Reviews</h2>
        <div>
          {reviews.map((review, index) => (
            <div key={index}>
              <h3>{review.name}</h3>
              <p>Phone Number: {review.phone_number}</p>
              <p>Opinion: {review.opinion}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* <div className="add_reviews">
        <form onSubmit={handleSubmit}>
          <label className="review-input  ">
            Review:
            <textarea
              className=""
              value={opinion}
              onChange={(event) => setOpinion(event.target.value)}
            />
          </label>
          <label className="rating-input ">
            Rating:
            <input
              className=""
              type="text"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            />
          </label>
          <button className="" type="submit">
            Submit Review
          </button>
        </form>
      </div> */}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
