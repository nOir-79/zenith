import React, { useEffect } from "react";
import "../styles/home_page.css";
import { useData } from "./Datacontext.jsx";
import CategoryBar from "./category_bar.jsx";
import Header from "./header.jsx";
function HomePage(user) {
  const isUserPage = user["user"];

  const { category, setCategory } = useData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/");
        const data = await response.json();
        console.log("Data:", data);
        setCategory(data);
        console.log(category);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="homepage-body">
        {isUserPage ? <Header userPage={true} /> : <Header userPage={false} />}
        <CategoryBar />
      </div>
    </>
  );
}

export default HomePage;

// const categories = category.map((item) => item.key);
// const subcategory = category.flatMap((item) =>
//   item.value.map((subItem) => subItem.cat)
// );
// const categoryMap = {};

// category.forEach((item) => {
//   const categories = item.key.toLowerCase();
//   const subcategories = item.value.map((subItem) =>
//     subItem.cat.toLowerCase()
//   );
//   categoryMap[categories] = subcategories;
// });
// console.log("Category:", categories);
// console.log("Subcategory:", subcategory);
// console.log("Category Map:", categoryMap);
// setCategories(categories);
// setSubcategories(categoryMap);
// const [categories, setCategories] = useState([]);
// const [subcategories, setSubcategories] = useState({});
