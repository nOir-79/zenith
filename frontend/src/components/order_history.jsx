import { ClockCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Card, List, Space } from "antd";
import React from "react";
import { useData } from "./Datacontext.jsx";

const OrderDetails = () => {
  const { orderHistory } = useData();
  const orders = orderHistory;
  return (
    <List
      itemLayout="vertical"
      dataSource={orders}
      renderItem={(order) => (
        <List.Item>
          <Card
            title={order.product_name}
            extra={`Quantity: ${order.quantity}`}
            style={{ width: "100%" }}
          >
            <List.Item.Meta
              avatar={<Avatar src={order.image} />}
              description={`Brand: ${order.brand_name}`}
            />
            <Space direction="vertical">
              <div>Price: {order.price}</div>
              <div>License: {order.license}</div>
              <div>
                <ClockCircleOutlined /> Time: {order.time}
              </div>
            </Space>
            <div style={{ marginTop: "16px" }}>
              <ShoppingCartOutlined /> Product ID: {order.product_id}
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default OrderDetails;
