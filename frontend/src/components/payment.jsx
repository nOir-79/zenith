import {
  Avatar,
  Button,
  Collapse,
  Form,
  Input,
  List,
  Select,
  Typography,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./Datacontext.jsx";

const { Panel } = Collapse;
const { Option } = Select;

const { Title } = Typography;

const CheckoutCollapse = () => {
  const Navigate = useNavigate();
  const { customerData, totalAmount } = useData();
  console.log("total amount:", totalAmount);
  const [products, setProducts] = useState([]);
  const phone_number = customerData[0].phone_number;
  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/show_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_phone: phone_number,
        }),
      });
      const data = await response.json();
      console.log("data:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error loading products", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    division: "",
    district: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async () => {
    console.log("Form Data:", formData);
    try {
      const response = await fetch("http://localhost:3000/confirm_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_phone: phone_number,
          billing_address: formData.address,
        }),
      });

      if (response.status === 200) {
        console.log("Order confirmed");
        message.success("Order confirmed");
        Navigate("/");
      } else {
        message.error("Error confirming order");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
    }

    // You can perform further actions with form data here, such as submitting to a server
  };

  return (
    <Collapse accordion>
      <Panel header="Checkout" key="1">
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item label="Full Name" name="fullName" required>
            <Input
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNumber" required>
            <Input
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Address" name="address" required>
            <Input.TextArea
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Division" name="division" required>
            <Select
              value={formData.division}
              onChange={(value) => handleInputChange("division", value)}
            >
              <Option value="Dhaka">Dhaka</Option>
              <Option value="Chittagong">Chittagong</Option>
              {/* Add other division options here */}
            </Select>
          </Form.Item>
          <Form.Item label="District" name="district" required>
            <Select
              value={formData.district}
              onChange={(value) => handleInputChange("district", value)}
            >
              <Option value="Dhaka">Dhaka</Option>
              <Option value="Chittagong">Chittagong</Option>
              {/* Add other district options here */}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Panel>
      <Panel header="Product List" key="2">
        <List
          itemLayout="horizontal"
          dataSource={products}
          renderItem={(product) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={product.image} />}
                title={product.name}
                description={`Quantity: ${product.quantity}, Price: ${product.price}, Discounted Price: ${product.discounted_price}, Discount: ${product.discount}`}
              />
            </List.Item>
          )}
        />
        <Title level={4}>Total Amount: {totalAmount}</Title>
      </Panel>
    </Collapse>
  );
};

export default CheckoutCollapse;
