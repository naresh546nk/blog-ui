import React, { useState } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";

function App() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const headerHeightChangeHandler = (height) => {
    setHeaderHeight(height);
  };
  const footerHeightChangeHandler = (height) => {
    setFooterHeight(height);
  };

  return (
    <BrowserRouter>
      <Header onHeightChange={headerHeightChangeHandler} />
      <Layout headerHeight={headerHeight} footerHeight={footerHeight} />
      <Footer onHeightChange={footerHeightChangeHandler} />
    </BrowserRouter>
  );
}

export default App;
