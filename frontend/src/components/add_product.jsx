// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom"; // Import the useNavigate hook from the react-router-dom package
// import "../styles/addProduct.css"; // Import CSS file for styling

// const CreateProductPage = () => {
//   const navigate = useNavigate(); // Use the useNavigate hook to get the navigate function
//   const location = useLocation(); // Use the useLocation hook to get the location object
//   const data = location.state || {};
//   console.log(data);
//   const { categories, license_no } = data || {};

//   const [productName, setProductName] = useState("");
//   const [brandName, setBrandName] = useState("");
//   const [id, setId] = useState("");
//   const [price, setPrice] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [category, setCategory] = useState("");
//   const [subcategory, setSubcategory] = useState("");
//   const [discount, setDiscount] = useState("");

//   // Function to handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // Send form data to router endpoint
//     console.log({
//       productName,
//       brandName,
//       id,
//       price,
//       availability,
//       category,
//       subcategory,
//       discount,
//       license_no,
//     });
//     const send_data = {
//       product_name: productName,
//       brand_name: brandName,
//       id: id,
//       price: price,
//       availability: availability,
//       category: subcategory,
//       discount: discount,
//       license_no: license_no,
//     };

//     try {
//       const response = await fetch("http://localhost:3000/shop/add_product", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(send_data),
//       });
//       if (response.status == 200) {
//         console.log("Product Added", response);
//       } else {
//         console.log("Product not added", response);
//       }
//     } catch (error) {
//       console.error("Error during create:", error);
//     }
//     // Reset form fields after submission
//     resetForm();
//   };

//   // Function to reset form fields
//   const resetForm = () => {
//     setProductName("");
//     setBrandName("");
//     setId("");
//     setPrice("");
//     setAvailability("");
//     setCategory("");
//     setSubcategory("");
//     setDiscount("");
//   };

//   // Function to handle category selection
//   const handleCategoryChange = (event) => {
//     const selectedCategory = event.target.value;
//     setCategory(selectedCategory);
//     // Reset subcategory when category changes
//     setSubcategory("");
//   };

//   return (
//     <div className="create-product-container">
//       <h2>Create Product</h2>
//       <form onSubmit={handleSubmit} className="form">
//         <div className="form-group">
//           <label>Product Name:</label>
//           <input
//             type="text"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Brand Name:</label>
//           <input
//             type="text"
//             value={brandName}
//             onChange={(e) => setBrandName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>ID:</label>
//           <input
//             type="text"
//             value={id}
//             onChange={(e) => setId(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Price:</label>
//           <input
//             type="text"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Availability:</label>
//           <input
//             type="text"
//             value={availability}
//             onChange={(e) => setAvailability(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Category:</label>
//           <select value={category} onChange={handleCategoryChange}>
//             <option value="">Select Category</option>
//             {categories.map((category) => (
//               <option key={category.key} value={category.key}>
//                 {category.key}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Subcategory:</label>
//           <select
//             value={subcategory}
//             onChange={(e) => setSubcategory(e.target.value)}
//           >
//             <option value="">Select Subcategory</option>
//             {categories
//               .find((cat) => cat.key === category)
//               ?.value.map((subcategory) => (
//                 <option key={subcategory.id} value={subcategory.cat}>
//                   {subcategory.cat}
//                 </option>
//               ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Discount:</label>
//           <input
//             type="text"
//             value={discount}
//             onChange={(e) => setDiscount(e.target.value)}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default CreateProductPage;

// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Upload, Input, Button, Switch } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import "../styles/addProduct.css";

// const CreateProductPage = () => {
//   const [uploadType, setUploadType] = useState("local");
//   const [imageUrl, setImageUrl] = useState("");
//   const [fileList, setFileList] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const data = location.state || {};
//   const { categories, license_no } = data || {};

//   const [productName, setProductName] = useState("");
//   const [brandName, setBrandName] = useState("");
//   const [id, setId] = useState("");
//   const [price, setPrice] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [category, setCategory] = useState("");
//   const [subcategory, setSubcategory] = useState("");
//   const [discount, setDiscount] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const send_data = {
//       product_name: productName,
//       brand_name: brandName,
//       price: price,
//       availability: availability,
//       category: category,
//       subcategory: subcategory,
//       discount: discount,
//       license_no: license_no,
//     };

//     try {
//       const response = await fetch("http://localhost:3000/shop/add_product", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(send_data),
//       });
//       if (response.status == 200) {
//         console.log("Product Added", response);
//         navigate("/shopProfile");
//       } else {
//         console.log("Product not added", response);
//       }
//     } catch (error) {
//       console.error("Error during create:", error);
//     }
//     resetForm();
//   };

//   const resetForm = () => {
//     setProductName("");
//     setBrandName("");
//     setPrice("");
//     setAvailability("");
//     setCategory("");
//     setSubcategory("");
//     setDiscount("");
//   };

