import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const UpdateProductForm = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const product = state.product;
  const license_no = state.license_no;
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("Updated Product:", updatedProduct);
    console.log("License No:", license_no);
    updatedProduct.license_no = license_no;
    updatedProduct.product_id = product.product_id;
    try {
      const response = await fetch(
        "http://localhost:3000/shop/product_update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        console.log("Product updated successfully!");
        message.success("Product updated successfully!");
        Navigate("/shopProfile");
      } else {
        console.log("Failed to update product. Please try again.");
        message.error("Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <Form.Item label="Product Name" name="product_name">
        <Input
          name="product_name"
          value={updatedProduct.product_name}
          onChange={handleInputChange}
          placeholder={product.product_name}
        />
      </Form.Item>
      <Form.Item label="Brand Name" name="brand_name">
        <Input
          name="brand_name"
          value={updatedProduct.brand_name}
          onChange={handleInputChange}
          placeholder={product.brand_name}
        />
      </Form.Item>
      <Form.Item label="Availability" name="availability">
        <Input
          name="availability"
          value={updatedProduct.availability}
          onChange={handleInputChange}
          placeholder={product.availability}
        />
      </Form.Item>
      <Form.Item label="Discount" name="discount">
        <Input
          name="discount"
          type="number"
          value={updatedProduct.discount}
          onChange={handleInputChange}
          placeholder={product.discount}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateProductForm;
