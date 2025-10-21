import React from "react";
import { NavLink } from "react-router";
import logo from "../assets/logo-toy-child-radio-controlled-car-product-png-favpng-FGqTHPsrqFtCLBdL6N16YdGEj.jpg";

const Navbar = () => {
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "hover:text-blue-500 transition-colors duration-300";

  return (
    <div className="bg-base-100 shadow-sm w-full">
      {/* container centers everything inside */}
      <div className="navbar container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            {/* Dropdown Menu (Mobile) */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/" className={navLinkStyle}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" className={navLinkStyle}>About</NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={navLinkStyle}>Profile</NavLink>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img
              className="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44"
              src={logo}
              alt="Logo"
            />
          </NavLink>
        </div>

        {/* Navbar Center (Visible on md+) */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-6 text-base">
            <li>
              <NavLink to="/" className={navLinkStyle}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkStyle}>About</NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={navLinkStyle}>Profile</NavLink>
            </li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          <NavLink
            to="/sing_in"
            className="btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none 
                       hover:from-indigo-600 hover:to-blue-500 transition-all duration-300
                       px-4 sm:px-5 md:px-6 rounded-full text-sm md:text-base"
          >
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
