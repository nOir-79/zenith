// UserIconDialog.jsx
import React from "react";
import "../styles/userDropDown.css"; // Import your CSS file for styling

const UserIconDialog = ({ isOpen, onClose }) => {
  return isOpen ? (
    <div className="user-icon-dialog" onMouseLeave={onClose}>
      <ul>
        <li>
          <a href="/account">Account</a>
        </li>
        <li>
          <a href="/orders">Orders</a>
        </li>
        <li>
          <a href="/browsing-history">Browsing History</a>
        </li>
        <li>
          <a href="/logout">Log out</a>
        </li>
      </ul>
    </div>
  ) : null;
};

export default UserIconDialog;
