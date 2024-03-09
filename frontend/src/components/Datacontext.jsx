import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [clickedSubcategory, setClickedSubcategory] = useState("");
  const [subcategoryClicked, setSubcategoryClicked] = useState(false);
  const [subProducts, setsubProducts] = useState([]);
  const [showProduct, setShowProduct] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const [shopData, setShopData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShopLoggedIn, setIsShopLoggedIn] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [clickedProduct, setClickedProduct] = useState({});
  const [searchText, setSearchText] = useState("");
  const [subcategories, setSubcategories] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [shopLicense, setShopLicense] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [detailsHtml, setDetailsHtml] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  return (
    <DataContext.Provider
      value={{
        category,
        setCategory,
        products,
        setProducts,
        clickedSubcategory,
        setClickedSubcategory,
        showProduct,
        setShowProduct,
        subcategoryClicked,
        setSubcategoryClicked,
        customerData,
        setCustomerData,
        shopData,
        setShopData,
        isLoggedIn,
        setIsLoggedIn,
        cartProducts,
        setCartProducts,
        clickedProduct,
        setClickedProduct,
        searchText,
        setSearchText,
        isShopLoggedIn,
        setIsShopLoggedIn,
        subcategories,
        setSubcategories,
        categoryData,
        setCategoryData,
        showSubMenu,
        setShowSubMenu,
        subProducts,
        setsubProducts,
        shopLicense,
        setShopLicense,
        orderData,
        setOrderData,
        detailsHtml,
        setDetailsHtml,
        totalAmount,
        setTotalAmount,
        orderHistory,
        setOrderHistory,
        paymentHistory,
        setPaymentHistory,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
