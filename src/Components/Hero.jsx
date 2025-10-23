import React from "react";
import { motion } from "framer-motion";
import toyImage from "../assets/pngtree-the-kid-plays-the-pyramid-child-playing-with-wooden-toys-image_15927880.jpg";
import heroBg from "../assets/colorful-toys-scattered-around-blue-background-with-space-middle-text_14117-608480.jpg";

const Hero = () => {
  return (
    <div>
      <section
        className="relative overflow-hidden text-white px-6 py-12 sm:py-16 md:py-20 lg:py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundBlendMode: "overlay",
          backgroundColor: "#7E57C2aa",
        }}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* LEFT CONTENT */}
          <motion.div
            className="flex-1 space-y-6 text-center md:text-left"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Eco-Friendly Toys <br className="hidden sm:block" /> That Foster
              Creativity
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-100 max-w-md mx-auto md:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              Fun, planet-safe toys that inspire imagination. Perfect for
              endless open-ended play and exploration.
            </motion.p>

            <motion.button
              className="bg-white text-[#7E57C2] font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Explore Now
            </motion.button>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="flex-1 flex justify-center md:justify-end relative"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div
              className="bg-white rounded-[40px] sm:rounded-[50px] p-2 sm:p-3 md:p-4 w-[90%] sm:w-[100%] md:w-[100%] lg:w-[100%]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={toyImage}
                alt="Child playing with toy"
                className="rounded-[35px] sm:rounded-[45px] object-cover w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px]"
              />
            </motion.div>

            {/* Decorative blobs (floating animation) */}
            <motion.div
              className="absolute -top-6 -left-8 w-16 sm:w-20 h-16 sm:h-20 bg-yellow-300 rounded-full opacity-50 blur-2xl"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <motion.div
              className="absolute bottom-0 right-0 w-24 sm:w-28 h-24 sm:h-28 bg-pink-400 rounded-full opacity-50 blur-3xl"
              animate={{
                y: [0, 20, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
          </motion.div>
        </div>

        {/* Background floating shapes */}
        <motion.div
          className="absolute top-6 left-6 w-10 h-10 bg-pink-300 rounded-full opacity-70 blur-md hidden sm:block"
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        <motion.div
          className="absolute bottom-10 right-10 w-14 h-14 bg-green-300 rounded-full opacity-60 blur-md hidden sm:block"
          animate={{
            y: [0, 15, 0],
            x: [0, -5, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </section>
    </div>
  );
};

export default Hero;
