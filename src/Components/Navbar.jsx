import React from "react";
import { NavLink } from "react-router";
import logo from "../assets/LOGO-MRTOY-01.png";

const Navbar = () => {
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "hover:text-blue-500 transition-colors duration-300";

  return (
    <div className="navbar container mx-auto bg-base-100 shadow-sm px-4 sm:px-6 md:px-8 lg:px-12">
     
      <div className="navbar-start">
       
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

        
        <NavLink to="/" className="flex items-center gap-2">
          <img
            className="w-15 sm:w-20 md:w-26 lg:w-30 xl:w-35"
            src={logo}
            alt="Logo"
          />
        </NavLink>
      </div>

      
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

      
      <div className="navbar-end">
        <NavLink
          to="/login"
          className="btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none 
                     hover:from-indigo-600 hover:to-blue-500 transition-all duration-300
                     px-4 sm:px-5 md:px-6 rounded-full text-sm md:text-base"
        >
          Sign In
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
