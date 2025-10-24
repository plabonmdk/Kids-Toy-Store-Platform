import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaBabyCarriage,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Loading from "../Components/Loading/Loading";

const Details = () => {
  const { id } = useParams();
  const [toy, setToy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); 
    fetch("/toyCollection.json")
      .then((res) => res.json())
      .then((data) => {
        const foundToy = data.find((item) => item.toyId === parseInt(id));

       
        setTimeout(() => {
          setToy(foundToy);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error loading details:", error);
        setTimeout(() => setLoading(false), 1000);
      });
  }, [id]);

  // Rating Function
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (rating >= i - 0.5)
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
    return stars;
  };

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loading />
      </div>
    );
  }

  // Not Found
  if (!toy) {
    return (
      <motion.div
        className="flex flex-col justify-center items-center h-[60vh] text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-xl font-semibold mb-4">Toy not found!</p>
        <Link
          to="/"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition"
        >
          Go Back Home
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-10 mt-6 bg-white shadow-xl rounded-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={toy.pictureURL}
            alt={toy.toyName}
            className="rounded-2xl w-full object-cover shadow-md"
          />
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-3">{toy.toyName}</h1>
          <p className="text-gray-500 text-lg mb-4">{toy.subCategory}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            {renderStars(toy.rating)}
            <span className="text-gray-600 font-medium">{toy.rating}</span>
          </div>

          {/* Price */}
          <motion.p
            className="text-3xl font-semibold text-green-600 mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            Rs. {toy.price.toLocaleString()}
          </motion.p>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-6">{toy.description}</p>

          {/* Seller Info */}
          <div className="space-y-2 text-gray-700 mb-8">
            <p>
              <span className="font-semibold text-gray-900">Seller:</span> {toy.sellerName}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Email:</span> {toy.sellerEmail}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Available:</span> {toy.availableQuantity} pcs
            </p>
          </div>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button className="bg-yellow-500 flex gap-2 items-center hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition">
              <FaBabyCarriage /> Buy Now
            </button>
            <Link
              to="/"
              className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg font-semibold text-gray-800 transition"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Details;
