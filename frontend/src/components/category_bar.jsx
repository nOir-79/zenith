import React, { useState } from "react";
import "../styles/category_bar.css";
import SubcategoriesWindow from "./subcategories_window";

const CategoryBar = ({ categories, subcategories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryHover = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseWindow = () => {
    setSelectedCategory(null);
  };

  const handleCategoryLeave = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="category-bar" onMouseLeave={handleCategoryLeave}>
      <div className="category-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-link"
            onMouseEnter={() => handleCategoryHover(category.toLowerCase())}
            onMouseLeave={handleCategoryLeave}
          >
            {category}
            {selectedCategory == category.toLowerCase() && (
              <SubcategoriesWindow
                category={selectedCategory}
                subcategories={subcategories[selectedCategory] || []}
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
