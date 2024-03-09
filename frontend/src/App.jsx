import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { DataProvider } from "./components/Datacontext.jsx";
import AddProduct from "./components/add_product.jsx";
import AfterSignUp from "./components/afterSignup.jsx";
import CustomerProfile from "./components/customerProfile.jsx";
import Delete from "./components/delete_product.jsx";
import HomePage from "./components/home_page.jsx";
import Login from "./components/login.jsx";
import ProductDetails from "./components/productDetails.jsx";
import ProductDisplay from "./components/productDisplay.jsx";
import ShopLogin from "./components/shopLogin.jsx";
import ShopProfile from "./components/shop_profile.jsx";

import Cart from "./components/cart.jsx";
import CategoryMenu from "./components/categoryMenu.jsx";
import OrderHistory from "./components/order_history.jsx";
import Payment from "./components/payment.jsx";
import PaymentHistory from "./components/payment_history.jsx";
import ShopSignUp from "./components/shopSignup.jsx";
import Update from "./components/update_product.jsx";
import UserSignUp from "./components/userSignup.jsx";
const App = () => {
  return (
    <Router>
      <DataProvider>
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/categoryMenu" element={<CategoryMenu />} />
          <Route path="/userSignup" element={<UserSignUp />} />
          <Route path="/shopSignup" element={<ShopSignUp />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/categoryMenu" element={<CategoryMenu />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route path="/paymentHistory" element={<PaymentHistory />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </DataProvider>
    </Router>
  );
};
export default App;
