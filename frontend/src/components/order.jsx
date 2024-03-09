// import React from "react";
// import "../styles/order.css";
// import { useData } from "./Datacontext.jsx";
// const Order = () => {
//   const { shopLicense, setShopLicense, orderData, setOrderData } = useData();
//   console.log("orderData", orderData);
//   console.log("shopLicense", shopLicense);

//   return (
//     <div className="outer-order">
//       {orderData.map((order, index) => {
//         return (
//           <div className="order-product-card" key={index}>
//             <div className="order-image">
//               <img src={order.image} alt="" />
//             </div>
//             <div className="order-middle">
//               <h2>{order.name}</h2>
//               <h2>{order.product}</h2>
//             </div>
//             <div className="order-right">
//               <h2>${order.price}</h2>
//               <h2>Quantity:{order.quantity}</h2>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

import { Button, Card, Checkbox, Col, Row, Typography, message } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useData } from "./Datacontext.jsx";
const { Meta } = Card;
const { Title, Text } = Typography;

const OrderShowingComponent = () => {
  const { shopLicense, setShopLicense, orderData, setOrderData } = useData();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductSelection = (product) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleConfirmOrder = async () => {
    // Perform order confirmation logic here
    console.log("Selected Products:", selectedProducts);
    try {
      const response = await fetch("http://localhost:3000/shop_confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shop_license: shopLicense,
          products: selectedProducts,
        }),
      });

      if (response.status == 200) {
        message.success("Order confirmed successfully");
        const updatedOrderData = orderData.filter(
          (order) => !selectedProducts.includes(order)
        );
        setOrderData(updatedOrderData);

        // Clear selectedProducts
        setSelectedProducts([]);
      } else {
        message.error("Error confirming order");
      }
    } catch (error) {
      console.error("Error confirming order", error);
      message.error("Error confirming order");
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        {orderData.map((order, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              cover={<img alt={order.product_name} src={order.image} />}
              actions={[
                <Checkbox
                  checked={selectedProducts.includes(order)}
                  onChange={() => handleProductSelection(order)}
                />,
              ]}
            >
              <Meta
                title={order.product_name}
                description={
                  <>
                    <Title level={5}>{order.brand_name}</Title>
                    <Text>Quantity: {order.quantity}</Text>
                    <br />
                    <Text>
                      Time: {moment(order.time).format("YYYY-MM-DD HH:mm")}
                    </Text>
                    <br />
                    <Text>Price: {order.price}</Text>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Button type="primary" onClick={handleConfirmOrder}>
        Confirm Order
      </Button>
    </div>
  );
};

export default OrderShowingComponent;

// export default Order;
