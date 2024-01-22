// SubcategoriesWindow.jsx

import React from "react";
import "../styles/subcategories_window.css";

const SubcategoriesWindow = ({ category, subcategories, onClose }) => {
  return (
    <div className="subcategories-window">
      <div className="window-header">
        <h2>{category} Subcategories</h2>
      </div>
      <div className="subcategories-list">
        {subcategories.map((subcategory, index) => (
          <a href={`#${subcategory}`} key={index} className="subcategory-link">
            {subcategory}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SubcategoriesWindow;
