import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "../styles/footer.css";

const Footer = () => {
  return (
    <>
      <footer className="page-footer">
        <div className="top">
          <div className="left">there's going to be a logo here</div>
          <div className="middle">
            <div className="about-us">
              <h2>About Us</h2>
              <a href="#">Shop</a>
              <a href="#">FAQ</a>
              <a href="#">Contact Us</a>
              <a href="#">Returns</a>
              <a href="#">Shipping</a>
            </div>
            <div className="customer-support">
              <h2>Customer Support</h2>
              <a href="#">Track Order</a>
              <a href="#">Account</a>
              <a href="#">Wishlist</a>
              <a href="#">Gift Cards</a>
              <a href="#">Blog</a>
            </div>
            <div className="careers">
              <h2>Carrers</h2>
              <a href="#">Affiliate</a>
              <a href="#">Press</a>
              <a href="#">Partners</a>
              <a href="#">Investors</a>
              <a href="#">Sustainability</a>
            </div>
          </div>
          <div className="right">
            <h1>Subscribe</h1>
            <p>
              Join our community to receive updates on new products and
              promotions.
            </p>
            <div className="newsletter">
              <input type="text" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
            <p>
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from us.
            </p>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <p>© 2023 OurCompany. All rights reserved.</p>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Settings</a>
          </div>
          <div className="right">
            <FaFacebook />
            <FaInstagram />
            <FaXTwitter />
            <FaYoutube />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
