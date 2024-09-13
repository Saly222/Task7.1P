import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../Design/NavBar.css' 

function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link className="link" to="/">
            DEV@Deakin
          </Link>
        </div>
        <div className="navbar-search">
          <input className="search-input" placeholder="Search..." />
        </div>
        <div className="navbar-links">
          <Link className="link" to="/post">
            Post
          </Link>
          <Link className="link" to="/login">
            Login
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
