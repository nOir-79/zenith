// import { Avatar, Button, Card, List } from "antd";
// import React from "react";
// import { useData } from "./Datacontext.jsx";

// const ProfilePage = () => {
//   const { customerData } = useData();
//   const customerInfo = [
//     { title: "Name:", content: customerData[0].name },
//     { title: "Phone Number:", content: customerData[0].phone_number },
//     { title: "E-mail:", content: customerData[0].e_mail },
//     { title: "Gender:", content: customerData[0].gender },
//     { title: "Balance:", content: customerData[0].balance },
//     // Add more information as needed
//   ];
//   const handleHistoryClick = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/show_order_history", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           customer_phone: customerData[0].phone_number,
//         }),
//       });
//       const data = await response.json();
//       console.log("Order History:", data);
//     } catch (error) {
//       console.error("Error loading order history", error);
//     }
//   };
//   console.log(customerData);
//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       {/* Profile Section (Optional Card) */}
//       <Card title="Profile">
//         <Avatar
//           size={128}
//           src="https://zos.alipay.com/v2/avatar_sync?src=get_avatar.htm?auth_code=MDEwMTM4MDEwMTUxMDEwMTM0MA%3D%3D&scene=avatar_auth"
//         />
//         <List
//           itemLayout="horizontal"
//           dataSource={customerInfo}
//           renderItem={(item) => (
//             <List.Item>
//               <List.Item.Meta title={item.title} />
//               <span>{item.content}</span>
//             </List.Item>
//           )}
//         />
//       </Card>

//       {/* Action Section */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-around",
//           marginTop: 20,
//         }}
//       >
//         <Button type="primary" href="" onClick={handleHistoryClick}>
//           Order History
//         </Button>
//         <Button type="primary" href="/payments">
//           Payment History
//         </Button>
//         {/* Add more buttons for other actions */}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import { Avatar, Button, Card, List } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/customer_profile.css";
import { useData } from "./Datacontext.jsx";

const ProfilePage = () => {
  const Navigate = useNavigate();
  const {
    customerData,
    orderHistory,
    setOrderHistory,
    paymentHistory,
    setPaymentHistory,
  } = useData();
  const customerInfo =
    customerData && customerData.length > 0
      ? [
          { title: "Name:", content: customerData[0].name },
          { title: "Phone Number:", content: customerData[0].phone_number },
          { title: "E-mail:", content: customerData[0].e_mail },
          { title: "Gender:", content: customerData[0].gender },
          { title: "Balance:", content: customerData[0].balance },
          // Add more information as needed
        ]
      : [];

  const handlePaymentClick = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/show_payment_history",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_phone: customerData[0].phone_number,
          }),
        }
      );
      const data = await response.json();
      console.log("Payment History:", data);
      setPaymentHistory(data);
      Navigate("/paymentHistory");
    } catch (error) {
      console.error("Error loading payment history", error);
    }
  };

  const handleHistoryClick = async (event) => {
    event.preventDefault();
    if (customerData && customerData.length > 0) {
      try {
        const response = await fetch(
          "http://localhost:3000/show_order_history",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customer_phone: customerData[0].phone_number,
            }),
          }
        );
        const data = await response.json();
        setOrderHistory(data);
        console.log("Order History:", data);
        Navigate("/orderHistory");
      } catch (error) {
        console.error("Error loading order history", error);
      }
    } else {
      console.error("Customer data is undefined or empty");
    }
  };

  return (
    <div className="customer-profile">
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Profile Section (Optional Card) */}
        <Card title="Profile">
          <Avatar size={128} src="car.jpg" />
          <List
            itemLayout="horizontal"
            dataSource={customerInfo}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item.title} />
                <span>{item.content}</span>
              </List.Item>
            )}
          />
        </Card>

        {/* Action Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <Button type="primary" href="" onClick={handleHistoryClick}>
            Order History
          </Button>
          <Button type="primary" href="" onClick={handlePaymentClick}>
            Payment History
          </Button>
          {/* Add more buttons for other actions */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
