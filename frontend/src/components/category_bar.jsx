// CategoryBar.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/category_bar.css";
import SubcategoriesWindow from "./subcategories_window.jsx";

const CategoryBar = ({ categories, subcategories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  for (let i = 0; i < 10; i++) {
    categories.push("Category");
  }

  const handleCategoryHover = (category) => {
    setSelectedCategory(category.toLowerCase());
  };

  const handleCloseWindow = () => {
    setSelectedCategory(null);
  };

  const handleCategoryLeave = () => {
    setSelectedCategory(null);
  };

  const handleSubcategoryClick = async (subcategory) => {
    try {
      // Perform a fetch post request with the subcategory name
      console.log("subcategory", subcategory);
      const response = await fetch(
        "http://localhost:3000/productsundersubcategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subcategoryName: subcategory }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }

      const data = await response.json();
      console.log("data", data);

      // Navigate to another page with the product data as state
      navigate("/searchbar", { state: { products: data } });
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <div className="category-bar" onMouseLeave={handleCategoryLeave}>
      <div className="category-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-link"
            onMouseEnter={() => handleCategoryHover(category)}
            onMouseLeave={handleCategoryLeave}
          >
            {category}
            {selectedCategory === category.toLowerCase() && (
              <SubcategoriesWindow
                category={selectedCategory}
                subcategories={subcategories[selectedCategory] || []}
                onSubcategoryClick={handleSubcategoryClick}
                onClose={handleCloseWindow}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
