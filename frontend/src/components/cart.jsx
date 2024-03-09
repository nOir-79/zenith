import React, { useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";
import { useData } from "./Datacontext.jsx";
import Footer from "./footer.jsx";
import Header from "./header.jsx";
const Cart = () => {
  const Navigate = useNavigate();
  const {
    isLoggedIn,
    setIsLoggedIn,
    cartProducts,
    setCartProducts,
    customerData,
    totalAmount,
    setTotalAmount,
  } = useData();
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/show_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_phone: customerData[0].phone_number,
        }),
      });
      const data = await response.json();
      setCartProducts(data);
      setProducts(data);
      console.log("data:", data);
    } catch (error) {
      console.error("Error loading products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const loadProducts = async () => {
    try {
      const response = await fetch("https");
    } catch (error) {
      console.error("Error loading products", error);
    }
  };

  const handleAddProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantityCounter++;
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantityCounter--;
    setProducts(updatedProducts);
  };
  console.log("cartProducts", cartProducts);

  const handleRemove = () => {
    setCartProducts([]);
    console.log("Removed from cart");
  };
  const handleDeleteClick = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setCartProducts(updatedProducts);
    setProducts(updatedProducts);
  };
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:3000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_phone: customerData[0].phone_number,
        }),
      });
      const res = await response.json();
      if (response.status == 200) {
        console.log("checkout successful");
        setTotalAmount(res);
        setProducts([]);
        Navigate("/payment");
      } else {
        console.error("Checkout failed");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  if (isLoggedIn == false) {
    return (
      <div>
        <h1>Please login to view your cart</h1>
      </div>
    );
  } else {
    return (
      <div className="cart-page">
        <Header />
        <div className="shopping-cart">
          <h1>Your cart</h1>
          <div className="shopping-cart-inner">
            {products.map((product, index) => (
              <div className="cart-product" key={index}>
                <div className="cart-product-left">
                  <div className="cart-product-image">
                    <img src={product.image} alt="" />
                  </div>
                </div>
                <div className="cart-product-middle">
                  <h2 className="items">{product.product_name}</h2>
                  <div className="cart-product-quantity items">
                    <button>
                      <FiMinus onClick={() => handleRemoveProduct(index)} />
                    </button>

                    <p>{product.quantity}</p>
                    <button>
                      <GoPlus onClick={() => handleAddProduct(index)} />
                    </button>
                  </div>
                </div>
                <div className="cart-product-right">
                  <MdDelete
                    className="items"
                    onClick={() => handleDeleteClick(index)}
                  />
                  <p className="items">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <div>
          <button onClick={handleCheckout}>Checkout</button>
        </div> */}
        </div>
        <div className="cart-checkout">
          <button onClick={handleCheckout}>Check Out</button>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Cart;
