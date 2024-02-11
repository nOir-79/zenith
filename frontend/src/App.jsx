import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddProduct from "./components/add_product.jsx";
import AfterSignUp from "./components/afterSignup.jsx";
import CustomerProfile from "./components/customer_profile.jsx";
import Delete from "./components/delete_product.jsx";
import HomePage from "./components/home_page.jsx";
import Login from "./components/login.jsx";
import ProductDetails from "./components/productDetails.jsx";
import ProductDisplay from "./components/productDisplay.jsx";
import ShopLogin from "./components/shopLogin.jsx";
import ShopProfile from "./components/shop_profile.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage user={false} />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/shopDashboard" element={<ShopDashboard />} />
        <Route path="/userDashboard" element={<UserDashboard />} /> */}
        <Route path="/searchbar" element={<ProductDisplay />} />
        <Route path="/shopLogin" element={<ShopLogin />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/customerProfile" element={<CustomerProfile />} />
        <Route path="/shopProfile" element={<ShopProfile />} />
        <Route path="/deleteProduct" element={<Delete />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/afterSignup" element={<AfterSignUp />} />
      </Routes>
    </Router>
  );
};
export default App;
