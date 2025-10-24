import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import Swal from "sweetalert2";
import { AuthenticationContext } from "../Context/AuthenticationContext";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo-toy-child-radio-controlled-car-product-png-favpng-FGqTHPsrqFtCLBdL6N16YdGEj.jpg";

const Navbar = () => {
  const { user, loading } = useContext(AuthenticationContext);
  console.log(user)
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false); 
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

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "hover:text-blue-500 transition-colors duration-300";

  const navVariants = {
    hidden: { y: -80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 12 },
    },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="bg-base-100 shadow-sm w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-opacity-90"
    >
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
            <motion.img
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44"
              src={logo}
              alt="Logo"
            />
          </NavLink>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-6 text-base">
            {["Home", "About"].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item === "Home" ? "/" : "/about"}
                  className={navLinkStyle}
                >
                  {item}
                </NavLink>
              </motion.li>
            ))}
            {user && (
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <NavLink to="/profile" className={navLinkStyle}>
                  Profile
                </NavLink>
              </motion.li>
            )}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center gap-3 relative">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center"
            >
              <span className="loading loading-spinner loading-md text-blue-600"></span>
            </motion.div>
          ) : user ? (
            <>
              {/* Profile Picture + Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                {user.photoURL ? (
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={user.photoURL || user.reloadUserInfo.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
                  />
                ) : (
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <FaUserCircle className="text-4xl text-gray-700 hover:text-blue-600 cursor-pointer" />
                  </motion.div>
                )}

                {/* Animated Dropdown */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg p-4 z-50"
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              {["Sign In", "Register"].map((text, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <NavLink
                    to={text === "Sign In" ? "/sing_in" : "/register"}
                    className="btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none 
                             hover:from-indigo-600 hover:to-blue-500 transition-all duration-300
                             px-4 sm:px-5 md:px-6 rounded-full text-sm md:text-base"
                  >
                    {text}
                  </NavLink>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
