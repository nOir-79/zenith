import React, { useEffect, useState } from "react";
import "../styles/home_page.css";
import CategoryBar from "./category_bar.jsx";
import Header from "./header.jsx";
function HomePage(user) {
  const isUserPage = user;
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/");
        const data = await response.json();
        const category = data.map((item) => item.key);
        const subcategory = data.flatMap((item) =>
          item.value.map((subItem) => subItem.cat)
        );
        const categoryMap = {};

        data.forEach((item) => {
          const category = item.key.toLowerCase();
          const subcategories = item.value.map((subItem) =>
            subItem.cat.toLowerCase()
          );
          categoryMap[category] = subcategories;
        });
        console.log("Category:", category);
        console.log("Subcategory:", subcategory);
        console.log("Category Map:", categoryMap);
        setCategories(category);
        setSubcategories(categoryMap);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        {isUserPage ? <Header userPage={true} /> : <Header userPage={false} />}
        <CategoryBar categories={categories} subcategories={subcategories} />
      </div>
    </>
  );
}

export default HomePage;
