import React from "react";
import Navbar2 from "../navbar/Navbar2";
import About from "./About";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar2 />
      {children}
      <About />
      <Footer />
    </div>
  );
};

export default Layout;
