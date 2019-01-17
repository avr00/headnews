import React from "react";
import "./Navbar.scss";

const Navbar = props => {
  return (
    <nav>
      <div className="navbar-top">
        <h1>Headnews</h1>
      </div>
      <div className="navbar-bottom">
        <a href="#" className="active">
          Home
        </a>
        <a href="#">Business</a>
        <a href="#">Entertaiment</a>
        <a href="#">Health</a>
        <a href="#">Science</a>
        <a href="#">Technology</a>
      </div>
    </nav>
  );
};

export default Navbar;
