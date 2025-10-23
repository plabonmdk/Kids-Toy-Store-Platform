import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import Swal from "sweetalert2";
import { AuthenticationContext } from "../Context/AuthenticationContext";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo-toy-child-radio-controlled-car-product-png-favpng-FGqTHPsrqFtCLBdL6N16YdGEj.jpg";

const Navbar = () => {
  const { user } = useContext(AuthenticationContext);
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Swal.fire({
        icon: "success",
        title: "Logged out successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout failed",
        text: error.message,
      });
    }
  };

  // ✅ NavLink active style
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "hover:text-blue-500 transition-colors duration-300";

  return (
    <div className="bg-base-100 shadow-sm w-full">
      <div className="navbar container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Navbar Start */}
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
                <NavLink to="/" className={navLinkStyle}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={navLinkStyle}>
                  About
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/profile" className={navLinkStyle}>
                    Profile
                  </NavLink>
                </li>
              )}
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

        {/* Navbar Center */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-6 text-base">
            <li>
              <NavLink to="/" className={navLinkStyle}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkStyle}>
                About
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/profile" className={navLinkStyle}>
                  Profile
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center gap-3 relative">
          {user ? (
            <>
              {/* Profile Picture + Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer hover:scale-105 transition-transform"
                  />
                ) : (
                  <FaUserCircle className="text-4xl text-gray-700 hover:text-blue-600 cursor-pointer" />
                )}

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg p-4 z-50">
                    <p className="font-semibold text-gray-800">
                      {user.displayName || "No Name"}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {user.email || "No Email"}
                    </p>
                    <hr className="my-2" />
                    <NavLink
                      to="/profile"
                      className="block text-blue-600 hover:underline mb-2"
                    >
                      View Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-red-500 hover:text-red-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* ✅ Logout Button Beside Profile */}
              <button
                onClick={handleLogout}
                className="btn bg-gradient-to-r from-red-500 to-pink-500 text-white border-none 
                           hover:from-pink-600 hover:to-red-500 transition-all duration-300
                           px-4 sm:px-5 md:px-6 rounded-full text-sm md:text-base"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/sing_in"
                className="btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none 
                         hover:from-indigo-600 hover:to-blue-500 transition-all duration-300
                         px-4 sm:px-5 md:px-6 rounded-full text-sm md:text-base"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none 
                         hover:from-indigo-600 hover:to-blue-500 transition-all duration-300
                         px-4 sm:px-5 md:px-6 rounded-full text-sm md:text-base"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
