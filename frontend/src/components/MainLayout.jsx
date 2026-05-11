import React from "react";
import Header from "./Header.jsx";
import CopyrightNotice from "./CopyrightNotice.jsx";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <CopyrightNotice/>
    </div>
  );
};

export default MainLayout;
