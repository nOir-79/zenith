// SubcategoriesWindow.js

import React from "react";

const SubcategoriesWindow = ({
  category,
  subcategories,
  onSubcategoryClick,
  onClose,
}) => {
  return (
    <div className="subcategories-window">
      <div className="subcategories-container">
        {subcategories.map((subcategory, index) => (
          <div
            key={index}
            className="subcategory-link"
            onClick={() => onSubcategoryClick(subcategory)}
          >
            {subcategory}
          </div>
        ))}
      </div>
      <button onClick={onClose} className="close-button">
        Close
      </button>
    </div>
  );
};

export default SubcategoriesWindow;
