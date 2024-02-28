import React, { useEffect } from "react";
import {
  CiCircleChevLeft,
  CiCircleChevRight,
  CiLocationOn,
} from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { MdChevronRight, MdOutlineMail } from "react-icons/md";
import "../styles/home_page.css";
import DiscountedSlider from "./discounted_slider.jsx";
import Footer from "./footer.jsx";
import Header from "./header.jsx";
import Slider from "./slider.jsx";
function HomePage(user) {
  const isUserPage = user["user"];
  const products = [
    {
      name: "Car",
      description: "This is a car",
      price: 10000,
    },
    {
      name: "Bike",
      description: "This is a bike",
      price: 1000,
    },
    {
      name: "Truck",
      description: "This is a truck",
      price: 100000,
    },
    {
      name: "Scooter",
      description: "This is a scooter",
      price: 100,
    },
    {
      name: "Ca",
      description: "This is a car",
      price: 10000,
    },
    {
      name: "Bik",
      description: "This is a bike",
      price: 1000,
    },
    {
      name: "Truc",
      description: "This is a truck",
      price: 100000,
    },
    {
      name: "Scoot",
      description: "This is a scooter",
      price: 100,
    },
    {
      name: "C",
      description: "This is a car",
      price: 10000,
    },
    {
      name: "Bi",
      description: "This is a bike",
      price: 1000,
    },
    {
      name: "Tru",
      description: "This is a truck",
      price: 100000,
    },
    {
      name: "Sco",
      description: "This is a scooter",
      price: 100,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/");
        const data = await response.json();
        console.log("Data:", data);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="homePage">
        {isUserPage ? <Header userPage={true} /> : <Header userPage={false} />}
        <div id="horizontal-bar"></div>
        <div className="homepage-featured-content">
          <div className="featured-before-slide">
            <h1>Discover the Best Deals Online Today</h1>
            <div className="featured-before-slide-right">
              <p>
                Find a wide range of featured Products and exclusive deals.Shop
                now and save!
              </p>
              <div className="featured-shop-learn-more">
                <button className="featured-shop">Shop</button>
                <button>Learn More</button>
              </div>
            </div>
          </div>

          <div className="featured-slider">
            <Slider products={products} />
          </div>
        </div>
        <div className="homepage-discounted-content">
          <div className="homepage-discounted-content-left">
            <h1>Find Your Perfect Products Online</h1>
            <p>
              Explore our curated collection of featured products from various
              categories. Whether you're looking for electronics, fashion, home
              decor, or more, we have it all.
            </p>
            <div className="discounted-buttons">
              <h2 id="learn-more">Learn More</h2>
              <div className="discounted-signUp">
                <h2>Sign Up</h2>
                <MdChevronRight />
              </div>
            </div>
          </div>
          <div className="homepage-discounted-content-right">
            <DiscountedSlider products={products} />
          </div>
        </div>
        <div className="homepage-shopSignup">
          <h1>Join our online marketplace today!</h1>
          <p>
            Connect with millions of buyers and start selling your products.
          </p>
          <div className="homepage-shopSignup-buttons">
            <h2 className="homepage-shopSignup-buttons-signUp">Sign Up</h2>
            <h2>Learn More</h2>
          </div>
        </div>
        <div className="platform-review">
          <CiCircleChevLeft className="platform-review-icons" />
          <div className="platform-review-review">
            <h1>Webflow</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              in nam odio! Libero error itaque quasi quisquam, laboriosam
              mollitia voluptates?
            </p>
          </div>
          <CiCircleChevRight className="platform-review-icons" />
        </div>

        <div className="frequently-asked">
          <h1>Frequently Asked Questions</h1>
          <h3>Find answers to common questions for both buyers and sellers.</h3>
          <div className="question-answer">
            <div>
              <h2>How to create an account?</h2>
              <p>
                To create an account, click on the 'Sign Up' button and follow
                the prompts. You will need to provide your name, email address,
                and create a password.
              </p>
            </div>
            <div>
              <h2>How to place an order?</h2>
              <p>
                To place an order, simply find the product you want, add it to
                your cart, and proceed to checkout. Follow the steps to enter
                your shipping address and payment information.
              </p>
            </div>
            <div>
              <h2>How to track my order?</h2>
              <p>
                To track your order, go to the 'Orders' section in your account.
                You will find the status and tracking information for each of
                your orders.
              </p>
            </div>
            <div>
              <h2>How to contact customer support?</h2>
              <p>
                To contact customer support, visit our 'Contact Us' page or send
                an email to support@example.com. Our team will be happy to
                assist you.
              </p>
            </div>
            <div>
              <h2>How to become a seller?</h2>
              <p>
                To become a seller, click on the 'Sell' button and follow the
                instructions to set up your seller account. You will need to
                provide some basic information about your business.
              </p>
            </div>
            <div>
              <h2>How to list a product?</h2>
              <p>
                To list a product, go to your seller dashboard and click on the
                'Add New Product' button. Fill in the required details, such as
                product name, description, and price.
              </p>
            </div>
            <div>
              <h2>How to manage orders?</h2>
              <p>
                To manage orders, go to your seller dashboard and navigate to
                the 'Orders' section. Here, you can view and process orders,
                update order status, and communicate with buyers.
              </p>
            </div>
            <div>
              <h2>How to handle returns?</h2>
              <p>
                To handle returns, review our return policy and guidelines. If a
                buyer requests a return, follow the instructions provided and
                communicate with the buyer to resolve the issue.
              </p>
            </div>
            <div>
              <h2>How to leave feedback?</h2>
              <p>
                To leave feedback, go to the 'Orders' section in your account
                and find the order for which you want to leave feedback. Click
                on the 'Leave Feedback' button and follow the prompts.
              </p>
            </div>
            <div>
              <h2>How to reset password?</h2>
              <p>
                To reset your password, click on the 'Forgot Password' link on
                the login page. Follow the instructions to reset your password.
              </p>
            </div>
          </div>
          <div className="questionsLeft">
            <h1>Still have questions?</h1>
            <p>Contact our customer support for further assistance.</p>
            <button className="questionsLeft-contact">Contact</button>
          </div>
        </div>

        <div className="home-getInTouch">
          <div className="left">
            <h1>Get in Touch</h1>
            <p>
              We're here to help. Fill out the form below and we'll get back to
              you as soon as possible.
            </p>
          </div>
          <div className="right">
            <div>
              <MdOutlineMail className="GetInTouch-icons" />
              <div className="inner-div">
                <h2>Email</h2>
                <a href="#">shakshor123@gmail.com</a>
              </div>
            </div>
            <div>
              <FaPhoneAlt className="GetInTouch-icons" />
              <div className="inner-div">
                <h2>Phone</h2>
                <a href="#">+123 456 7890</a>
              </div>
            </div>
            <div>
              <CiLocationOn className="GetInTouch-icons" />
              <div className="inner-div">
                <h2>Office</h2>
                <p>123 Main Street, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default HomePage;

// const categories = category.map((item) => item.key);
// const subcategory = category.flatMap((item) =>
//   item.value.map((subItem) => subItem.cat)
// );
// const categoryMap = {};

// category.forEach((item) => {
//   const categories = item.key.toLowerCase();
//   const subcategories = item.value.map((subItem) =>
//     subItem.cat.toLowerCase()
//   );
//   categoryMap[categories] = subcategories;
// });
// console.log("Category:", categories);
// console.log("Subcategory:", subcategory);
// console.log("Category Map:", categoryMap);
// setCategories(categories);
// setSubcategories(categoryMap);
// const [categories, setCategories] = useState([]);
// const [subcategories, setSubcategories] = useState({});
