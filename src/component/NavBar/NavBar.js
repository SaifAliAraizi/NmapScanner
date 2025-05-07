import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Use NavLink for page navigation
import { links } from "../../data";
import logo from "../../assets/logo.png";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import "./NavBar.styles.css";

import { authLinks, unauthLinks } from "../../data";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef(null);
  const isAuthenticated = localStorage.getItem('accessToken');

  const handleClick = () => setNav(!nav);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  const navLinks = (isAuthenticated ? authLinks : unauthLinks).map(({ link, id }) => (
    <li key={id}>
      {link === 'logout' ? (
        <button className="nav-links logout-btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <NavLink 
          to={`/${link}`} 
          className="nav-links" 
          onClick={() => setNav(false)}
        >
          {link.charAt(0).toUpperCase() + link.slice(1)}
        </NavLink>
      )}
    </li>
  ));

  return (
    <>
      <header ref={navRef} className={`nav-header ${hidden ? "hidden" : ""}`}>
        <nav className="nav-container">
          <NavLink to="/" className="logo">
            <img src={logo} alt="logo" />
          </NavLink>

          {/* Desktop Nav */}
          <ul className="nav-links-container">{navLinks}</ul>

          {/* Hamburger Menu */}
          <div onClick={handleClick} className="hamburger">
            <HiOutlineMenuAlt1 size={30} className={`${nav ? "hamburger-off" : "hamburger-on"}`} />
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${nav ? "active" : ""}`}>
        <FaTimes size={30} className="close-icon" onClick={() => setNav(false)} />
        <ul className="nav-menu">{navLinks}</ul>
      </div>
    </>
  );
};

export default NavBar;
