import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/home_page.jsx";
import Login from "./components/login.jsx";
import ProductDisplay from "./components/productDisplay.jsx";
import store from "./store.js";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage user={false} />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/shopDashboard" element={<ShopDashboard />} />
        <Route path="/userDashboard" element={<UserDashboard />} /> */}
          <Route path="/searchbar" element={<ProductDisplay />} />
        </Routes>
      </Router>
    </Provider>
  );
};
export default App;
