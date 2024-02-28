import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [clickedSubcategory, setClickedSubcategory] = useState("");
  const [subcategoryClicked, setSubcategoryClicked] = useState(false);
  const [productsundersubcategory, setProductsundersubcategory] = useState([]);
  const [showProduct, setShowProduct] = useState([]);
  const [customerData, setCustomerData] = useState([{}]);
  const [shopData, setShopData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

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
        productsundersubcategory,
        setProductsundersubcategory,
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
