import React, { useEffect, useState } from "react";

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    brandName: "",
    id: "",
    price: "",
    availability: "",
    category: "",
    subcategory: "",
    discount: "",
    shopLicense: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Simulate a GET request to fetch categories and subcategories
    // Replace the URL with your actual API endpoint
    fetch("https://localhost:3000/shop/add_product_page")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    // Filter subcategories based on the selected category
    const selectedCategoryObj = categories.find(
      (category) => category.name === selectedCategory
    );
    setSubcategories(
      selectedCategoryObj ? selectedCategoryObj.subcategories : []
    );
    setFormData({ ...formData, category: selectedCategory, subcategory: "" });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a POST request to send form data to the server
    // Replace the URL with your actual API endpoint
    fetch("http://localhost:3000/shop/add_product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setSuccessMessage("Product inserted successfully!");
        } else {
          setSuccessMessage("Failed to insert product. Please try again.");
        }
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Product Information</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productName"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        {/* ... Other input fields for brandName, id, price, availability, etc. */}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subcategory"
          >
            Subcategory
          </label>
          <select
            id="subcategory"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </div>

        {/* ... Other input fields for discount, shopLicense, etc. */}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>

      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
    </div>
  );
};

export default ProductForm;
