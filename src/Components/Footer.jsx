import React from "react";
import Logo from "../assets/LOGO-MRTOY-01.png";
import { FaFacebook, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-600 bg-yellow-50">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-400/30 pb-6">
        {/* Logo and description */}
        <div className="md:max-w-[24rem]">
          <img className="w-40" src={Logo} alt="Logo" />

          <p className="mt-6 text-sm">
            Explore our amazing toy collection! From action figures to plush toys,
            find the perfect toy for kids of all ages.
          </p>

          <div className="flex items-center gap-5 mt-4 text-xl">
            <FaFacebook className="hover:text-blue-600 transition-colors cursor-pointer" />
            <FaSquareTwitter className="hover:text-blue-400 transition-colors cursor-pointer" />
            <FaInstagramSquare className="hover:text-pink-500 transition-colors cursor-pointer" />
            <FaYoutube className="hover:text-red-600 transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Links and newsletter */}
        <div className="flex-1 flex flex-col md:flex-row items-start md:justify-end gap-20">
          {/* Quick Links */}
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Quick Links</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Shop Toys</a></li>
              <li><a href="#" className="hover:underline">Categories</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="mt-6 md:mt-0">
            <h2 className="font-semibold text-gray-800 mb-5">
              Subscribe to our newsletter
            </h2>
            <div className="text-sm space-y-2">
              <p>
                Get weekly updates on the latest toys and special offers directly
                in your inbox.
              </p>
              <div className="flex items-center gap-2 pt-4">
                <input
                  className="border border-gray-400 placeholder-gray-500 focus:ring-2 ring-yellow-400 outline-none w-full max-w-[16rem] h-9 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-yellow-400 w-24 h-9 text-white rounded hover:bg-yellow-500 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2025 ©{" "}
        <a href="#" className="text-yellow-500 font-semibold hover:underline">
          PLABON CHANDRO MODAK
        </a>
        . All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
