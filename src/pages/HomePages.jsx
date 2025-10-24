import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router";
import Hero from "../Components/Hero";
import { motion } from "framer-motion"; //  Import Framer Motion
import Loading from "../Components/Loading/Loading";

const HomePages = () => {
  const [toys, setToys] = useState([]);
  const [expandedToys, setExpandedToys] = useState({});
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    fetch("/toyCollection.json")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setToys(data);
          setLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.error("Error loading toys:", error);
        setLoading(false);
      });
  }, []);

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

  const toggleDescription = (toyId) => {
    setExpandedToys((prev) => ({
      ...prev,
      [toyId]: !prev[toyId],
    }));
  };

  //  Animation Variants for Cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Hero />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-[#7E57C2] mb-12">
          Popular Toy Collection
        </h1>

        {loading ? (
          <p className="flex items-center justify-center h-screen text-gray-500 text-lg">
            <Loading></Loading>
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {toys.slice(0, 6).map((toy, index) => {
              const isExpanded = expandedToys[toy.toyId];
              const truncatedDescription =
                toy.description.length > 100
                  ? toy.description.slice(0, 100) + "..."
                  : toy.description;

              return (
                <motion.div
                  key={toy.toyId}
                  variants={cardVariants}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  }}
                  className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 cursor-pointer"
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={toy.pictureURL}
                      alt={toy.toyName}
                      className="w-full h-85 object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <span className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                      ${toy.price}
                    </span>
                  </div>

                  {/* Text Section */}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      {toy.toyName}
                    </h2>

                    <div className="flex items-center justify-between mb-4">
                      <p className="text-gray-600 text-sm">
                        Available:{" "}
                        <span className="font-medium">
                          {toy.availableQuantity} pcs
                        </span>
                      </p>
                      <p className="ml-2 flex text-gray-600 items-center text-sm">
                        {renderStars(toy.rating)}
                        <span className="ml-2">({toy.rating})</span>
                      </p>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                      {isExpanded ? toy.description : truncatedDescription}
                      {toy.description.length > 100 && (
                        <button
                          onClick={() => toggleDescription(toy.toyId)}
                          className="text-purple-600 font-semibold ml-1 hover:underline"
                        >
                          {isExpanded ? "Read less" : "Read more"}
                        </button>
                      )}
                    </p>

                    <Link
                      to={`/details/${toy.toyId}`}
                      className="mt-auto w-full bg-[#7E57C2] hover:bg-[#6A42B8] text-white font-semibold py-3 rounded-2xl transition duration-300 text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default HomePages;
