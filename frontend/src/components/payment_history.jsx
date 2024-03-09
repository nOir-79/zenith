import { Table } from "antd";
import React from "react";
import { useData } from "./Datacontext.jsx";

const PaymentPage = ({ payments }) => {
  const { paymentHistory, setPaymentHistory } = useData();
  const columns = [
    {
      title: "Payment ID",
      dataIndex: "payment_id",
      key: "payment_id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Billing Address",
      dataIndex: "billing_address",
      key: "billing_address",
    },
    {
      title: "Transaction Status",
      dataIndex: "transaction_status",
      key: "transaction_status",
    },
    {
      title: "Customer Phone",
      dataIndex: "c_phone",
      key: "c_phone",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={paymentHistory} />
    </div>
  );
};

export default PaymentPage;
