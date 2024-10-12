import React from "react";
import Admin_Nav from "./Admin_Nav";

const Admin_Layout = ({ children }) => {
  return (
    <div>
      <Admin_Nav />
      {children}
    </div>
  );
};

export default Admin_Layout;
