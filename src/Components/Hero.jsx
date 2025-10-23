import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "../assets/colorful-toys-scattered-around-blue-background-with-space-middle-text_14117-608480.jpg";

import img1 from "../assets/images (1).jpeg";
import img2 from "../assets/images (2).jpeg";
import img3 from "../assets/images (3).jpeg";
import img4 from "../assets/images (4).jpeg";
import img5 from "../assets/images (5).jpeg";
import img6 from "../assets/images.jpeg";

const images = [img1, img2, img3, img4, img5, img6];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      zIndex: 0,
    }),
  };

  return (
    <section
      className="relative overflow-hidden text-white px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-16 md:py-20 lg:py-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundBlendMode: "overlay",
        backgroundColor: "#7E57C2cc",
      }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
        {/* LEFT TEXT CONTENT */}
        <motion.div
          className="flex-1 w-full text-center lg:text-left space-y-6"
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
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 max-w-md mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Fun, planet-safe toys that inspire imagination. Perfect for endless
            open-ended play and exploration.
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

        {/* RIGHT SLIDESHOW IMAGE */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end relative w-full"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          <div className="bg-white rounded-[30px] p-2 sm:p-3 w-full max-w-[500px] overflow-hidden relative h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] flex items-center justify-center shadow-lg">
            <AnimatePresence custom={direction} mode="wait">
              <motion.img
                key={images[index]}
                src={images[index]}
                alt="Toy"
                className="rounded-[25px] object-cover absolute w-full h-full"
                variants={variants}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 100, damping: 20 },
                  opacity: { duration: 0.4 },
                }}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Floating Decorations */}
      <motion.div
        className="absolute top-8 left-6 w-10 h-10 bg-pink-300 rounded-full opacity-70 blur-md hidden sm:block"
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute bottom-10 right-10 w-14 h-14 bg-green-300 rounded-full opacity-60 blur-md hidden sm:block"
        animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
    </section>
  );
};

export default Hero;