//   const handleCategoryChange = (event) => {
//     const selectedCategory = event.target.value;
//     setCategory(selectedCategory);
//     setSubcategory("");
//   };

//   return (
//     <div className="add-outer-container">
//       <div className="add-product-container mx-auto">
//         {/* <h2 className="text-3xl font-bold mb-6">Create Product</h2> */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {" "}
//           {/* Reduce space between form groups */}
//           <div className="flex flex-wrap -mx-3">
//             <div className="w-full md:w-1/2 px-3">
//               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
//                 Product Name:
//               </label>
//               <input
//                 type="text"
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//                 className="input-style"
//               />
//             </div>
//             <div className="w-full md:w-1/2 px-3">
//               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
//                 Brand Name:
//               </label>
//               <input
//                 type="text"
//                 value={brandName}
//                 onChange={(e) => setBrandName(e.target.value)}
//                 className="input-style"
//               />
//             </div>
//             {/* <div className="w-full md:w-1/2 px-3">
//               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
//                 ID:
//               </label>
//               <input
//                 type="text"
//                 value={id}
//                 onChange={(e) => setId(e.target.value)}
//                 className="input-style"
//               />
//             </div> */}
//             <div className="w-full md:w-1/2 px-3">
//               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
//                 Price:
//               </label>
//               <input
//                 type="text"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 className="input-style"
//               />
//             </div>
//             <div className="w-full md:w-1/2 px-3">
//               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
//                 Availability:
//               </label>
//               <input
//                 type="text"
//                 value={availability}
//                 onChange={(e) => setAvailability(e.target.value)}
//                 className="input-style"
//               />
//             </div>
//             <div className="w-full md:w-1/2 px-3">
//               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
//                 Category:
//               </label>
//               <select
//                 value={category}
//                 onChange={handleCategoryChange}
//                 className="input-style"
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((category) => (
//                   <option key={category.key} value={category.key}>
//                     {category.key}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="w-full md:w-1/2 px-3">
//               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
//                 Subcategory:
//               </label>
//               <select
//                 value={subcategory}
//                 onChange={(e) => setSubcategory(e.target.value)}
//                 className="input-style"
//               >
//                 <option value="">Select Subcategory</option>
//                 {categories
//                   .find((cat) => cat.key === category)
//                   ?.value.map((subcategory) => (
//                     <option key={subcategory.id} value={subcategory.cat}>
//                       {subcategory.cat}
//                     </option>
//                   ))}
//               </select>
//             </div>
//             <div className="w-full md:w-1/2 px-3">
//               <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
//                 Discount:
//               </label>
//               <input
//                 type="text"
//                 value={discount}
//                 onChange={(e) => setDiscount(e.target.value)}
//                 className="input-style"
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateProductPage;

import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/addProduct.css";
import { useData } from "./Datacontext.jsx";

const CreateProductPage = () => {
  const { shopData, setShopData } = useData();
  const [uploadType, setUploadType] = useState("local");
  const [imageUrl, setImageUrl] = useState("");
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};
  const { categories, license_no } = data || {};

  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [discount, setDiscount] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const send_data = {
      product_name: productName,
      brand_name: brandName,
      price: price,
      availability: availability,
      category: category,
      subcategory: subcategory,
      discount: discount,
      license_no: license_no,
    };

    try {
      const response = await fetch("http://localhost:3000/shop/add_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(send_data),
      });
      if (response.status == 200) {
        console.log("Product Added", response);
        navigate("/shopProfile");
      } else {
        console.log("Product not added", response);
      }
    } catch (error) {
      console.error("Error during create:", error);
    }
    resetForm();
  };

  const resetForm = () => {
    setProductName("");
    setBrandName("");
    setPrice("");
    setAvailability("");
    setCategory("");
    setSubcategory("");
    setDiscount("");
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setSubcategory("");
  };

  const handleImageUpload = (info) => {
    let fileList = [...info.fileList];

    // Limit to only one file
    fileList = fileList.slice(-1);

    setFileList(fileList);
  };

  return (
    <div className="add-outer-container">
      <div className="add-product-container mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Product Name:
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="input-style"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Brand Name:
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="input-style"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Price:
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-style"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Availability:
              </label>
              <input
                type="text"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="input-style"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Category:
              </label>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="input-style"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.key} value={category.key}>
                    {category.key}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Subcategory:
              </label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="input-style"
              >
                <option value="">Select Subcategory</option>
                {categories
                  .find((cat) => cat.key === category)
                  ?.value.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.cat}>
                      {subcategory.cat}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Discount:
              </label>
              <input
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="input-style"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">
                Image:
              </label>
              <Upload
                fileList={fileList}
                beforeUpload={() => false}
                onChange={handleImageUpload}
              >
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
