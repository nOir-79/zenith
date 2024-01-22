import "../styles/home_page.css";
import CategoryBar from "./category_bar.jsx";
import Header from "./header.jsx";
function HomePage() {
  const categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
  ];
  const subcategories = {
    "Category 1": ["Subcategory 1.1", "Subcategory 1.2", "Subcategory 1.3"],
    "Category 2": ["Subcategory 2.1", "Subcategory 2.2", "Subcategory 2.3"],
    // Add subcategories for other categories
  };
  return (
    <>
      <div>
        <Header />
        <CategoryBar categories={categories} subcategories={subcategories} />
      </div>
    </>
  );
}

export default HomePage;
