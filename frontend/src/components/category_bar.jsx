// CategoryBar.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/category_bar.css";
import { useData } from "./Datacontext.jsx";

const CategoryBar = () => {
  const {
    category,
    setCategory,
    subcategoryClicked,
    setSubcategoryClicked,
    productsundersubcategory,
    setProductsundersubcategory,
  } = useData();
  const categories = category;
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();
  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
  };
  const handleSubcategoryClick = async (subcategory) => {
    try {
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

      if (response.status == 200) {
        setSubcategoryClicked(true);
        const products = await response.json();
        setProductsundersubcategory(products);
        navigate("/searchbar");
      }
    } catch (error) {
      console.error("Error during subcategory click:", error);
    }
  };

  return (
    <div className="category-bar">
      {categories.map((category) => (
        <div
          key={category.key}
          className="category-item"
          onMouseEnter={() => handleCategoryHover(category)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {category.key}
          {hoveredCategory && hoveredCategory.key === category.key && (
            <div className="subcategory-window">
              <div className="subcategory-container">
                {category.value.map((subCategory) => (
                  <div
                    key={subCategory.id}
                    className="subcategory-item"
                    onClick={handleSubcategoryClick.bind(this, subCategory.cat)}
                  >
                    {subCategory.cat}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
