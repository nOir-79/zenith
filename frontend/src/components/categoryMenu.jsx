// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/category_menu.css"; // Import your CSS file for styling
// import { useData } from "./Datacontext.jsx";
// const CategoryMenu = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const {
//     categoryData,
//     setCategoryData,
//     showSubMenu,
//     setShowSubMenu,
//     subProducts,
//     setsubProducts,
//     subcategoryClicked,
//     setSubcategoryClicked,
//   } = useData();
//   const navigate = useNavigate();
//   console.log("inside category menu component", categoryData);

//   // Dummy data for categories and subcategories
//   const categories = [
//     {
//       id: 1,
//       name: "Category 1",
//       subcategories: ["Subcategory 1", "Subcategory 2"],
//     },
//     {
//       id: 2,
//       name: "Category 2",
//       subcategories: ["Subcategory 3", "Subcategory 4"],
//     },
//     // Add more categories as needed
//   ];

//   const handleCategoryHover = (category) => {
//     setSelectedCategory(category);
//     setShowSubMenu(true);
//   };

//   const handleCategoryLeave = () => {
//     // setShowSubMenu(false);
//   };
//   const handleSubCategoryClicked = async (subcategory) => {
//     try {
//       console.log("Subcategory clicked:", subcategory);
//       // Adjust the API endpoint accordingly
//       const response = await fetch(
//         "http://localhost:3000/productsundersubcategory",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ subcategoryName: subcategory }),
//         }
//       );

//       if (response.status === 200) {
//         const subcategoryResults = await response.json();
//         console.log("Subcategory results1:", typeof subcategoryResults);
//         console.log("Subcategory results1:", subcategoryResults);
//         setsubProducts(subcategoryResults);
//         setSubcategoryClicked(true);
//         navigate("/searchbar");
//       }
//     } catch (err) {
//       console.log("Error:", err);
//     }
//   };

//   return (
//     <div className="category-menu">
//       {showSubMenu && (
//         <div className="sub-menu">
//           {categoryData.map((category, index) => (
//             <div
//               key={index}
//               className="category-item"
//               onMouseEnter={() => handleCategoryHover(category)}
//               onMouseLeave={handleCategoryLeave}
//             >
//               {category.key}
//               {selectedCategory && selectedCategory.id === category.id && (
//                 <div className="subcategories">
//                   {category.value.map((subcategory, index) => (
//                     <div
//                       key={index}
//                       className="subcategory-item"
//                       onClick={() => handleSubCategoryClicked(subcategory.cat)}
//                     >
//                       {subcategory.cat}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryMenu;
import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./Datacontext.jsx";

const CategoryDropdown = () => {
  const {
    categoryData,
    subProducts,
    setsubProducts,
    subcategoryClicked,
    setSubcategoryClicked,
  } = useData();
  const navigate = useNavigate();
  const categories = categoryData;
  const handleClick = async (category, subcategory, id) => {
    setSubcategoryClicked(true);
    console.log("Category clicked:", category);
    console.log("Subcategory clicked:", subcategory);
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

      if (response.status === 200) {
        const subcategoryResults = await response.json();
        setsubProducts(subcategoryResults);
        console.log("Subcategory results1:", typeof subcategoryResults);
        console.log("Subcategory results1:", subcategoryResults);
        navigate("/searchbar");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const renderMenu = () => {
    return (
      <Menu>
        {categories.map((category) => (
          <Menu.SubMenu key={category.key} title={category.key}>
            {category.value.map((subcategory) => (
              <Menu.Item
                key={subcategory.id}
                onClick={() =>
                  handleClick(category.key, subcategory.cat, subcategory.name)
                }
              >
                {subcategory.cat}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    );
  };

  return (
    <Dropdown overlay={renderMenu()} trigger={["click"]}>
      <Button>Categories</Button>
    </Dropdown>
  );
};

export default CategoryDropdown;
