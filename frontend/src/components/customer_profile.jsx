import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/customerProfile.css";
import { useData } from "./Datacontext.jsx";

const CustomerProfile = () => {
  const { customerData, setCustomerData } = useData();
  const { phone_number, e_mail, gender, birthday, name } = customerData[0];
  const Navigate = useNavigate();
  const handleBack = () => {
    Navigate("/");
  };

  const handleHome = () => {
    Navigate("/");
  };

  return (
    <div className="cpBody">
      <div className="back-button-customer">
        <button onClick={handleBack}>Back</button>
      </div>
      <div className="dashboard-page flex">
        <div className="dashboard bg-gray-200 p-4">
          <div className="dashboard-links">
            <h2 className=" dashboard-text text-lg font-semibold mb-4">
              Dashboard
            </h2>
            <ul className="space-y-2 dashboard-ul">
              <li>
                <a href="#" className="link-item" onClick={handleHome}>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="link-item">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="link-item">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="user-information flex-1 p-4">
          <div className="user-profile flex bg-white rounded-lg shadow-md p-4">
            <div className="image-container">
              <img
                src="human.jpg"
                alt="User Avatar"
                className="w-24 h-full rounded-l-lg object-cover profile-image"
              />
            </div>
            <div className="user-info ml-4">
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Phone:</strong> {phone_number}
              </p>
              <p>
                <strong>Email:</strong> {e_mail}
              </p>
              <p>
                <strong>Date of Birth:</strong> {birthday}
              </p>
              <p>
                <strong>Gender:</strong> {gender}
              </p>
            </div>
          </div>
          <div className="additional-info flex mt-4">
            <div className="recent-purchases flex-1 pr-4 bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-4">Recent Purchases</h3>
              <ul>
                <li>Product 1</li>
                <li>Product 2</li>
                <li>Product 3</li>
              </ul>
            </div>
            <div className="social-media flex-1 bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-4">Social Media</h3>
              <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
