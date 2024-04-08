import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="active">
            Home
          </Link>
        </li>
        <li>
          <Link to="/src/page1/">Page 1</Link>
        </li>

        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
