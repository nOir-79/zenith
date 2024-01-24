import React, { useState } from "react";
import CreateProduct from "../components/createProduct";
import DeleteProduct from "../components/deleteProduct";
import ShowProduct from "../components/showProduct";
import UpdateProduct from "../components/updateProduct";

const ShopProfile = ({ shop }) => {
  const { name, phone_number, e_mail, address, license_no, password } = shop;
  const [currentOperation, setCurrentOperation] = useState("");

  return (
    <div className="container mx-auto my-8 p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">name</h2>
      <p className="text-lg mb-2">phone_number</p>
      <p className="text-lg mb-2">e_mail</p>
      <p className="text-lg mb-2">address</p>
      <p className="text-lg mb-2">license_no</p>

      <div className="flex space-x-4 mb-8">
        <button
          className="btn-update"
          onClick={() => setCurrentOperation("update")}
        >
          Update
        </button>
        <button
          className="btn-show"
          onClick={() => setCurrentOperation("show")}
        >
          Show
        </button>
        <button
          className="btn-create"
          onClick={() => setCurrentOperation("create")}
        >
          Create
        </button>
        <button
          className="btn-delete"
          onClick={() => setCurrentOperation("delete")}
        >
          Delete
        </button>
      </div>

      {currentOperation === "update" && <UpdateProduct />}
      {currentOperation === "show" && <ShowProduct />}
      {currentOperation === "create" && <CreateProduct />}
      {currentOperation === "delete" && <DeleteProduct />}
    </div>
  );
};

export default ShopProfile;
