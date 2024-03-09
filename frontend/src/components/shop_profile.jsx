import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../styles/shopProfile.css";
import { useData } from "./Datacontext.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Order from "./order.jsx";
const ShopProfile = () => {
  const {
    shopData,
    setShopData,
    shopLicense,
    setShopLicense,
    orderData,
    setOrderData,
    clickedProduct,
    setClickedProduct,
  } = useData();
  const { address, e_mail, license_no, name, password, phone_no } = shopData;
  const [orderClicked, setOrderClicked] = useState(false);
  const navigate = useNavigate();
  const [shopProducts, setShopProducts] = useState([]);
  const [tempProducts, setTempProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [confirmed, setConfirmed] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/shopshowProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ license_No: license_no }),
      });
      const response_json = await response.json();
      setShopProducts(response_json);
      setTempProducts(response_json.slice(0, 5));
      console.log("Show Products", shopProducts);
      if (response.status == 200) {
        // navigate("/searchbar", { state: { products: response_json } });
        console.log("Show Products", shopProducts);
      }
    } catch (error) {
      console.error("Error during show:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [shopProducts]);
  console.log("shop data", shopData);

  console.log("shop products", shopProducts);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    const previousIndex = Math.max(0, currentIndex - 5);
    const previousProducts = shopProducts.slice(
      previousIndex,
      previousIndex + 5
    );
    setTempProducts(previousProducts);
    setCurrentIndex(previousIndex);
  };
  const handleItemClick = () => {
    setOrderClicked(false);
  };
  const handleOrderClick = () => {
    console.log("before function", orderClicked);
    const temp = !orderClicked;
    console.log("after function", temp);
    setOrderClicked(temp);
    if (temp == true) {
      handleOrder();
    }
  };
  const handleOrder = async (e) => {
    console.log("orderClicked", orderClicked);
    setShopLicense(license_no);
    try {
      const response = await fetch("http://localhost:3000/show_orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shop_license: license_no }),
      });
      const response_json = await response.json();
      console.log("orders:", response_json);
      if (response.status == 200) {
        setOrderData(response_json);
      } else {
        console.error("Error during show:", error);
      }
    } catch (error) {
      console.error("Error during show:", error);
    }
  };

  const handleConfirmOrder = async (e) => {
    const temp = [];
    for (let i = 0; i < orderData.length; i++) {
      temp.push({
        product_id: orderData[i].id,
        license: license_no,
        id: orderData[i].cid,
      });
    }
    try {
      const response = await fetch("http://localhost:3000/confirm_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(temp),
      });
      console.log("temp", temp);
      if (response.status == 200) {
        console.log("Order confirmed");
      }
    } catch (error) {
      console.error("Error during show:", error);
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 5;

    if (nextIndex < shopProducts.length) {
      setTempProducts(shopProducts.slice(nextIndex, nextIndex + 5));
      setCurrentIndex(nextIndex);
    } else {
      setTempProducts(
        shopProducts.slice(currentIndex, shopProducts.length - 1)
      );
      setCurrentIndex(shopProducts.length - 1);
    }
  };

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  const handleProductShow = (product) => {
    console.log("Product:", product);
    setClickedProduct(product);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setShopData(shopData);
    try {
      const response = await fetch(
        "http://localhost:3000/shop/add_product_page",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response_json = await response.json();
      console.log("Create", response_json);
      const data = {
        categories: response_json,
        license_no: license_no,
      };
      if (response.status == 200) {
        console.log("Create", response_json);
        navigate("/addProduct", { state: data });
      }
    } catch (error) {
      console.error("Error during create:", error);
    }
  };
  const handleUpdate = (product) => {
    navigate("/update", {
      state: { product: product, license_no: license_no },
    });
  };
  const handleDelete = async (product_id) => {
    try {
      const response = await fetch("http://localhost:3000/deleteProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product_id,
          license_no: license_no,
        }),
      });

      if (response.status == 200) {
        navigate("/shopProfile", { state: { shopData: shopData } });
        console.log("Delete successful");
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };
  return (
    <>
      <Header />
      <div className="w-screen shop-profile-body">
        {/* Top section with image */}
        <div className="h-96 mb-8 shop-image w-full"></div>

        {/* Shop information section */}
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold shop-name">{name}</h1>
            <p className="text-gray-600 mb-2">Shop Location</p>
            {/* Other shop information goes here */}
          </div>

          {/* Middle section */}
          <div className="flex">
            {/* Left side */}
            <div className="w-1/4 mr-4">
              <ul className="w-full page-navigation-links">
                <li className="mb-2 left-top-shop" onClick={handleItemClick}>
                  Items
                </li>
                <li className="mb-2 left-top-shop">About</li>
                <li className="mb-2 left-top-shop">Shop Policies</li>
              </ul>
              <ul className="w-full left-side-bar">
                <li className="left-sidebar-item" onClick={handleOrderClick}>
                  Orders
                </li>
                <li className="left-sidebar-item">Contact</li>
                <li className="left-sidebar-item">Report</li>
              </ul>
            </div>

            {/* Right side */}
            {orderClicked == false && (
              <div className="w-3/4 right-side">
                <div className="w-100 right-side-top">
                  {/* Search box */}
                  <input
                    type="text"
                    placeholder="Search product"
                    className="border border-gray-300 rounded-md p-2 mb-4 w-1/3"
                  />

                  {/* Sort dropdown */}
                  <div className=" w-full shop-custom-dropdown">
                    <h2 className="shop-product-heading">Featured items</h2>
                    <select className="border border-gray-300 rounded-md p-2 mb-4 shop-product-sort">
                      <option value="value1">Custom</option>
                      <option value="value2">Price: Low to High</option>
                      <option value="value3">Price: High to Low</option>
                      {/* Add sorting options here */}
                    </select>
                  </div>
                </div>

                {/* Products */}
                <div className="w-100">
                  <div className="grid grid-cols-3 gap-4">
                    {tempProducts.map((product) => (
                      <div key={product.id} className="shop-product-card">
                        <div className="shop-product-image">
                          <img
                            src={product.image}
                            alt=""
                            onClick={handleProductShow.bind(this, product)}
                          />
                        </div>
                        <div className="product-information-under-image">
                          <div className="product-information">
                            <p className="shop-product-name">
                              {truncateText(product.product_name, 25)}
                            </p>
                            <p className="shop-product-price">
                              {product.price}
                            </p>
                          </div>
                          {/* Add more product details here */}
                          <div className="three-dots-product">
                            <button
                              className="focus:outline-none"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FaEllipsisV
                                className="text-gray-500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleMenu(); // Toggle menu visibility
                                }}
                              />
                            </button>
                          </div>
                          {/* Dropdown menu */}
                          {isMenuOpen && (
                            <div className="absolute bottom-16 hover-dots right-4 mt-2 border rounded shadow-md">
                              {/* Dropdown menu items */}
                              <button
                                className="first-update"
                                onClick={() => handleUpdate(product)}
                              >
                                Update
                              </button>
                              <button onClick={() => handleDelete(product.id)}>
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div
                      className=" shop-product-card add-icon-container"
                      onClick={handleAddProduct}
                    >
                      <IoMdAddCircle className="add-icon" />
                    </div>
                  </div>
                  <div className="shop-buttons">
                    <button
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      className="button-style"
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentIndex + 5 >= shopProducts.length}
                      className="button-style"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {orderClicked == true && <Order />}
          </div>

          {/* About section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="mb-2">Shop description goes here...</p>
            {/* Social media links */}
            <div>{/* Social media icons */}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopProfile;
