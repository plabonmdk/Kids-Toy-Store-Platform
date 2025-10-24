import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Loading from "../Components/Loading/Loading";

const AboutPages = () => {
  const [toys, setToys] = useState([]);
  const [expandedToys, setExpandedToys] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    
    setLoading(true);
    fetch("/toyCollection.json")
      .then((res) => res.json())
      .then((data) => {
        setToys(data);
        setTimeout(() => {
          setLoading(false); // 
        }, 1000); 
      })
      .catch((error) => {
        console.error("Error loading toys:", error);
        setLoading(false);
      });
  }, []);

  const toggleDescription = (toyId) => {
    setExpandedToys((prev) => ({
      ...prev,
      [toyId]: !prev[toyId],
    }));
  };

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

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mt-10 mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-[#7E57C2] mb-12">
        All Toy Collection
      </h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15 }}
      >
        {toys.map((toy, index) => {
          const isExpanded = expandedToys[toy.toyId];
          const truncatedDescription =
            toy.description.length > 100
              ? toy.description.slice(0, 100) + "..."
              : toy.description;

          return (
            <motion.div
              key={toy.toyId}
              variants={cardVariants}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0,0,0,0.2)" }}
              className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden group flex flex-col cursor-pointer"
            >
              <div className="relative min-h-60 overflow-hidden">
                <img
                  src={toy.pictureURL}
                  alt={toy.toyName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-[#7E57C2] transition">
                    {toy.toyName}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {isExpanded ? toy.description : truncatedDescription}
                    {toy.description.length > 100 && (
                      <button
                        onClick={() => toggleDescription(toy.toyId)}
                        className="text-[#7E57C2] font-medium ml-1 hover:underline"
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </button>
                    )}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-600 text-sm">
                      Quantity:{" "}
                      <span className="font-semibold text-gray-800">
                        {toy.availableQuantity}
                      </span>
                    </p>
                    <p className="flex items-center text-sm text-gray-600">
                      {renderStars(toy.rating)}
                      <span className="ml-2 text-gray-700 font-medium">
                        ({toy.rating})
                      </span>
                    </p>
                  </div>
                </div>

                <Link
                  to={`/details/${toy.toyId}`}
                  className="mt-auto block text-center bg-[#7E57C2] hover:bg-[#6A42B8] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default AboutPages;
