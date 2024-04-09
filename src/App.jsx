import React, { useState } from "react";
import Login from "./login/Login";
import Page1 from "./page1/Page1";
// import Page2 from "./page2/Page2";
import PageNo2 from "./pageNo2/PageNo2";
import Navbar from "./Components/navbar/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {/* {isLoggedIn && <Navbar />} */}
      <Routes>
        <Route
          path="/"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/pageNo2" element={<PageNo2 />} />
      </Routes>
    </Router>
  );
}

export default App;
